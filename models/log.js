const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  datePlayed: {type: String},
  winCondition: {type: Number, required: true},
  result: {type: String, required: true},
  gameNotes: String,
  endGameImage: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.ObjectId, ref: 'Game', required: true }
}, {
  timestamps: true
});

logSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Log', logSchema);