const db = require('../../db').promise();

const getAllFoodLog = async (req, res) => {
  try {
    const [rows] = await db.query(`
        SELECT 
          fl.id,
          fl.animal_id,
          a.prenom AS animal_nom,
          fl.nourriture,
          fl.quantite,
          fl.date_don,
          fl.heure_don,
          CONCAT(u.prenom, ' ', u.nom) AS donne_par
        FROM food_log fl
        JOIN animal a ON fl.animal_id = a.id
        JOIN utilisateur u ON fl.employe_id = u.id
        ORDER BY fl.date_don DESC, fl.heure_don DESC
      `);
      

    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Erreur lors de la récupération :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = getAllFoodLog;
