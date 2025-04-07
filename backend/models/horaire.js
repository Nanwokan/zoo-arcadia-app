const mongoose = require('mongoose');

const jourSchema = new mongoose.Schema({
  ouverture: { type: String, required: true }, // format "HH:mm"
  fermeture: { type: String, required: true }
}, { _id: false });

const horaireSchema = new mongoose.Schema({
  jours: {
    lundi: { type: jourSchema, required: true },
    mardi: { type: jourSchema, required: true },
    mercredi: { type: jourSchema, required: true },
    jeudi: { type: jourSchema, required: true },
    vendredi: { type: jourSchema, required: true },
    samedi: { type: jourSchema, required: true },
    dimanche: { type: jourSchema, required: true }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Horaire', horaireSchema);
