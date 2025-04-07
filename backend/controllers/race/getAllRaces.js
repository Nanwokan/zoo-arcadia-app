const db = require('../../db').promise();

const getAllRaces = async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT id, label FROM race');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllRaces;
