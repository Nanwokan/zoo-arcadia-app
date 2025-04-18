const db = require('../../db');

const getAllHabitats = async (req, res, next) => {
  try {
    const [habitats] = await db.query(
      'SELECT id, nom, description, image_url FROM habitat'
    );
    res.status(200).json(habitats);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllHabitats;
