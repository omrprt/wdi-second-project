const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  firstName: { type: String, minlength: 2, required: true, trim: true },
  lastName: { type: String, minlength: 2, required: true, trim: true },
  username: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  collectionLog: [{ type: mongoose.Schema.ObjectId, ref: 'Game'}],
  wishList: [{type: mongoose.Schema.ObjectId, ref: 'Game'}],
  playLog: [{ type: mongoose.Schema.ObjectId, ref: 'Log'}]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(this._passwordConfirmation && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasCollected = function hasCollected(game) {
  // .some method returns true if one item in the array passes the test
  // we loop over the user's collectionLog array (array of ids)
  // we check to see if any of those ids matches the id of the game that we have passed in
  return this.collectionLog.some((log) => {
    return log.equals(game._id);
  });
};

userSchema.methods.hasWished = function hasWished(game) {
  // .some method returns true if one item in the array passes the test
  // we loop over the user's collectionLog array (array of ids)
  // we check to see if any of those ids matches the id of the game that we have passed in
  return this.wishList.some((wish) => {
    return wish.equals(game._id);
  });
};

module.exports = mongoose.model('User', userSchema);
