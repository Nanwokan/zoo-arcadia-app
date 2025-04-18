const db = require('../../db');

const createRace = async (req, res) => {
  const { label } = req.body;

  if (!label) {
    return res.status(400).json({ message: "Le nom de la race est requis." });
  }

  try {
    const [existing] = await db.query('SELECT * FROM race WHERE label = ?', [label]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Cette race existe déjà." });
    }

    const [result] = await db.query('INSERT INTO race (label) VALUES (?)', [label]);

    res.status(201).json({
      id: result.insertId,
      label,
      message: "Race ajoutée avec succès."
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};


module.exports = createRace;
