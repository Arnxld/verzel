const dotenv = require('dotenv-safe/config'); // para ler as variáveis ambientes
const { Client } = require('pg');

const client = new Client({
  user: process.env.USER,
  host: 'localhost',
  database: 'verzel',
  password: process.env.PASSWORD,
  port: 5432,
});

client.connect();

exports.query = async (query, values) => {
  const results = await client.query(query, values);
  return results.rows;
};
