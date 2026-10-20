// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
 
const app = express();
connectDB();
 
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api/produtos', productRoutes);
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})