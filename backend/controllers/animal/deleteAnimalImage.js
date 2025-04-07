const db = require('../../db').promise();

const deleteAnimalImage = async (req, res, next) => {
  const imageId = req.params.id;

  try {
    const [result] = await db.query(
      'DELETE FROM animal_image WHERE id = ?',
      [imageId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Image non trouvée." });
    }

    res.status(200).json({ message: "Image supprimée avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = deleteAnimalImage;
