import { promises as fs } from 'fs'
import { config } from '../config.js'

class ContainerFilesystem {

    constructor(path) {
        this.path = `${config.fileSystem.path}/${path}`;
    }

    async getAll() {
        try {
            const obj = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(obj)
        } catch (error) {
            return []
        }
    }
    
    async getById(id) {
        const obj = await this.getAll()
        return obj.find(o => o.id === id)
    }

    async save(obj) {
        const elements = await this.getAll()

        let newId
        if (elements.length === 0) {
            newId = 1
        } else {
            newId = elements[elements.length - 1].id + 1
        }

        const newObj = { ...obj, id: newId }
        elements.push(newObj)

        try {
            await fs.writeFile(this.path, JSON.stringify(elements, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Can't save: ${error}`)
        }
    }

    async update(elem) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id === elem.id)
        if (index === -1) {
            throw new Error(`Update error: Element not found`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.path, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Update error: ${error}`)
            }
        }
    }

    async delete(id) {
        const objs = await this.getAll()
        const index = objs.findIndex(o => o.id === id)
        if (index === -1) {
            throw new Error(`Delete error: Element not found`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.path, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Delete error: ${error}`)
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.path, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Delete error: ${error}`)
        }
    }
}


export default ContainerFilesystem