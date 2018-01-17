const User = require('../models/user');
const Game = require('../models/game');
const Log = require('../models/log');

function indexRoute(req, res) {
  Game
    .findById(req.params.id)
    .exec()
    .then(game => {
      return res.render('playLog/new', { game });
    });
}

function addToPlayLogRoute(req, res, next) {
  req.body.createdBy = req.user;
  req.body.game = req.params.id;

  Log
    .create(req.body)
    .then(log => {

      User
        .findById(log.createdBy._id)
        .exec()
        .then((user) => {
          user.playLog.push(log._id);
          return user.save();
        })
        .catch((err) => {
          if(err.name === 'ValidationError') {
            return res.badRequest(`/users/${req.params.id}`, err.toString());
          }
          next(err);
        });

      Game
        .findById(log.game._id)
        .exec()
        .then((game) => {
          game.logs.push(log._id);
          return game.save();
        })
        .catch((err) => {
          if(err.name === 'ValidationError') {
            return res.badRequest(`/users/${req.params.id}`, err.toString());
          }
          next(err);
        });
    });
}

module.exports = {
  new: indexRoute,
  add: addToPlayLogRoute
};
