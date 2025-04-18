const db = require('../../db');

const deleteAvis = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM avis WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Avis non trouvé." });
    }

    res.status(200).json({ message: "Avis supprimé avec succès." });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteAvis;
