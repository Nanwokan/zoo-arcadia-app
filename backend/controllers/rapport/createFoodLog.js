const db = require('../../db').promise();

const createFoodLog = async (req, res, next) => {
  const { animal_id, employe_id, nourriture, quantite, date_don, heure_don } = req.body;

  if (!animal_id || !employe_id || !nourriture || !quantite || !date_don || !heure_don) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    await db.query(
      `INSERT INTO food_log (animal_id, employe_id, nourriture, quantite, date_don, heure_don)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [animal_id, employe_id, nourriture, quantite, date_don, heure_don]
    );

    res.status(201).json({ message: "Enregistrement alimentaire effectué avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = createFoodLog;
