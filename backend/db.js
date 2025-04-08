const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,            // switchyard.proxy.rlwy.net
  port: process.env.DB_PORT,            // 43484
  user: process.env.DB_USER,            // root
  password: process.env.DB_PASSWORD,    // le mot de passe railway
  database: process.env.DB_NAME,        // railway
  connectTimeout: 10000                 // en ms, pour éviter l’ETIMEDOUT
});

db.connect((err) => {
  if (err) {
    console.error('❌ Erreur de connexion :', err.message);
    return;
  }
  console.log('✅ Connecté à la base MySQL !');
});

module.exports = db;
