const FileiraModel = require('../models/Fileira');
const ProdutosModel = require('../models/Produtos');
const BannerModel = require('../models/Banner');

exports.paginaInicialHome = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const fileiraProdutos = await ProdutosModel.find();
    const banners = await BannerModel.find();
    
    res.render('home', {fileiras, fileiraProdutos, banners});
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