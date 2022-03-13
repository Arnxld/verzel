const ClassesRepository = require('../repositories/ClassesRepository');
const ModulesRepository = require('../repositories/ModulesRepository');

class ClassController {
  async index(request, response) {
    const { orderBy } = request.query;
    const classes = await ClassesRepository.findAll(orderBy);

    return response.json(classes);
  }

  async store(request, response) {
    const { name, module, class_date } = request.body;

    if (!name || !module || !class_date) {
      return response.status(400).json({ error: 'All fields are required!' });
    }

    if (new Date(class_date) - Date.now() < 0) {
      return response.status(400).json({ error: 'please enter a valid date!' });
    }

    const moduleExists = await ModulesRepository.findByName(module);
    if (!moduleExists) return response.status(404).json({ error: 'Module not found' });

    const created_class = await ClassesRepository.create({ name, module, class_date });

    return response.status(200).json(created_class);
  }

  async find(request, response) {
    const { id } = request.params;

    const foundClass = await ClassesRepository.findById(id);

    if (!foundClass) return response.status(404).json({ error: 'Class not found!' });

    return response.status(200).json(foundClass);
  }

  async update(request, response, next) {
    const { name, class_date } = request.body;
    const { id } = request.params;

    if (!name || !class_date) return response.status(400).json({ error: 'All fields are required' });

    if (new Date(class_date) - Date.now() < 0) {
      return response.status(400).json({ error: 'please enter a valid date!' });
    }

    const classExists = await ClassesRepository.findById(id);

    if (!classExists) {
      return response.status(404).json({ error: 'Class not found' });
    }

    try {
      const updatedClass = await ClassesRepository.update(id, { name, class_date });

      return response.json(updatedClass);
    } catch (err) {
      next(err);
    }
  }

  async delete(request, response, next) {
    try {
      const { id } = request.params;

      const classExists = await ClassesRepository.findById(id);

      if (!classExists) {
        return response.status(404).json({ error: 'Class not found' });
      }

      await ClassesRepository.delete(id);

      return response.sendStatus(204);
    } catch (err) {
      next(err); // express < 5.0 does not catch errors automatically in the errorHandler middleware
    }
  }
}

module.exports = new ClassController();
