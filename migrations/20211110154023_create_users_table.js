exports.up = function(knex) {
  return knex.schema.createTable('users', function(t) {
    t.increments('id').primary().unique();
    t.string('email');
    t.string('password');
    t.timestamps(true, true);
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
