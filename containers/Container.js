class Product{
    constructor(config){
        this.config = config;
        this.knex = knex(config);
    }

    getAll(){
        return this.knex.select().from('products');
    }

    getById(id){
        return this.knex.select().from('products').where('id', id);
    }

    save(product){
        return this.knex('products').insert(product);
    }

    update(id, product){
        return this.knex('products').where('id', id).update(product);
    }

    delete(id){
        return this.knex('products').where('id', id).del();
    }

}

export default Product;