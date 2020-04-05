'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//producto
const Producto = require('./model/product')

const app = express()
const port = process.env.PORT || 3001

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
//conexion a base de datos
mongoose.connect('mongodb://localhost:27017/nuevatienda',{useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if(err) return console.log(`error al conectarse a la base de datos: ${err}`);
    
    console.log(`conexion establecida`)

    app.listen(port, () => {
        console.log(`Api Rest corriendo en http://localhost:${port}`)
    })
})
//***************************************** */
//funciones para acceder a la base de datos

//mostrar todos los productos
app.get('/api/allProduct', (req, res) => {

    Producto.find({}, (err, producto) => {
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        if(!producto) return res.status(404).send({message: `No hay productos disponibles`})
         res.status(200).send({producto})
    })
})

//buscar producto por id
app.get('/api/productId/:id', (req, res) => {
    let id = req.params.id

    Producto.findById(id, (err, producto) => {
        if(err) return res.status(500).send({message:`error al realizar la petiion: ${err}` })
        if(!producto) return res.status(404).send({message: `No se encontro el producto`})

        res.status(200).send({message: producto})
    })
})

//añadir producto
app.post('/api/addProduct',multipartMiddleware, (req, res) => {
    let producto = new Producto()
    let aux = req.files.foto.path.split('\\');

    producto.nombre = req.body.nombre
    producto.marca = req.body.marca
    producto.foto = 'http://localhost:3001/img/'+aux[1]
    producto.precio = req.body.precio
    producto.categoria = req.body.categoria
    producto.talla = req.body.talla
    producto.cantidad = req.body.cantidad

    producto.save((err, productoGuardado) => {
        if(err) return res.status(500).send({message:`error al guardar el producto: ${err}` })

        res.status(200).send({message: productoGuardado})
    })
})

//comprar producto
app.put('/api/updateProduct/:id', (req, res) => {
    let id = req.params.id
    let update = req.body

    Producto.findByIdAndUpdate(id, update, (err, productUpdate) => {
        if(err) return res.status(500).send({message:`error al guardar el producto: ${err}` })

        res.status(200).send({message: productUpdate})
    })
})
//borrar producto
app.delete('/api/deleteProduct/id', (req, res) => {
    let id = req.params.id

    Producto.findById(id, (err, producto) => {
        if(err) return res.status(500).send({message:`error al borrar el producto: ${err}` })

        producto.remove((err) => {
            if(err) return res.status(500).send({message:`error al borrar el producto: ${err}` })

            res.status(200).send({message: `El producto a sido eliminado`})
        })
    })
})