const knex = require('knex');

class Container{
    constructor(config, table){
        this.knex = knex(config);
        this.table = table;
    }

    getAll(){
        return this.knex.from(this.table).select('*');
    }

    getById(id){
        return this.knex.from(this.table).select('*').where('id', id);
    }

    save(product){
        return this.knex(this.table).insert(product);
    }

    update(id, product){
        return this.knex.from(this.table).where('id', id).update(product);
    }

    delete(id){
        return this.knex(this.table).where('id', id).del();
    }

}

export default Container;