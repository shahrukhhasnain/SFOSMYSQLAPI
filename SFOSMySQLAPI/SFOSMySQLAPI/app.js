const PORT=3000

var express = require('express')
var app = express()
var mysql = require('mysql')
var myconnection = require('express-myconnection')
var bodyParser = require('body-parser')

var config = require('./db')
var dbOption = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

var routes = require('./routes/index')
var publicDir = (__dirname + '/public/');  //set static dir for display image

app.use(express.static(publicDir))
app.use(myconnection(mysql, dbOption, 'pool'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use("/", routes)
app.listen(PORT, () => {
    console.log('BACKEND running on port '+ PORT)

})

