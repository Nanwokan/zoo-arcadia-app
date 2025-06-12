const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Création d'un pool de connexions avec promesses
const pool = mysql.createPool({
  host: process.env.DB_HOST,            // ex: switchyard.proxy.rlwy.net
  port: process.env.DB_PORT,            // ex: 43484
  user: process.env.DB_USER,            // ex: root
  password: process.env.DB_PASSWORD,    // ton mot de passe Railway
  database: process.env.DB_NAME,        // nom de ta base Railway
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(() => console.log('Connexion DB réussie'))
  .catch(err => console.error('❌ Connexion DB échouée :', err.message));


// Exportation du pool avec support des promesses
module.exports = pool.promise();
