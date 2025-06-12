const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Création d'un pool de connexions avec promesses
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Version promesse du pool
const db = pool.promise();

// ✅ Test de connexion avec une requête simple
db.query('SELECT 1')
  .then(() => console.log('✅ Connexion DB réussie'))
  .catch((err) => console.error('❌ Connexion DB échouée :', err.message));

// Export du pool promisifié
module.exports = db;
git 