const AnimalView = require('../../models/animalViews');

const incrementAnimalView = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;

  if (!id || !nom) {
    return res.status(400).json({ message: "ID ou nom manquant" });
  }

  try {
    const existing = await AnimalView.findOne({ animal_id: id });

    if (existing) {
      existing.vues++;
      await existing.save();
    } else {
      await AnimalView.create({
        animal_id: id,
        nom,
        vues: 1
      });
    }

    res.status(200).json({ message: "Vue enregistrée avec succès" });

  } catch (error) {
    console.error("Erreur lors de l'incrémentation :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = incrementAnimalView;
