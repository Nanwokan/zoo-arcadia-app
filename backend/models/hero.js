const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hero', heroSchema);
