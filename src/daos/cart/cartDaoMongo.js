import ContainerMongo from "../../containers/containerMongo";

class CartDaoMongo extends ContainerMongo {
    constructor() {
        super('cart', {
            products: {type: [], required: true}
        });
    }

    async save(cart = {products: []}) {
        return super.save(cart);
    }
}

export default CartDaoMongo;