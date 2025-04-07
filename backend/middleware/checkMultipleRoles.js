module.exports = function checkMultipleRoles(allowedRoles = []) {
    return (req, res, next) => {
      const user = req.user;
  
      if (!user) {
        return res.status(401).json({ message: "Utilisateur non authentifié." });
      }
  
      if (!allowedRoles.includes(user.role_id)) {
        return res.status(403).json({ message: "Accès refusé. Rôle insuffisant." });
      }
  
      next(); // ✅ L'utilisateur a un rôle autorisé
    };
  };
  