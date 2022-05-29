import ContainerFilesystem from "../../containers/containerFilesystem";

class CartDaoFilesystem extends ContainerFilesystem {
    constructor() {
        super('DB/cart.json');
    }

    async save(cart = {products: []}) {
        return super.save(cart);
    }
}

export default CartDaoFilesystem;