const db = require('../../db').promise();

const getAnimalsByHabitat = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT h.nom AS habitat, COUNT(*) AS total
      FROM animal a
      JOIN habitat h ON a.habitat_id = h.id
      GROUP BY h.nom
    `);

    res.json(rows); // [{ habitat: "Savane", total: 5 }, ...]
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = getAnimalsByHabitat;
