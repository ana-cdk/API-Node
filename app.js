var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var eventsRouter = require('./routes/events');

require("dotenv").config();

var app = express();

// Configurar a conexão
mongoose
 .connect("mongodb+srv://akotz:AIexwyiLF1IlpnxK@cluster0.ju7luih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
 .then(() => {
    console.log("MongoDB conectado, Oba!!");
})
.catch((err)=>{
    console.log("MongoDB não conectado");
    console.log(err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', eventsRouter);
app.use('/auth', require('./routes/auth'));

module.exports = app;
