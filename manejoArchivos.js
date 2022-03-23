const fs = require('fs')

class Products{
    constructor() {
        this.productos = [
            {"title":"Sartén","price":"685","thumbnail":"urlSarten","id":1},
            {"title":"Dulce tres leches","price":"3500","thumbnail":"urlDulceTresLeches","id":2},
            {"title":"Jabón","price":"500","thumbnail":"urlJabón","id":3},
            {"title":"Vaso","price":"465","thumbnail":"urlVaso","id":4}
        ];
    }

    save(obj){
        let id = 1;
        if(this.productos.length > 0){
            id = this.productos[this.productos.length - 1].id + 1;
        }
        obj.id = id;
        this.productos.push(obj);
        return id;
    }

    getById(id){
        let objFound = this.productos.find(element => element.id === id);
        return objFound ? objFound : null;
    }

    getAll(){
        return this.productos;
    }

    deleteById(id){
        if(this.getById(id)) {
            this.productos = this.productos.filter(element => element.id !== id);
        } else {
            return {error: 'Producto no encontrado'}
        }
    }

    deleteAll(){
        this.productos = [];
    }

    getAmmount(){
        return this.productos.length;
    }

    modify(id, obj){
        if(this.getById(id)) {
            this.productos = this.productos.map(element => {
                if (element.id === id) {
                    let keys = Object.keys(obj);
                    keys.forEach(key => {
                        element[key] = obj[key]
                    })
                }
                return element;
            });
            return this.productos;
        } else {
            return {error: 'Producto no encontrado'}
        }
    }
}

module.exports = Products;
