const db = require('../../db').promise();

const getCommentairesHabitat = async (req, res, next) => {
  const habitatId = req.params.id;

  try {
    const [rows] = await db.query(
      `SELECT ch.id, ch.commentaire, ch.date_commentaire, u.nom, u.prenom
       FROM commentaire_habitat ch
       JOIN utilisateur u ON ch.veterinaire_id = u.id
       WHERE ch.habitat_id = ?
       ORDER BY ch.date_commentaire DESC`,
      [habitatId]
    );

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getCommentairesHabitat;
