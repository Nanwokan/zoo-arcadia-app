const db = require('../../db');

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(
      'SELECT id, email, nom, prenom, photo_profil_url, role_id FROM utilisateur WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    res.status(200).json(rows[0]);

  } catch (err) {
    next(err);
  }
};

module.exports = getUserById;
