const express = require('express');
const db = require('./db')
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

// 🛡️ Middleware central de gestion des erreurs
app.use(errorHandler);

const PORT = process.env.PORT || 2024;
app.listen(PORT, () => {
  console.log(`✅ Serveur Node.js lancé sur le port ${PORT}`);
});



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion MongoDB Atlas réussie"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));