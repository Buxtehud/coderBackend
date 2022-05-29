import { faker } from "@faker-js/faker";
const { commerce, image } = faker;

faker.locale = "es"

function createNFakeProducts(n) {
    const products = []
    for (let i = 1; i <= n; i++) {
        const prod = createFakeProduct(i)
        products.push(prod)
    }
    return products
}

function createFakeProduct(id) {
    const prod = {
        title: commerce.product(),
        price: commerce.price(),
        thumbnail: image.imageUrl()
    }
    if (id) {
        prod.id = id
    }
    return prod
}

export {
    createFakeProduct,
    createNFakeProducts
}