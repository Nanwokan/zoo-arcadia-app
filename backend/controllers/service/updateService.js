const db = require('../../db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const updateService = async (req, res) => {
  const { nom, description } = req.body;
  const id = req.params.id;
  const image = req.file;

  try {
    let imageUrl;

    // S’il y a une image à uploader
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'zoo-arcadia/services'
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(image.path);
    }

    const query = image
      ? 'UPDATE service SET nom = ?, description = ?, image_url = ? WHERE id = ?'
      : 'UPDATE service SET nom = ?, description = ? WHERE id = ?';

    const values = image
      ? [nom, description, imageUrl, id]
      : [nom, description, id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Service non trouvé." });
    }

    res.status(200).json({ message: "Données modifiées avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = updateService;
