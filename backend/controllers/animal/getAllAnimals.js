const db = require('../../db');

const getAllAnimals = async (req, res, next) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        a.prenom,
        a.habitat_id, -- 👈 ajouté ici
        r.label AS race,
        h.nom AS habitat,
        (
          SELECT url FROM animal_image 
          WHERE animal_id = a.id 
          ORDER BY id ASC 
          LIMIT 1
        ) AS image_url
      FROM animal a
      JOIN race r ON a.race_id = r.id
      JOIN habitat h ON a.habitat_id = h.id
    `);    

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllAnimals;
