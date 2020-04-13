'use strict'

const Producto = require('../model/product')

function getAllProduct(req, res){
    Producto.find({}, (err, producto) => {
        if(err) return res.status(500).send({message: `error al realizar la peticion: ${err}`})
        if(!producto) return res.status(404).send({message: `No hay productos disponibles`})
         res.status(200).send({producto})
    })
}

function getProductById(req, res){
    let id = req.params.id

    Producto.findById(id, (err, producto) => {
        if(err) return res.status(500).send({message:`error al realizar la petiion: ${err}` })
        if(!producto) return res.status(404).send({message: `No se encontro el producto`})

        res.status(200).send({message: producto})
    })
}

function addProduct(req, res){
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
}

function updateProduct(req, res){
    let id = req.params.id
    let update = req.body

    Producto.findByIdAndUpdate(id, update, (err, productUpdate) => {
        if(err) return res.status(500).send({message:`error al guardar el producto: ${err}` })

        res.status(200).send({message: productUpdate})
    })
}

function deleteProduct(req, res){
    let id = req.params.id

    Producto.findById(id, (err, producto) => {
        if(err) return res.status(500).send({message:`error al borrar el producto: ${err}` })

        producto.remove((err) => {
            if(err) return res.status(500).send({message:`error al borrar el producto: ${err}` })

            res.status(200).send({message: `El producto a sido eliminado`})
        })
    })
}

module.exports = {
    getAllProduct,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
}