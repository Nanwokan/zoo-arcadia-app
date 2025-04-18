const db = require('../../db');

const getAllCommentairesHabitat = async (req, res, next) => {
    try {
        const [rows] = await db.query(`
      SELECT ch.id, ch.commentaire, ch.date_commentaire, h.nom AS habitat, u.nom AS veterinaire
      FROM commentaire_habitat ch
      JOIN habitat h ON ch.habitat_id = h.id
      JOIN utilisateur u ON ch.veterinaire_id = u.id
      ORDER BY ch.date_commentaire DESC

    `);

        res.status(200).json(rows);
    } catch (err) {
        next(err);
    }
};

module.exports = getAllCommentairesHabitat;
