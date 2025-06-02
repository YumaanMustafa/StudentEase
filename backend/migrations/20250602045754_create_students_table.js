/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('students', (table) => {
    table.increments('id').primary();  // auto-incrementing primary key
    table.string('name').notNullable();
    table.string('course').notNullable();
    table.integer('age').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('students');
};
