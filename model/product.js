'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    nombre:String,
    marca:String,
    foto:String,
    precio:{type:Number, default:0},
    categorya:{type:String, enum: ['camiseta','pantalon','zapatos','sudadera','jersey','chaqueta']},
    talla:String,
    cantidad:Number
})

module.exports = mongoose.model('producto',ProductSchema);