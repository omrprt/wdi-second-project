const User = require('../models/user');

function indexRoute(req, res) {
  return res.render('playLog/new');
}

function addPlayLogRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      console.log(req.body.id);
      user.playLog.push(req.body.id);
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/users/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

function addToPlayLogRoute(req, res, next) {
  console.log(req);
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user.gameLog.push(req.body.id);
      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/users/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

module.exports = {
  new: indexRoute,
  add: addToPlayLogRoute
};
