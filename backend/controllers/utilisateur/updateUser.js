const db = require('../../db');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const updateDetailUser = async (req, res, next) => {
  const { email, nom, prenom, role_id } = req.body;
  const id = req.params.id;
  const image = req.file;

  try {
    let photoUrl;

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'zoo-arcadia/profils'
      });
      photoUrl = result.secure_url;
      fs.unlinkSync(image.path);
    }

    const query = image
      ? 'UPDATE utilisateur SET email = ?, nom = ?, prenom = ?, photo_profil_url = ?, role_id = ? WHERE id = ?'
      : 'UPDATE utilisateur SET email = ?, nom = ?, prenom = ?, role_id = ? WHERE id = ?';

    const values = image
      ? [email, nom, prenom, photoUrl, role_id, id]
      : [email, nom, prenom, role_id, id];

    const [result] = await db.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json({ message: "Données utilisateur modifiées avec succès." });
  } catch (err) {
    next(err);
  }
};

module.exports = updateDetailUser;