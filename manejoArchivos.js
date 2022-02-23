const fs = require('fs')

class Contenedor{
    constructor(fileName) {
        this.fileName = fileName;
    }

    save(obj){
        const read = async (string, pathFile) => {
            try {
                const file = await fs.promises.readFile(pathFile, 'utf-8');
                const fileObj = JSON.parse(file);
                obj.id = fileObj[fileObj.length - 1].id + 1;
                fileObj.push(obj);
                const newObject = JSON.stringify(fileObj);
                console.log(fileObj);
                fs.writeFileSync(pathFile,newObject);
            } catch (err) {
                obj.id = 1;
                const newObject = JSON.stringify([obj]);
                fs.writeFileSync(pathFile, newObject);
            }
        }
        read(obj, this.fileName);
    }

    getById(id){
        const file = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        const fileObj = JSON.parse(file);
        const element = fileObj.filter(element => element.id === id);
        if (element.length > 0) {
            return element;
        } else {
            return null
        }
    }

    getAll(){
        const file = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        return JSON.parse(file);
    }

    deleteById(id){
        const file = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        let fileObj = JSON.parse(file);
        fileObj = fileObj.filter(element => element.id !== id);
        const newObject = JSON.stringify(fileObj)
        fs.writeFileSync(`./${this.fileName}`,newObject)
    }

    deleteAll(){
        fs.writeFileSync(`./${this.fileName}`,'')
    }
}

const cont = new Contenedor('product.txt');
//cont.save({title: 'JAbon', price:245, thumbnail: 'urlJabon'});
console.log(cont.getById(2))
console.log(cont.getById(7))
cont.deleteById(3)
console.log(cont.getAll())
cont.deleteAll()