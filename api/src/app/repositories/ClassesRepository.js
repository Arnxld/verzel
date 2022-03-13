const db = require('../../database');

class ClassesRepository {
  async findAll(orderBy = 'ASC') {
    const order = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`SELECT * FROM classes ORDER BY name ${order}`);

    return rows;
  }

  async create({ name, module, class_date }) {
    const [row] = await db.query(`INSERT INTO classes
      (name, module, class_date)
      VALUES ($1, $2, $3)
      RETURNING *
    `, [name, module, class_date]);

    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT *
      FROM classes
      WHERE id = $1
    `, [id]);

    return row;
  }

  async update(id, {
    name,
    class_date,
  }) {
    const [row] = await db.query(`
      UPDATE classes SET
      name = $1,
      class_date = $2
      WHERE id = $3
      RETURNING *
    `, [name, class_date, id]);

    return row;
  }

  async delete(id) {
    const deleteOperation = await db.query('DELETE FROM classes WHERE id = $1', [id]);

    return deleteOperation;
  }
}

module.exports = new ClassesRepository();
