// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController =
  require('../controllers/productController');
 
// GET /api/produtos -> lista
router.get('/', productController.listarProdutos);
 
// POST /api/produtos -> cria
router.post('/', productController.criarProduto);
 
// DELETE /api/produtos/:id -> exclui
router.delete('/:id', productController.excluirProduto);
 
module.exports = router;