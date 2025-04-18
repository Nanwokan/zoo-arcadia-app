const db = require('../../db');

const getAllValidAvis = async (req, res, next) => {
  const sql = `
    SELECT id, nom, prenom, avis_text, avatar_url, date_creation
    FROM avis
    WHERE est_valide = 1
    ORDER BY date_creation DESC
  `;

  try {
    const [avis] = await db.query(sql);
    res.status(200).json(avis);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllValidAvis;
