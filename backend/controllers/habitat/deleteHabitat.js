const db = require('../../db').promise();

const deleteHabitat = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM habitat WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Habitat non trouvé." });
    }

    res.status(200).json({ message: "Habitat supprimé avec succès." });
  } catch (error) {
    next(err);
  }
};

module.exports = deleteHabitat;
