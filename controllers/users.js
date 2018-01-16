const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .populate('collectionLog wishList')
    .exec()
    .then((users) => {
      if(!users) return res.notFound();
      return res.render('users/index', { users });
    })
    .catch(next);
}

function myProfileRoute(req, res, next) {
  User
    .find()
    .populate()
    .exec()
    .then((users) => {
      if(!users) return res.notFound();
      return res.render('users/myprofile', { users });
    })
    .catch(next);
}

function addGameToCollectionRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      user.collectionLog.push(req.body.id);
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

function addGameToWishListRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user.wishList.push(req.body.id);
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

function deleteCollectionLogRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      const collectionLog = user.collectionLogs.id(req.params.collectionLogId);
      collectionLog.remove();

      return user.save();
    })
    .then((user) => {
      res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}



module.exports = {
  index: indexRoute,
  addGameToCollection: addGameToCollectionRoute,
  addGameToWishList: addGameToWishListRoute,
  deleteCollection: deleteCollectionLogRoute,
  myProfile: myProfileRoute
};
