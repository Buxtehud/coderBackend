const Products = require('./manejoArchivos');
const productos = new Products();

const express = require('express');
const { Router } = express;

const app = express();
const router = Router();
const PORT = 8080;

const server = app.listen(PORT, () => {console.log(`Escuchando Server en ${PORT}`)});

app.use('/static', express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

router.get('/',(req, res) => {
    const products = productos.getAll();
    res.json(products);
});
router.get('/:id',(req, res) => {
    const product = productos.getById(parseInt(req.params.id));
    res.json(product)
});

router.post('/', (req, res) => {
    const product = req.body;
    const id = productos.save(product);
    res.json(productos.getById(id));
});

router.put('/:id', (req, res) =>{
    const product = req.body;
    const id = req.params.id;
    const prod = productos.modify(parseInt(id), product);
    res.json(prod);
})

router.delete('/:id', (req, res) => {
    productos.deleteById(parseInt(req.params.id));
    res.json({message: 'Product deleted'});
});

server.on('error', (error) => console.log('Error en el servidor: '+error));

app.use('/api/productos',router)

app.get('/productoRandom',(req,res) => {
    productos.getAmmount().then(ammount =>{
        const id = Math.floor(Math.random() * (ammount))+1;
        productos.getById(id).then(result => {
            res.json(result);
        })
    })
});