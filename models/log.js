const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  datePlayed: {type: String},
  winCondition: {type: String, required: true},
  result: {type: String, required: true},
  gameNotes: String,
  endGameImage: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  game: { type: mongoose.Schema.ObjectId, ref: 'Game', required: true }
}, {
  timestamps: true
});

logSchema.methods.belongsTo = function logBelongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Log', logSchema);
