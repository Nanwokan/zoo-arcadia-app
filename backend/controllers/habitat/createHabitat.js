const db = require('../../db').promise();
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const createHabitat = async (req, res, next) => {
  const { nom, description } = req.body;
  const image = req.file;

  try {
    // 🔍 Vérifier si le nom existe déjà
    const [existing] = await db.query('SELECT * FROM habitat WHERE nom = ?', [nom]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Un habitat avec ce nom existe déjà." });
    }

    const result = await cloudinary.uploader.upload(image.path, {
      folder: 'zoo-arcadia/habitats'
    });

    const imageUrl = result.secure_url;

    // ✅ Insérer dans la BDD
    await db.query(
      'INSERT INTO habitat (nom, description, image_url) VALUES (?, ?, ?)',
      [nom, description, imageUrl]
    );

    fs.unlinkSync(image.path);

    res.status(201).json({ message: "Habitat créé avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = createHabitat;
