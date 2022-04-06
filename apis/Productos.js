const fs = require('fs');

class Productos{

    constructor(fileName) {
        this.fileName = fileName;
    }

    async getAll() {
        const data = await fs.promises.readFile(this.fileName, 'utf-8');
        return JSON.parse(data);
    }

    async getById(id) {
        const data = await this.getAll();
        return data.find(producto => producto.id == id);
    }

    async create(producto) {
        const data = await this.getAll();
        producto.id = data.length + 1;
        data.push(producto);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
        return producto;
    }

    async update(id, producto) {
        const data = await this.getAll();
        const index = data.findIndex(producto => producto.id == id);
        data[index] = producto;
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
        return producto;
    }

    async delete(id) {
        const data = await this.getAll();
        const index = data.findIndex(producto => producto.id == id);
        data.splice(index, 1);
        await fs.promises.writeFile(this.fileName, JSON.stringify(data, null, 2));
    }
}

module.exports = Productos;