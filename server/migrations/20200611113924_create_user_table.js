exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.json("upload_ids").notNullable();
    table.json("likes").notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
