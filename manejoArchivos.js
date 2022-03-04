const fs = require('fs')

class Contenedor{
    constructor(fileName) {
        this.fileName = `./${fileName}`;
    }

    async readData(){
        try{
            const file = await fs.promises.readFile(this.fileName,'utf-8');
            return JSON.parse(file);
        } catch (err) {
            return []
        }
    }

    async save(obj){
        return this.readData().then((fileObj) => {
            let id = 1
            if (fileObj.length > 0) {
                id = fileObj[fileObj.length - 1].id + 1;
            }
            obj.id = id;
            fileObj.push(obj);
            const newObject = JSON.stringify(fileObj);
            fs.promises.writeFile(this.fileName, newObject);
            return id
        })
    }

    async getById(id){
        return this.readData().then(fileObj => {
            let objFound = fileObj.find(element => element.id === id);
            return objFound ? objFound : null;
        });
    }

    async getAll(){
        return this.readData().then(fileObj=> fileObj);
    }

    async deleteById(id){
        this.readData().then(fileObj => {
            fileObj = fileObj.filter(element => element.id !== id);
            fs.promises.writeFile(this.fileName, JSON.stringify(fileObj));
        })
    }

    async deleteAll(){
        await fs.promises.writeFile(this.fileName,'')
    }

    async getAmmount(){
        try{
            let text = await fs.promises.readFile(this.fileName);
            let obj = JSON.parse(text);
            return obj.length;
        } catch {
            return "";
        }
    }
}

module.exports = Contenedor;

// const cont = new Contenedor('product.txt');
// cont.save({title: 'Vaso', price:465, thumbnail: 'urlVaso'}).then((answ) => console.log(`Element ${answ} added successfully`));
// cont.getById(2).then(ans => console.log(ans))
// cont.getById(7).then(ans => console.log(ans))
// cont.deleteById(3).then(() => console.log('Element deleted successfully'))
// cont.getAll().then(ans => console.log(ans))
// cont.deleteAll().then(() => console.log('File deleted successfully'))