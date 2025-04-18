const db = require('../../db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const addAnimalImage = async (req, res, next) => {
  const animalId = req.params.id;
  const images = req.files;

  if (!images || images.length === 0) {
    return res.status(400).json({ message: "Aucune image reçue." });
  }

  try {

    console.log("📦 ID animal reçu :", animalId);


    for (let image of images) {
      // Upload image sur Cloudinary
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'zoo-arcadia/animals'
      });

      const imageUrl = result.secure_url;

      // Sauvegarder l'URL dans la base de données
      await db.query(
        'INSERT INTO animal_image (animal_id, url) VALUES (?, ?)',
        [animalId, imageUrl]
      );

      // Supprimer le fichier temporaire
      fs.unlinkSync(image.path);
    }

    res.status(201).json({ message: "Images ajoutées avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = addAnimalImage;
