const socket = io.connect();

const addProduct = document.getElementById('form-product');
addProduct.addEventListener('submit', e => {
    const product = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    };
    socket.emit('update', product);
    addProduct.reset();
    console.log(product)
    return false
});

socket.on('productos', productos => {
    console.log(productos)
    addTable(productos).then(html => {
       document.getElementById('products').innerHTML = html;
    });
});

function addTable(products) {
    return fetch('../views/main.hbs')
        .then(ans => ans.text())
        .then(template => {
            const temp = Handlebars.compile(template);
            const html = temp({products});
            return html;
        });
}