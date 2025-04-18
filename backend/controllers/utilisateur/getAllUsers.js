const db = require('../../db');

const getAllUsers = async (req, res, next) => {
  try {
    const [users] = await db.query(`
      SELECT 
        u.id, 
        u.email, 
        u.nom, 
        u.prenom, 
        u.photo_profil_url, 
        u.role_id, 
        r.label AS role_label
      FROM utilisateur u
      JOIN role r ON u.role_id = r.id
    `);
    
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllUsers;
