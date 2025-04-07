const Hero = require('../../models/hero');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const updateHero = async (req, res) => {
  try {
    const { titre, description } = req.body;

    if (!titre || !description) {
      return res.status(400).json({ message: "Le titre et la description sont requis." });
    }

    let image_url;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image_url = result.secure_url;
      fs.unlinkSync(req.file.path); // nettoyage du fichier temporaire
    }

    let hero = await Hero.findOne();

    if (!hero) {
      hero = new Hero({
        titre,
        description,
        image_url: image_url || ''
      });
      await hero.save();
      return res.status(201).json(hero);
    }

    // Mise à jour
    hero.titre = titre;
    hero.description = description;
    if (image_url) hero.image_url = image_url;

    await hero.save();
    res.status(200).json(hero);
  } catch (err) {
    console.error("Erreur updateHero :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = updateHero;
