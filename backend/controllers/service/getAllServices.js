const db = require('../../db');

const getAllServices = (req,res) => {
    db.query(
        'SELECT id, nom, description, image_url FROM service',
        (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Erreur serveur' });
              } else {
                res.status(200).json(result);
            }
        }
      );
}

module.exports = getAllServices;
