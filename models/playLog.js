const mongoose = require('mongoose');

const playLogSchema = new mongoose.Schema({
  gameTitle: { type: String, required: true},
  datePlayed: {type: String},
  winCondition: {type: Number, required: true},
  result: {type: String, required: true},
  endGameImage: {type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

playLogSchema.methods.belongsTo = function playLogBelongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('PlayLog', playLogSchema);
