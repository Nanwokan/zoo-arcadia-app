const db = require('../../db');

const getAllUsers = (req, res) => {
  db.query(
    `SELECT u.id, u.email, u.nom, u.prenom, u.photo_profil_url, u.role_id, r.label AS role_label
     FROM utilisateur u
     JOIN role r ON u.role_id = r.id`,
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
      } else {
        res.status(200).json(result);
      }
    }
  );
};

module.exports = getAllUsers;
