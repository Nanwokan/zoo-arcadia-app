const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,       // "localhost"
    user: process.env.DB_USER,       // "root"
    password: process.env.DB_PASSWORD, // ton mot de passe
    database: process.env.DB_NAME    // "arcadiadb"
});

db.connect((err) => {
    if (err) {
      console.error('❌ Erreur de connexion :', err.message);
      return;
    }
    console.log('✅ Connecté à la base MySQL !');
});
  
module.exports = db;
