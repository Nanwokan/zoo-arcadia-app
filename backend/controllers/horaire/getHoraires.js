const Horaire = require('../../models/horaire');

const getHoraires = async (req, res) => {
  try {
    const horaires = await Horaire.findOne(); // On suppose qu’un seul document est présent
    if (!horaires) {
      return res.status(404).json({ message: "Aucun horaire trouvé." });
    }
    res.status(200).json(horaires);
  } catch (err) {
    console.error("❌ Erreur récupération horaires :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = getHoraires;
