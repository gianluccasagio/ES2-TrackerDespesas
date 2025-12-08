// backend/knexfile.js
const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      // Salva o banco dentro de src/database
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    useNullAsDefault: true, // Obrigatório para SQLite
    migrations: {
      // Salva as migrations (histórico do banco) na pasta correta
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
  }
};