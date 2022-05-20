const { optionSqlite } = require('../options/sqlite');
const knex = require('knex')(optionSqlite);

(async () => {
    try{
        await knex.schema.createTable('mensajes', (table) => {
            table.increments('id').primary();
            table.string('title');
            table.decimal('price');
            table.string('thumbnail');
        });
        console.log('Table products created');
    } catch(error) {
        console.log(error);
    } finally {
        await knex.destroy();
    }
})();