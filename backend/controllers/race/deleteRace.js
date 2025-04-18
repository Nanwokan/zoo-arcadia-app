const db = require('../../db');

const deleteRace = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM race WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Race non trouvée." });
    }

    res.status(200).json({ message: "Race supprimée avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteRace;
