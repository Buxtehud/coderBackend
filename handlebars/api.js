//Llamado a bases de datos e instanciando Contenedores----------------------------------------------

const productsOption = require('../options/mariaDB');
const messagesOption = require('../options/sqlite');

const Container = require('../containers/Container');
const productos = new Container(productsOption);
const mensajes = new Container(messagesOption);

//--------------------------------------------------------------------------------------------------

const express = require('express');
const { Router } = express;

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io');

const app = express();

const router = Router();
const PORT = 8080;

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer);

httpServer.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))

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

//Sockets---------------------------------------------------------------------------------------------
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado.');

    socket.emit('productos', productos.getAll());

    socket.on('update', producto => {
        productos.save(producto);
        io.sockets.emit('productos', productos.getAll());
    });

    socket.emit('messages', await mensajes.getAll());

    socket.on('newMessage', async message => {
        message.date = new Date().toLocaleString();
        await mensajes.save(message);
        io.sockets.emit('messages', await mensajes.getAll());
    });
})




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

app.use('/api/productos',router)

app.get('/productoRandom',(req,res) => {
    productos.getAmmount().then(ammount =>{
        const id = Math.floor(Math.random() * (ammount))+1;
        productos.getById(id).then(result => {
            res.json(result);
        })
    })
});