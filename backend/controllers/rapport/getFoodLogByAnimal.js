const db = require('../../db');

const getFoodLogByAnimal = async (req, res, next) => {
  const animalId = req.params.id;

  try {
    const [rows] = await db.query(`
      SELECT fl.nourriture, fl.quantite, fl.date_don, fl.heure_don,
             CONCAT(u.prenom, ' ', u.nom) AS donne_par
      FROM food_log fl
      JOIN utilisateur u ON fl.employe_id = u.id
      WHERE fl.animal_id = ?
      ORDER BY fl.date_don DESC, fl.heure_don DESC
    `, [animalId]);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getFoodLogByAnimal;
