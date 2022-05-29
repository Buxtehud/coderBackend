import containerFirebase from "../../containers/containerFirebase";

class ProductsDaoFirebase extends containerFirebase {
    constructor() {
        super('products');
    }
}

export default ProductsDaoFirebase;