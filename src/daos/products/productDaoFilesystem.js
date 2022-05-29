import ContainerFilesystem from "../../containers/containerFilesystem";

class ProductsDaoFilesystem extends ContainerFilesystem {
    constructor() {
        super('products.json');
    }
}

export default ProductsDaoFilesystem;