const db = require('../../db');

const deleteService = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [result] = await db.query('DELETE FROM service WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service non trouvé." });
    }

    res.status(200).json({ message: "Service supprimé avec succès." });
  } catch (error) {
    next(err);
  }
};

module.exports = deleteService;
