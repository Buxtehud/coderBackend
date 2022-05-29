import admin from "firebase-admin"
import config from '../config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore();

class ContainerFirebase {

    constructor(collectionName) {
        this.collection = db.collection(collectionName)
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.collection.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Can't get documents: ${error}`)
        }
    }

    async getById(id) {
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Can't find document`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Can't get by Id: ${error}`)
        }
    }

    async save(obj) {
        try {
            const saved = await this.collection.add(obj);
            return { ...obj, id: saved.id }
        } catch (error) {
            throw new Error(`Can't save: ${error}`)
        }
    }

    async update(obj) {
        try {
            const updated = await this.collection.doc(obj.id).set(obj);
            return updated
        } catch (error) {
            throw new Error(`Update error: ${error}`);
        }
    }

    async delete(id) {
        try {
            const item = await this.collection.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Delete error: ${error}`)
        }
    }

    async deleteAll() {
        try {
            const doc = await this.collection.get()
            doc.docs.forEach(snapshot => {
                snapshot.ref.delete();
            })
        } catch (error) {
            throw new Error(`Delete error: ${error}`);
        }
    }
}

export default ContainerFirebase