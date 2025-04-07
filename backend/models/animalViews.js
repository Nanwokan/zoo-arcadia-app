const mongoose = require('mongoose');

const animalViewsSchema = new mongoose.Schema({
  animal_id: { type: Number, required: true, unique: true }, // id MySQL de l'animal
  nom: { type: String, required: true },
  vues: { type: Number, default: 0 }
});

module.exports = mongoose.model('AnimalView', animalViewsSchema);
