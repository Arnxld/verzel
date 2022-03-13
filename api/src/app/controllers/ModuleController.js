const ModulesRepository = require('../repositories/ModulesRepository');

class ModuleController {
  async index(request, response) {
    const { orderBy } = request.query;
    const modules = await ModulesRepository.findAll(orderBy);

    return response.json(modules);
  }

  async find(request, response, next) {
    try {
      const { id } = request.params;

      const module = await ModulesRepository.findById(id);

      if (!module) return response.status(404).json({ error: 'module not found' });

      const classes = await ModulesRepository.findAllClasses(module.name);

      const formatedClasses = classes.map((item) => {
        const date = new Date(item.class_date);
        const month = `0${date.getMonth() + 1}`.slice(-2);
        const day = `0${date.getDate()}`.slice(-2);
        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);

        return {
          ...item,
          class_date: `${day}/${month} às ${hours}:${minutes}`,
        };
      });

      return response.status(200).json({ module, classes: formatedClasses });
    } catch (err) {
      next(err);
    }
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const module = await ModulesRepository.create(name);

    return response.json(module);
  }

  async update(request, response, next) {
    const { name } = request.body;
    const { id } = request.params;

    try {
      const moduleExists = await ModulesRepository.findById(id);

      if (!moduleExists) {
        return response.status(404).json({ error: 'Module not found' });
      }

      const updatedModule = await ModulesRepository.update(id, name);

      return response.json(updatedModule);
    } catch (err) {
      next(err);
    }
  }

  async delete(request, response, next) {
    const { id } = request.params;

    try {
      const moduleExists = await ModulesRepository.findById(id);

      if (!moduleExists) {
        return response.status(404).json({ error: 'Module not found' });
      }

      await ModulesRepository.delete(id);

      return response.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ModuleController();
