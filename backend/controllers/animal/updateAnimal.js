const db = require('../../db').promise();

const updateAnimal = async (req, res, next) => {
  const id = req.params.id;
  const { prenom, habitat_id, race_id } = req.body;

  console.log("🎯 Valeurs reçues :", { prenom, habitat_id, race_id });


  if (!prenom || !habitat_id || !race_id) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const [result] = await db.query(
      'UPDATE animal SET prenom = ?, habitat_id = ?, race_id = ? WHERE id = ?',
      [prenom, habitat_id, race_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Animal non trouvé." });
    }

    res.status(200).json({ id: id, message: "Animal mis à jour avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = updateAnimal;
