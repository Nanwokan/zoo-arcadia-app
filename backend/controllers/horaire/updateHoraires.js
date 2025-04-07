const Horaire = require('../../models/horaire');

const updateHoraires = async (req, res) => {
  const { jours } = req.body;

  try {
    const horairesExistants = await Horaire.findOne();

    if (horairesExistants) {
      horairesExistants.jours = jours;
      await horairesExistants.save();
      res.status(200).json({ message: "Horaires mis à jour avec succès." });
    } else {
      const nouveauxHoraires = new Horaire({ jours });
      await nouveauxHoraires.save();
      res.status(201).json({ message: "Horaires créés avec succès." });
    }

  } catch (err) {
    console.error("❌ Erreur mise à jour horaires :", err);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = updateHoraires;
