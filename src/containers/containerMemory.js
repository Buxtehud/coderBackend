class ContainerMemory {

    constructor() {
        this.elements = []
    }

    getAll() {
        return [...this.elements]
    }

    get(id) {
        const elem = this.elements.find(elem => elem.id == id)
        if (!elem) {
            throw new Error(`Can't get: element not found`)
        } else {
            return elem
        }
    }

    save(elem) {

        let newId
        if (this.elements.length == 0) {
            newId = 1
        } else {
            newId = this.elements[this.elements.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        this.elements.push(newElem)
        return newElem
    }

    update(elem) {
        const index = this.elements.findIndex(p => p.id == elem.id)
        if (index == -1) {
            throw new Error(`Update error: Element not found`)
        } else {
            this.elements[index] = elem
            return elem
        }
    }

    delete(id) {
        const index = this.elements.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error(`Delete error: Element not found`)
        } else {
            return this.elements.splice(index, 1)
        }
    }

    deleteAll() {
        this.elements = []
    }
}

export default ContainerMemory
