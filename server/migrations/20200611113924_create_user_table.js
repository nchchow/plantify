exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.json("uploads").notNullable();
    table.json("likes").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
