const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    preco: String,
    fileira: String,
    img: String,
});

const ProdutoModel = mongoose.model('produto', ProdutoSchema);

module.exports = ProdutoModel;