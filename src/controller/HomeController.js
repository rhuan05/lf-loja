const FileiraModel = require('../models/Fileira');
const ProdutosModel = require('../models/Produtos');

exports.paginaInicialHome = async (req, res)=>{
    console.log('Estou aqui');
    const fileiras = await FileiraModel.find();
    const fileiraProdutos = await ProdutosModel.find();
    console.log('Estou aqui 2');
    
    res.render('home', {fileiras, fileiraProdutos});
};

exports.procurarProduto = async (req, res)=>{
    const { procurarProduto } = req.body;
    const fileiras = await FileiraModel.find();
    const fileiraProdutos = await ProdutosModel.find();
    
    const produtosEncontrados = await ProdutosModel.find({ nome: procurarProduto });

    try{
        console.log(produtosEncontrados);
        res.render('search', {produtosEncontrados});
    }catch(error){
        console.log(error);
    };
};