const db = require('../../db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const updateHabitat = async (req, res, next) => {
  const { nom, description } = req.body;
  const id = req.params.id;
  const image = req.file;

  try {
    let imageUrl;

    // Si une nouvelle image est fournie, on l’envoie sur Cloudinary
    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'zoo-arcadia/habitats'
      });
      imageUrl = result.secure_url;

      // Supprimer le fichier temporaire
      fs.unlinkSync(image.path);
    }

    // Requête SQL avec ou sans image selon le cas
    const query = image
      ? 'UPDATE habitat SET nom = ?, description = ?, image_url = ? WHERE id = ?'
      : 'UPDATE habitat SET nom = ?, description = ? WHERE id = ?';

    const values = image
      ? [nom, description, imageUrl, id]
      : [nom, description, id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Habitat non trouvé." });
    }

    res.status(200).json({ message: "Données modifiées avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = updateHabitat;
