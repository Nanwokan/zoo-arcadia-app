const Hero = require('../../models/hero');

const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) return res.status(404).json({ message: "Hero non trouvé" });
    res.json(hero);
  } catch (err) {
    console.error("Erreur getHero :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = getHero;
