const db = require('../../db').promise();

const createCommentaireHabitat = async (req, res, next) => {
  const habitatId = req.params.id;
  const { veterinaire_id, commentaire } = req.body;

  if (!commentaire || !veterinaire_id) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires." });
  }

  try {
    const [habitatRows] = await db.query(`SELECT nom FROM habitat WHERE id = ?`, [habitatId]);
    const habitat = habitatRows[0];

    await db.query(
      `INSERT INTO commentaire_habitat (habitat_id, veterinaire_id, commentaire)
       VALUES (?, ?, ?)`,
      [habitatId, veterinaire_id, commentaire]
    );

    res.status(201).json({ message: "Commentaire ajouté avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = createCommentaireHabitat;