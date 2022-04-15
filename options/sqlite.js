const optionsLite = require('knex')({
    client: 'sqlite3',
  connection: {
    filename: './DB/ecommerce.sqlite3'
  },
});

module.exports = {
    optionsLite
};