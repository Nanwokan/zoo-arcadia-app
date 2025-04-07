const db = require('../../db').promise(); // ← ajoute .promise()
const bcrypt = require('bcrypt');

const updatePassword = async (req, res, next) => {
    const id = req.params.id;
    const { mot_de_passe } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        const [result] = await db.query(
            'UPDATE utilisateur SET mot_de_passe = ? WHERE id = ?',
            [hashedPassword, id]
        );    
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
      
        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });

    } catch (err) {
        next(err);
    }

};

module.exports = updatePassword