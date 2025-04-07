// getAllPendingAvis.js
const db = require('../../db');

const getAllPendingAvis = (req, res) => {
  const sql = `
    SELECT id, nom, prenom, avis_text, avatar_url, date_creation
    FROM avis
    WHERE est_valide = 0
    ORDER BY date_creation DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    } else {
      res.status(200).json(result);
    }
  });
};

module.exports = getAllPendingAvis;
