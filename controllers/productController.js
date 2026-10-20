// controllers/productController.js
const Product = require('../models/Product');
 
// Lista todos, do mais recente para o mais antigo
exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Product.find()
      .sort({ createdAt: -1 });
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao listar produtos',
      erro: error.message
    });
  }
}

// Cria um novo produto com os dados do body
exports.criarProduto = async (req, res) => {
  try {
    const { nome, descricao, preco } = req.body;
 
    const novoProduto = new Product({
      nome, descricao, preco
    });
    await novoProduto.save();
 
    res.status(201).json(novoProduto);
  } catch (error) {
    // Erros de validação do Mongoose caem aqui
    res.status(400).json({
      mensagem: 'Erro ao criar produto',
      erro: error.message
    });
  }
}

// Exclui um produto pelo seu ID
exports.excluirProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const produtoExcluido =
      await Product.findByIdAndDelete(id);
 
    if (!produtoExcluido) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado'
      });
    }
 
    res.status(200).json({
      mensagem: 'Produto excluído com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      mensagem: 'Erro ao excluir produto',
      erro: error.message
    });
  }
};