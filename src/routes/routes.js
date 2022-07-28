const express = require('express');
const router = express.Router();
const HomeController = require('../controller/HomeController');
const AdminController = require('../controller/AdminController');

// Multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, 'uploads/');
    },
    filename:(req, file, cb)=>{
        cb(null, (Math.random() * 10) + file.originalname);
    },
});

// Rotas
router.get('/', HomeController.paginaInicialHome);
router.post('/', HomeController.procurarProduto);

router.get('/admin', AdminController.paginaInicialAdmin);
router.post('/admin-nova-fileira', AdminController.adicionarFileira);
router.post('/admin-fileira-delete', AdminController.deletarFileira);
router.post('/admin-criar-produto', multer({storage}).single('imgProduto') ,AdminController.criarProduto);
router.post('/admin-deletar-produto', AdminController.deletarProduto);
router.post('/admin-editar-produto', AdminController.editarProduto);

module.exports = router;