const Contenedor = require('./manejoArchivos');
const productos = new Contenedor('product.txt');

const express = require('express');
const { Router } = express;

const app = express();
const router = Router();
const PORT = 8080;

const server = app.listen(PORT, () => {console.log(`Escuchando Server en ${PORT}`)});

app.use(express.json());
app.use(express.urlencoded({extended: true}))

router.get('/',(req, res) => productos.getAll().then(result => res.send(result)));
router.get('/:id',(req, res) => productos.getById(parseInt(req.params.id)).then(result => res.send(result)));

router.post('/', (req, res) => {
    const product = req.body;
    productos.save(product).then(ans => res.json({ans})).catch(err => res.json({error:err}));
});

router.delete('/:id', (req, res) => productos.deleteById(parseInt(req.params.id)).then(res.json({message:'product deleted'})));

server.on('error', (error) => console.log('Error en el servidor: '+error));

app.use('/api/productos',router)

app.get('/productoRandom',(req,res) => {
    productos.getAmmount().then(ammount =>{
        const id = Math.floor(Math.random() * (ammount))+1;
        productos.getById(id).then(result => {
            res.send(result);
        })
    })
});