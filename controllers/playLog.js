const User           = require('../models/user');
const Game           = require('../models/game');
const Log            = require('../models/log');

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
  req.body.game      = req.params.id;

  Log
    .create(req.body)
    .then(log => {
      User
        .findById(log.createdBy._id)
        .exec()
        .then(user => {
          user.playLog.push(log._id);
          return user.save();
        })
        .then(() => {
          return Game.findById(log.game).exec();
        })
        .then(game => {
          // here
          game.logs.push(log._id);
          return game.save();
        })
        .then(game => {
          return res.redirect(`/games/${game.id}`);
        })
        .catch(next);
    });
}

function deletePlayLogRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then(user =>  {
      if(!user) return res.notFound();
      user.playLog.id(req.params.playLogId).remove();

      return user.save();
    })
    .then(() => {
      res.redirect('back');
    })
    .catch(next);
}

module.exports       = {
  new: indexRoute,
  add: addToPlayLogRoute,
  delete: deletePlayLogRoute
};
