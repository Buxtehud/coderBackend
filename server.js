//Llamado a bases de datos e instanciando Contenedores----------------------------------------------
import { config } from './src/config'
import { createNFakeProducts } from "./src/mocks/products";
import ContainerFilesystem from "./src/containers/containerFilesystem";
import { normalize, schema } from "normalizr";
import MongoStore from "connect-mongo";
import session from "express-session";

const ContainerSQL = require('./src/containers/containerSQL');
const productos = new ContainerSQL(config.mariadb, 'productos');
const mensajes = new ContainerFilesystem(`${config.fileSystem.path}/messages.json`);

//--------------------------------------------------------------------------------------------------

const express = require('express');
const { Router } = express;

const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io');

const app = express();

const router = Router();
const test = Router();
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
    const name = req.session.name;
    res.render('main', {
        product: products,
        name: name, // variable de sesion
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

    socket.on('update', async (producto) => {
        await productos.save(producto);
        io.sockets.emit('productos', await productos.getAll());
    });

//Normalizar----------------------------------------------------------------------------------------

    const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
    const schemaMessage = new schema.Entity('message', { author: schemaAuthor }, { idAttribute: 'id' });
    const schemaMessages = new schema.Entity('messages', { messages: [schemaMessage] }, { idAttribute: 'id' });

    const normalizeMessage = (messageId) => normalize({ id: 'messages', messages: messageId }, schemaMessages);

    socket.emit('messages', normalizeMessage(mensajes.getAll()));

    socket.on('newMessage', async message => {
        message.date = new Date().toLocaleString();
        await mensajes.save(message);
        io.sockets.emit('messages', normalizeMessage(mensajes.getAll()));
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
    const prod = productos.update(parseInt(id), product);
    res.json(prod);
})

router.delete('/:id', (req, res) => {
    productos.deleteById(parseInt(req.params.id));
    res.json({message: 'Product deleted'});
});

app.use('/api/productos',router)

app.get('/productoRandom',(req,res) => {
    productos.getAmount().then(amount =>{
        const id = Math.floor(Math.random() * (amount))+1;
        productos.getById(id).then(result => {
            res.json(result);
        })
    })
});

//MOCKS ----------------------------------------------------------------------------------------------------------------

test.get('/', (req, res) => {
    const products = createNFakeProducts(5);
    res.render('main', {
        product: products,
        prodAmount: products.length
    });
})

app.use('/api/productos-test', test)

//Login---------------------------------------------------------------------------------------------------------
app.use(session({
    store: MongoStore.create({mongoUrl: config.mongoRemote.cnxStr}),
    secret: 'jojojojo',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 60000
    }
}))

const authWeb = Router();

authWeb.get('/login', (req, res) => {
    const name = req.session.name;
    if (name) {
        res.redirect('/productos');
    } else {
        res.render('/login');
    }
});

authWeb.get('logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

authWeb.post('/login', (req, res) => {
    req.session.name = req.body.username;
    res.redirect('/productos');
});