exports.up = (knex) => {
  return knex.schema.createTable("uploads", (table) => {
    table.increments("upload_id").primary();
    table
      .integer("owner_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.json("liked_by");
    table.string("title");
    table.string("description");
    table.string("image_path");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("uploads");
};
