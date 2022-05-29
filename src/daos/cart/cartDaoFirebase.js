import containerFirebase from "../../containers/containerFirebase";

class CartDaoFirebase extends containerFirebase {
    constructor() {
        super('cart');
    }

    async save(cart = {products: []}){
        return super.save(cart);
    }
}

export default CartDaoFirebase;