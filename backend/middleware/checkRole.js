module.exports = function checkRole(requiredRoleId) {
    return (req, res, next) => {
      // Le token a déjà été vérifié par verifyToken, donc req.user est disponible
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non authentifié." });
      }
  
      if (user.role_id !== requiredRoleId) {
        return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." });
      }
  
      next(); // ✅ L'utilisateur a le bon rôle
    };
  };
  