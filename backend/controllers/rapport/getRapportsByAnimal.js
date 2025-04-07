const db = require('../../db').promise();

const getRapportsByAnimal = async (req, res, next) => {
  const animalId = req.params.id;

  try {
    const [rows] = await db.query(`
      SELECT rv.id, rv.etat, rv.nourriture, rv.grammage, rv.date_passage, rv.detail,
             CONCAT(u.prenom, ' ', u.nom) AS veterinaire,
             a.prenom AS animal_prenom,
             (SELECT url FROM animal_image WHERE animal_id = a.id LIMIT 1) AS image_url
      FROM rapport_veterinaire rv
      JOIN utilisateur u ON rv.veterinaire_id = u.id
      JOIN animal a ON rv.animal_id = a.id
      WHERE rv.animal_id = ?
      ORDER BY rv.date_passage DESC
    `, [animalId]);

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getRapportsByAnimal;
