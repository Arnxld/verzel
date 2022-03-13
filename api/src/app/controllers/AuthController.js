require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/UsersRepository');

class AuthController {
  async login(request, response) {
    const { username, password } = request.body;

    const user = await UsersRepository.findByName(username);

    if (!user) return response.status(404).json({ error: 'User not found!' });

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) return response.status(400).json({ error: 'username or password is incorrect!' });

    const token = jwt.sign({ user_id: user.id, is_admin: user.is_admin }, process.env.SECRET);

    return response.status(200).json({ user, token });
  }

  async create(request, response) {
    const { username, password } = request.body;

    if (username === '' || password === '') {
      return response.status(400).json({ error: 'All fields are required.' });
    }

    const userExists = await UsersRepository.findByName(username);

    if (userExists) {
      return response.status(400).json({ error: 'username already taken.' });
    }

    const totalUsers = await UsersRepository.findAll();

    const isFirstUser = totalUsers.length === 0;

    console.log(isFirstUser);

    const passwordHash = bcrypt.hashSync(password, 8);

    const id = await UsersRepository.create({
      username,
      passwordHash,
      is_admin: isFirstUser,
    });

    return response.json(id);
  }

  logout(request, response) {
    response.sendStatus(204);
  }
}

module.exports = new AuthController();
