const db = require('../../db').promise();

const createAnimal = async (req, res, next) => {
  const { prenom, habitat_id, race_id } = req.body;

  if (!prenom || !habitat_id || !race_id) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const [result] = await db.query(
      'INSERT INTO animal (prenom, habitat_id, race_id) VALUES (?, ?, ?)',
      [prenom, habitat_id, race_id]
    );

    res.status(201).json({ id: result.insertId, message: "Animal ajouté avec succès." });


  } catch (err) {
    next(err);
  }
};

module.exports = createAnimal;
