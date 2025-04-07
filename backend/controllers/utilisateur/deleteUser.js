const db = require('../../db').promise();

const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM utilisateur WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteUser;
