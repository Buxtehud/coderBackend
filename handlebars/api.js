const Products = require('../manejoArchivos');
const productos = new Products();

const express = require('express');
const { Router } = express;

const app = express();
const router = Router();
const PORT = 8080;

const server = app.listen(PORT, () => {console.log(`Escuchando Server en ${PORT}`)});

//Configuración de Handlebars-----------------------------------------------------------------------

const handlebars = require('express-handlebars');

app.engine(
    'hbs',
    handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');
//--------------------------------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Rutas Plantillas----------------------------------------------------------------------------------
app.get('/productos', (req, res) => {
    const products = productos.getAll();
    res.render('main', {
        product: products,
        prodAmount: products.length
    });
})

app.post('/productos', (req, res) => {
    const product = req.body;
    const id = productos.save(product);
    res.json(productos.getById(id));
    res.redirect('/')
});


//API REST------------------------------------------------------------------------------------------
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
    res.redirect('/')
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