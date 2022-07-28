require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// View Engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Rotas
app.use(routes);

// Conectando no MongoDB
mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('Conectado ao banco de dados.');
});

// Express Statico
app.use(express.static(path.join(__dirname + '/public')));


app.listen(process.env.PORT || 3000, ()=>console.log(`Servidor rodando!`));