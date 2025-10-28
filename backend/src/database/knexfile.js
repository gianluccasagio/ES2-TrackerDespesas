module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dev.sqlite3' // Onde o banco será salvo
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/database/migrations'
    }
  }
};