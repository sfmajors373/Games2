const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  console: {
    type: String,
    enum: ['Atari'],
  },
  altTitle: {
    type: String,
  },
  Code: {
    type: String,
  },
  designerProgrammer: {
    type: String,
  },
  publisher: {
    type: String,
  },
  year: {
    type: Number,
  },
  genre: {
    type: String,
  },
  notes: {
    type: String,
  },
  picture: {
    type: String,
  },
});

module.exports = mongoose.model('Game', GameSchema);
