const db = require('../../db');
const bcrypt = require('bcryptjs');
const sendMail = require('../../utils/sendMail');
const cloudinary = require('../../config/cloudinary');
const fs = require('fs');

const signupUser = async (req, res, next) => {
  const { email, mot_de_passe, nom, prenom, role_id } = req.body;
  const image = req.file;

  try {
    const [results] = await db.query('SELECT * FROM utilisateur WHERE email = ?', [email]);

    if (results.length > 0) {
      return res.status(409).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

    let photoUrl;

    if (image) {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'zoo-arcadia/profils'
      });
      photoUrl = result.secure_url;
      fs.unlinkSync(image.path);
    } else {
      const initials = `${prenom?.[0] || ''}${nom?.[0] || ''}`.toUpperCase();
      photoUrl = `https://ui-avatars.com/api/?name=${initials}&background=random&bold=true&size=256`;
    }

    await db.query(
      'INSERT INTO utilisateur (email, mot_de_passe, nom, prenom, photo_profil_url, role_id) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, nom, prenom, photoUrl, role_id]
    );

    res.status(201).json({ message: "Utilisateur créé avec succès." });

    await sendMail(
      email,
      'Votre compte Zoo Arcadia a été créé',
      `<p>Bonjour ${prenom} ${nom},</p>
       <p>Un compte a été créé pour vous sur la plateforme <strong>Zoo Arcadia</strong>.</p>
       <p><strong>Identifiant :</strong> ${email}</p>
       <p>⚠️ Le mot de passe n'est pas communiqué par mail. Veuillez contacter l’administrateur pour le recevoir.</p>
       <p>Bienvenue dans l'equipe !🐾</p>
       <p>À bientôt 🐾</p>`
    );
    

  } catch (err) {
    next(err);
  }
};

module.exports = signupUser;
