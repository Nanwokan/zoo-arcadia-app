const AnimalView = require('../../models/animalViews');

const getAnimalViews = async (req, res) => {
  try {
    const vues = await AnimalView.find().sort({ vues: -1 });
    res.json(vues.map(v => ({ nom: v.nom, vues: v.vues })));
  } catch (error) {
    console.error('Erreur récupération statistiques :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = getAnimalViews;
