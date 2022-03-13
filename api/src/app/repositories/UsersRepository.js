const db = require('../../database');

class UsersRepository {
  async findAll() {
    const rows = await db.query('SELECT username FROM users');

    return rows;
  }

  async create({ username, passwordHash, is_admin }) {
    const [row] = await db.query(`
      INSERT INTO users (username, password, is_admin)
      VALUES($1, $2, $3)
      RETURNING id;
    `, [username, passwordHash, is_admin]);

    return row;
  }

  async findByName(username) {
    const [user] = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    return user;
  }
}

module.exports = new UsersRepository();
