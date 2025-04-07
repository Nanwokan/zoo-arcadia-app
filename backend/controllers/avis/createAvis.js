const db = require('../../db');

module.exports = async (req, res) => {
  const { nom, prenom, avis_text } = req.body;

  if (!nom || !prenom || !avis_text) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(prenom)}+${encodeURIComponent(nom)}&background=random&size=128`;

  try {
    // On insère sans déstructuration
    const [insertResult] = await db.execute(
      `INSERT INTO avis (nom, prenom, avis_text, avatar_url) VALUES (?, ?, ?, ?)`,
      [nom, prenom, avis_text, avatarUrl]
    );

    console.log("🧪 Résultat de l'insertion :", insertResult);

    if (!insertResult || !insertResult.insertId) {
      throw new Error("Échec lors de l'insertion de l'avis.");
    }

    const [rows] = await db.execute(
      'SELECT * FROM avis WHERE id = ?',
      [insertResult.insertId]
    );
    const avisCree = rows[0];

    res.status(201).json({
      message: 'Avis créé avec succès',
      avis: avisCree
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'avis :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
