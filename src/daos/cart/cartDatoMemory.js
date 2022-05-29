import ContainerMemory from "../../containers/containerMemory";

class CartDaoMemory extends ContainerMemory {
    async save(cart = {products: []}){
        return super.save(cart)
    }
}

export default CartDaoMemory