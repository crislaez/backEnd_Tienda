'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3001
//conexion a base de datos
mongoose.connect('mongodb://localhost:27017/nuevatienda',{useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if(err) return console.log(`error al conectarse a la base de datos: ${err}`);
    
    console.log(`conexion establecida`)

    app.listen(port, () => {
        console.log(`Api Rest corriendo en http://localhost:${port}`)
    })
})
