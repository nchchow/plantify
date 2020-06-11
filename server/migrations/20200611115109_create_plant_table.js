exports.up = (knex) => {
  return knex.schema.createTable("plants", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.json("likes");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("plants");
};
