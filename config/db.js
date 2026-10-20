// config/db.js
const mongoose = require('mongoose');
 
async function connectDB() {
  try {
    // Conecta usando a URI definida no .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    // Se a conexão falhar, exibe o erro e encerra
    console.error('Erro ao conectar:', error.message);
    process.exit(1);
  }
}
 
module.exports = connectDB;