const db = require('../../db').promise();

const validerAvis = async (req, res, next) => {
  const id = req.params.id;
  const { utilisateur_id } = req.body; // ID de celui qui valide l'avis

  try {
    const [result] = await db.query(
      'UPDATE avis SET est_valide = true, valide_par = ? WHERE id = ?',
      [utilisateur_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Avis non trouvé." });
    }

    res.status(200).json({ message: "Avis validé avec succès." });

  } catch (err) {
    next(err);
  }
};

module.exports = validerAvis;
