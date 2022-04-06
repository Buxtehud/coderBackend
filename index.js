const express = require('express');
const { Router } = express;
const app = express();
const routerProductos = Router();
const routerCarrito = Router();
const PORT = 8080;
const Products = require('./apis/Productos');
const productos = new Products('productos.txt');
const Carrito = require('./apis/Carrito');
const carrito = new Carrito('carrito.txt');


const server = app.listen(PORT, () => console.log(`Escuchando en http://localhost:${PORT}`));
server.on('error', (error) => console.log('Error en el servidor: '+error));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

/*----------------------------------Is Admin--------------------------------------*/

let is_admin = false;
function isAdmin(req, res, next) {
    if(is_admin){
        next();
    }else{
        res.status(403).send({error:-1, description:'No tienes permisos para realizar esta acción'});
    }
}

/*--------------------------Router Productos-------------------------------------*/

routerProductos.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id){
        productos.getById(id)
        .then(product => res.json(product))
        .catch(error => res.json(error));
    }else{
        productos.getAll()
        .then(products => res.json(products))
        .catch(error => res.json(error));
    }
});

routerProductos.post('/', isAdmin, (req, res) => {
    let product = req.body;
    productos.create(product)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

routerProductos.put('/:id', isAdmin, (req, res) => {
    let id = req.params.id;
    let product = req.body;
    productos.update(id, product)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

routerProductos.delete('/:id', isAdmin, (req, res) => {
    let id = req.params.id;
    productos.delete(id)
    .then(product => res.json(product))
    .catch(error => res.json(error));
});

/*--------------------------Router Carrito-------------------------------------*/

routerCarrito.post('/', (req, res) => {
    let cart = req.body;
    cart.create(cart)
    .then(cart => res.json(cart.id))
    .catch(error => res.json(error));
});

routerCarrito.delete('/:id', (req, res) => {
    let id = req.params.id;
    cart.delete(id)
    .then(cart => res.json(cart))
    .catch(error => res.json(error));
});

routerCarrito.get('/:id/productos', (req, res) => {
    let id = req.params.id;
    carrito.getProductos(id)
    .then(productos => res.json(productos))
    .catch(error => res.json(error));
});

routerCarrito.delete('/:id/productos/:id_producto', (req, res) => {
    let id = req.params.id;
    let id_producto = req.params.id_producto;
    carrito.deleteProducto(id, id_producto)
    .then(productos => res.json(productos))
    .catch(error => res.json(error));
});