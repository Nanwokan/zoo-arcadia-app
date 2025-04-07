const db = require('../../db')

const getRole = (req,res) => {
    db.query(
        'SELECT * FROM role',
        (err, result) => {
            if (err) {
                res.status(500).json({ message: 'Erreur serveur' });
              } else {
                res.status(200).json(result);
            }
        }
      );
}

module.exports = getRole;
