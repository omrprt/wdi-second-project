const User = require('../models/user');

function homePageRoute(req, res, next) {
  User
    .find()
    .populate('collectionLog wishList playLog')
    .exec()
    .then((user) => {
      console.log(req.user);
      if(!user) return res.notFound();
      return res.render('statics/index', { user });
    })
    .catch(next);
}

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
    .findById(req.user.id)
    .populate('collectionLog wishList playLog')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/myprofile', { user });
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
    .then(() => {
      res.redirect('back');
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
    .then(() => {
      res.redirect('back');
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
      res.redirect('back');
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  addGameToCollection: addGameToCollectionRoute,
  addGameToWishList: addGameToWishListRoute,
  deleteCollection: deleteCollectionLogRoute,
  myProfile: myProfileRoute,
  homePage: homePageRoute
};
