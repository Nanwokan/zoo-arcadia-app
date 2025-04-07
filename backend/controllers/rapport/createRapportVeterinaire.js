const db = require('../../db').promise();


const createRapportVeterinaire = async (req, res, next) => {
  const { animal_id, veterinaire_id, etat, nourriture, grammage, detail } = req.body;

  if (!animal_id || !veterinaire_id) {
    return res.status(400).json({ message: "animal_id et veterinaire_id sont requis." });
  }

  try {
    const [animalRows] = await db.query(`SELECT prenom FROM animal WHERE id = ?`, [animal_id]);
    const animal = animalRows[0];

    await db.query(
      `INSERT INTO rapport_veterinaire 
      (animal_id, veterinaire_id, etat, nourriture, grammage, detail)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [animal_id, veterinaire_id, etat, nourriture, grammage, detail]
    );

    res.status(201).json({ message: "Rapport vétérinaire enregistré avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = createRapportVeterinaire;
