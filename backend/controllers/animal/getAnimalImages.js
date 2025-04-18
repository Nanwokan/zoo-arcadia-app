const db = require('../../db');

const getAnimalImages = async (req, res, next) => {
  const animalId = req.params.id;

  try {
    const [rows] = await db.query(
      'SELECT id, url FROM animal_image WHERE animal_id = ?',
      [animalId]
    );

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getAnimalImages;
