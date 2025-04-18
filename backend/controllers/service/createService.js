const db = require('../../db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const createService = async (req, res, next) => {
  const { nom, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ message: "Aucune image reçue." });
  }
  

  try {
    // 🔍 Vérifier si le nom existe déjà
    const [existing] = await db.query('SELECT * FROM service WHERE nom = ?', [nom]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Un service avec ce nom existe déjà." });
    }

    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'zoo-arcadia/services'
    });

    const imageUrl = result.secure_url;

    // Enregistrement dans la base de données
    await db.query(
      'INSERT INTO service (nom, description, image_url) VALUES (?, ?, ?)',
      [nom, description, imageUrl]
    );

    // Suppression de l’image temporaire du dossier uploads
    fs.unlinkSync(image.path);

    res.status(201).json({ message: "Service créé avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = createService;
