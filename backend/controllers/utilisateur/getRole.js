const db = require('../../db');

const getRole = async (req, res, next) => {
  try {
    const [roles] = await db.query('SELECT * FROM role');
    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
};

module.exports = getRole;
