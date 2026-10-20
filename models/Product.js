// models/Product.js
const mongoose = require('mongoose');
 
// Schema descreve os campos que um produto deve ter
const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'O nome é obrigatório'],
    trim: true
  },
  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
    trim: true
  },
  preco: {
    type: Number,
    required: [true, 'O preço é obrigatório'],
    min: [0, 'O preço não pode ser negativo']
  }
}, {
  timestamps: true // createdAt e updatedAt
});
 
module.exports = mongoose.model('Product', productSchema);