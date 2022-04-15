const { options } = require('./options/dataBase');
const knex = require('knex')(options);

(async () => {
    try{
        await knex.schema.createTable('products', (table) => {
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