import CartDaoFirebase from "./cart/cartDaoFirebase";
import CartDaoMongo from "./cart/cartDaoMongo";
import CartDaoFilesystem from "./cart/cartDaoFilesystem";
import CartDatoMemory from "./cart/cartDatoMemory";
import ProductsDaoFilesystem from "./products/productDaoFilesystem";
import ProductsDaoMemory from "./products/productDaoMemory";
import ProductDaoMongo from "./products/productDaoMongo";
import ProductsDaoFirebase from "./products/productDaoFirebase";

let productsDao;
let cartDao;

switch (process.env.PERS) {
    case 'json':
        cartDao = new CartDaoFilesystem();
        productsDao = new ProductsDaoFilesystem();
        break;

    case 'firebase':
        cartDao = new CartDaoFirebase();
        productsDao = new ProductsDaoFirebase();
        break;

    case 'mongodb':
        cartDao = new CartDaoMongo();
        productsDao = new ProductDaoMongo();
        break;

    default:
        cartDao = new CartDatoMemory();
        productsDao = new ProductsDaoMemory();
        break;
}

export { cartDao, productsDao};