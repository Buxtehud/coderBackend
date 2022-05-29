import ContainerMongo from "../../containers/containerMongo";

class ProductsDaoMongo extends ContainerMongo {
    constructor() {
        super('products', {
            title: {type: String, required: true},
            price: {type: Number, required: true},
            thumbnail: {type: String, required:true}
        });
    }
}

export default ProductsDaoMongo;