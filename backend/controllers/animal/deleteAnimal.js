const db = require('../../db').promise();

const deleteAnimal = async (req, res, next) => {
  const id = req.params.id;

  try {
    
    const [result] = await db.query(
      'DELETE FROM animal WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Animal non trouvé." });
    }

    res.status(200).json({ message: "Animal supprimé avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteAnimal;
