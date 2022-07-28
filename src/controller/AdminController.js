require('dotenv').config();
const FileiraModel = require('../models/Fileira');
const ProdutoModel = require('../models/Produtos');

const cloudinary = require('cloudinary').v2;

exports.paginaInicialAdmin = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();

    try{
        res.render('admin', {error: '', fileiras, produtos});
    }catch(error){
        console.log(error);
    };
};

exports.adicionarFileira = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const { titulo } = req.body;

    if(!titulo){
        return res.render('admin', {error: 'Preencha o campo titulo para adicionar uma fileira.', fileiras, produtos});
    };

    const novaFileira = new FileiraModel({
        titulo: titulo,
    });

    try{
        await novaFileira.save();
        res.redirect('http://localhost:3000/admin');
    }catch(error){
        console.log(error);
    };
};

exports.deletarFileira = async (req, res)=>{
    const { id, titulo } = req.body;
    const produtosDaFileira = await ProdutoModel.find({fileira: `${titulo}`});

    try{
        await FileiraModel.findByIdAndDelete(id);

        for(let i=0; i<produtosDaFileira.length; i++){
            await ProdutoModel.findByIdAndDelete(produtosDaFileira[i]);
        }
        res.redirect('http://localhost:3000/admin');
    }catch(error){
        console.log(error);
    };
};

exports.criarProduto = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const { name, preco, select } = req.body;
    const imgProduto = req.file;

    if(!name || !preco){
        return res.render('admin', {error: 'Para criar um produto é preciso preencher todos os campos.', fileiras, produtos});
    };

    if(!imgProduto){
        return res.render('admin', {error:'Para criar um produto é preciso inserir uma imagem nele.', fileiras, produtos});
    };
    
    if(select === 'valorNuloSelect'){
        return res.render('admin', {error: 'É preciso selecionar uma fileira para criar um produto.', fileiras, produtos});
    };


    // Cloudinary
    const cloudinary = require('cloudinary').v2;
        cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });

    try{
        const resCloudinary = await cloudinary.uploader.upload(req.file.path);

        const novoProduto = new ProdutoModel({
            nome: name,
            preco: preco,
            fileira: select,
            img: resCloudinary.url,
        });

        await novoProduto.save();
        res.redirect('http://localhost:3000/admin');
    }catch(error){
        console.log(error);
    }
};

exports.deletarProduto = async (req, res)=>{
    const { id } = req.body;

    try{
        await ProdutoModel.findByIdAndDelete(id);
        res.redirect('http://localhost:3000/admin');
    }catch(error){
        console.log(error);
    };
};

exports.editarProduto = async (req, res)=>{
    const { novoNome, novoPreco, novaFileira, idProduto } = req.body;

    try{
        if(novoNome !== ''){
            await ProdutoModel.findByIdAndUpdate(idProduto, {nome: novoNome});
        };
        if(novoPreco !== ''){
            await ProdutoModel.findByIdAndUpdate(idProduto, {preco: novoPreco});
        };
        if(novaFileira !== '' && novaFileira !== 'Clique para mudar fileira'){
            await ProdutoModel.findByIdAndUpdate(idProduto, {fileira: novaFileira});
        };
        res.redirect('http://localhost:3000/admin');
    }catch(error){
        console.log(error);
    };
};
