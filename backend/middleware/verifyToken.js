const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 📭 Vérifie si le header Authorization existe
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant ou invalide." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔐 Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 👤 Attache les infos de l'utilisateur à la requête
    req.user = decoded;

    next(); // Passe à la route suivante
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
};

module.exports = verifyToken;
