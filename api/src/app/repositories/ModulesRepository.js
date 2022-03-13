const db = require('../../database');

class ModulesRepository {
  async findAll(orderBy = 'ASC') {
    const order = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
    SELECT modules.*, count(classes.*) as total_classes
    FROM modules
    LEFT JOIN classes ON modules.name = classes.module
    GROUP BY modules.id, modules.name
    ORDER BY name ${order}`);

    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT modules.*, count(classes.*) as total_classes
    FROM modules
    LEFT JOIN classes ON modules.name = classes.module
    WHERE modules.id = $1
    GROUP BY modules.id, modules.name;
    `, [id]);

    return row;
  }

  async findAllClasses(name) {
    const rows = await db.query(`
      SELECT *
      FROM classes
      WHERE classes.module = $1
    `, [name]);
    return rows;
  }

  async findByName(module) {
    const [row] = await db.query('SELECT * FROM modules WHERE name = $1', [module]);

    return row;
  }

  async create(name) {
    const [row] = await db.query(`INSERT INTO modules
      (name)
      VALUES ($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async update(id, name) {
    const [row] = await db.query(`
      UPDATE modules SET
      name = $1
      WHERE id = $2
      RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM modules WHERE id = $1', [id]);

    return deleteOperation;
  }
}

module.exports = new ModulesRepository();
