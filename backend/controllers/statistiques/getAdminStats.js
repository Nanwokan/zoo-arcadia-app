const db = require('../../db').promise();

const getAdminStats = async (req, res) => {
  try {
    const [[{ total_animaux }]] = await db.query('SELECT COUNT(*) AS total_animaux FROM animal');
    const [[{ total_users }]] = await db.query('SELECT COUNT(*) AS total_users FROM utilisateur');
    const [[{ employes }]] = await db.query('SELECT COUNT(*) AS employes FROM utilisateur WHERE role_id = 2');
    const [[{ veterinaires }]] = await db.query('SELECT COUNT(*) AS veterinaires FROM utilisateur WHERE role_id = 3');

    res.json({ total_animaux, total_users, employes, veterinaires });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération des stats admin." });
  }
};

module.exports = getAdminStats;
