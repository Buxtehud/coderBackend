import mongoose from 'mongoose'
import config from '../config'

await mongoose.connect(config.mongodb.URL, config.mongodb.options)

class ContainerMongo {
    constructor(collectionName, schema) {
        this.collection = mongoose.model(collectionName, schema);
    }

    async getAll() {
        try{
            const docs = await this.collection.find({}, {__v: 0}).lean();
            return docs;
        } catch(error) {
            throw new Error(`Can't get all: ${error}`);
        }
    }

    async getById(id){
        try{
            const doc = await this.collection.find({'_id': id}, {__v: 0});
            if(doc.length === 0){
                throw new Error('Id not found');
            }
        } catch(error) {
            throw new Error(`Can't find by Id: ${error}`);
        }
    }

    async save(obj){
        try {
            let doc = await this.collection.create(obj);
            return doc
        } catch (error) {
            throw new Error(`Can't save: ${error}`)
        }
    }

    async update(obj) {
        try {
            const doc = await this.collection.replaceOne({ '_id': obj._id }, obj)
            return doc
        } catch (error) {
            throw new Error(`Can't update: ${error}`)
        }
    }

    async delete(id) {
        try {
            const doc = await this.collection.deleteOne({ '_id': id })
        } catch (error) {
            throw new Error(`Can't delete: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await this.collection.deleteMany({})
        } catch (error) {
            throw new Error(`Can't delete: ${error}`)
        }
    }
}

export default ContainerMongo;