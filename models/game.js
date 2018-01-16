const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  return this.createdBy.id === user.id;
};

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: String,
  description: String,
  playingTime: String,
  setUpTime: String,
  players: String,
  genre: String,
  designer: String,
  illustrator: String,
  publisher: String,
  publisherURL: String,
  playerRating: String,
  buy: String,
  comments: [ commentSchema ],
  logs: [{ type: mongoose.Schema.ObjectId, ref: 'Log'}]
});

gameSchema.methods.belongsTo = function belongsTo(user) {
  return this.createdBy.id === user.id;
};

module.exports = mongoose.model('Game', gameSchema);
