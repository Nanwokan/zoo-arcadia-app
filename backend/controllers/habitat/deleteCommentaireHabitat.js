const db = require('../../db');

const deleteCommentaireHabitat = async (req, res, next) => {
  const commentaireId = req.params.id;

  try {
    const [result] = await db.query(
      'DELETE FROM commentaire_habitat WHERE id = ?',
      [commentaireId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé." });
    }

    res.status(200).json({ message: "Commentaire supprimé avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = deleteCommentaireHabitat;
