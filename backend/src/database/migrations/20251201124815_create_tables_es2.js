// backend/src/database/migrations/XXXXXXXX_create_tables_es2.js

exports.up = function(knex) {
  return knex.schema
    // Tabela de Renda (User Story 3)
    .createTable('incomes', table => {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.date('date').notNullable();
    })
    // Tabela de Lembretes (User Story 1)
    .createTable('reminders', table => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.date('due_date').notNullable();
      table.boolean('paid').defaultTo(false);
    })
    // Tabela de Orçamentos (User Story 2)
    .createTable('budgets', table => {
      table.increments('id').primary();
      table.string('category').notNullable();
      table.decimal('limit_amount', 10, 2).notNullable();
    })
    // Tabela de Despesas (Ligada ao Orçamento)
    .createTable('expenses', table => {
      table.increments('id').primary();
      table.string('description').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.integer('budget_id').references('id').inTable('budgets').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('expenses')
    .dropTableIfExists('budgets')
    .dropTableIfExists('reminders')
    .dropTableIfExists('incomes');
};