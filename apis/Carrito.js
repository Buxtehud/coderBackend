const fs = require('fs');

class Carrito{

    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        const data = await fs.promises.readFile(this.fileName, 'utf-8');
        return JSON.parse(data);
    }

    async getProductos(id) {
        const data = await this.getAll();
        const cart = data.find(producto => producto.id == id);
        return cart['productos'];
    }

    async create(producto) {
        const data = await this.getAll();
        producto.id = data.length + 1;
        data.push(producto);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
        return producto;
    }

    async delete(id) {
        const data = await this.getAll();
        const index = data.findIndex(producto => producto.id == id);
        data.splice(index, 1);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
    }

    async deleteProducto(id, producto) {
        const data = await this.getAll();
        const index = data.findIndex(producto => producto.id == id);
        data[index]['productos'].splice(data[index]['productos'].indexOf(producto), 1);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
    }
}

module.exports = Carrito;