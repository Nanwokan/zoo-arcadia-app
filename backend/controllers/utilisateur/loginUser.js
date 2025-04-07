const db = require('../../db').promise();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res, next) => {
  const { email, mot_de_passe } = req.body;

  try {
    // 🔍 Vérifier si l'utilisateur existe
    const [rows] = await db.query('SELECT * FROM utilisateur WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = rows[0];
    
    // 🔐 Vérifier le mot de passe
    const match = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!match) {
      return res.status(401).json({ message: "Mot de passe incorrect." });
    }

    // 🪪 Générer un token JWT
    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    // ✅ Retourner les infos (sans le mot de passe) + token
    const { mot_de_passe: hash, ...userSansMotDePasse } = user;
    res.status(200).json({
      message: "Connexion réussie.",
      utilisateur: userSansMotDePasse,
      token
    });

  } catch (error) {
    next(err);
  }
};

module.exports = loginUser;
