const db = require('../../db');

const getAllServices = async (req, res, next) => {
  try {
    const [services] = await db.query(
      'SELECT id, nom, description, image_url FROM service'
    );
    res.status(200).json(services);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllServices;
