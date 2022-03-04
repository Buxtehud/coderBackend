const Contenedor = require('./manejoArchivos');
const productos = new Contenedor('product.txt');

const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {console.log(`Escuchando Server en ${PORT}`)});

server.on('error', (error) => console.log('Error en el servidor: '+error));

app.get('/productos',(req,res) => {
    productos.getAll().then(result => res.send(result));
});

app.get('/productoRandom',(req,res) => {
    productos.getAmmount().then(ammount =>{
        const id = Math.floor(Math.random() * (ammount))+1;
        productos.getById(id).then(result => {
            res.send(result);
        })
    })
});