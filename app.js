'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//controlador
const Controller = require('./controller/Controlador')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//********************** */
app.use('/img', express.static(__dirname + '/img', {
    maxAge: '12h'
}));
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart({uploadDir: './img'}) //imm es la carpeta donde subiremos las imagenes
//********************* */

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//**************************************** */
//funciones para acceder a la base de datos

//mostrar todos los productos
app.get('/api/allProduct', Controller.getAllProduct)
//buscar producto por id
app.get('/api/productId/:id', Controller.getProductById)
//añadir producto
app.post('/api/addProduct',multipartMiddleware, Controller.addProduct)
//comprar producto
app.put('/api/updateProduct/:id', Controller.updateProduct)
//borrar producto
app.delete('/api/deleteProduct/id', Controller.deleteProduct)

module.exports = app;