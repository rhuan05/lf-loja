require('dotenv').config();
const FileiraModel = require('../models/Fileira');
const ProdutoModel = require('../models/Produtos');
const BannerModel = require('../models/Banner');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.paginaInicialAdmin = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const banners = await BannerModel.find();

    try{
        res.render('admin', {error: '', fileiras, produtos, banners});
    }catch(error){
        console.log(error);
    };
};

exports.adicionarFileira = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const banners = await BannerModel.find();
    const { titulo } = req.body;

    if(!titulo){
        return res.render('admin', {error: 'Preencha o campo titulo para adicionar uma fileira.', fileiras, produtos, banners});
    };

    const novaFileira = new FileiraModel({
        titulo: titulo,
    });

    try{
        await novaFileira.save();
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
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
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
    }catch(error){
        console.log(error);
    };
};

exports.criarProduto = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const banners = await BannerModel.find();
    const { name, preco, select } = req.body;
    const imgProduto = req.file;

    if(!name || !preco){
        return res.render('admin', {error: 'Para criar um produto ?? preciso preencher todos os campos.', fileiras, produtos, banners});
    };

    if(!imgProduto){
        return res.render('admin', {error:'Para criar um produto ?? preciso inserir uma imagem nele.', fileiras, produtos, banners});
    };
    
    if(select === 'valorNuloSelect'){
        return res.render('admin', {error: '?? preciso selecionar uma fileira para criar um produto.', fileiras, produtos, banners});
    };

    try{
        const resCloudinary = await cloudinary.uploader.upload(req.file.path);

        const novoProduto = new ProdutoModel({
            nome: name,
            preco: preco,
            fileira: select,
            img: resCloudinary.url,
        });

        await novoProduto.save();
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
    }catch(error){
        console.log(error);
    }
};

exports.deletarProduto = async (req, res)=>{
    const { id } = req.body;

    try{
        await ProdutoModel.findByIdAndDelete(id);
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
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
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
    }catch(error){
        console.log(error);
    };
};

exports.adicionarBanner = async (req, res)=>{
    const fileiras = await FileiraModel.find();
    const produtos = await ProdutoModel.find();
    const banners = await BannerModel.find();

    if(!req.file){
        return res.render('admin', {error: '?? preciso selecionar uma imagem para adicionar um banner.', fileiras, produtos, banners});
    };

    try{
        const resCloudinary = await cloudinary.uploader.upload(req.file.path);

        const novoBanner = new BannerModel({
            imgBanner: resCloudinary.url,
        });

        await novoBanner.save();
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
    }catch(err){
        console.log(err);
    };
};

exports.excluirBanner = async(req, res)=>{
    const { idBannerForDelete } = req.body;

    try{
        await BannerModel.findByIdAndDelete(idBannerForDelete);
        res.redirect('https://lf-papelaria.herokuapp.com/admin');
    }catch(err){
        console.log(err);
    };
};