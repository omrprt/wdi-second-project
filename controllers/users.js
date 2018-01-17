const User = require('../models/user');

function homePageRoute(req, res, next) {
  if(req.user) {
    User
      .findById(req.user.id)
      .populate('collectionLog wishList playLog')
      .exec()
      .then((user) => {
        console.log(req.user);
        if(!user) return res.notFound();
        return res.render('statics/index', { user });
      })
      .catch(next);
  } else {
    return res.render('statics/index');
  }
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
    .populate([{
      path: 'collectionLog',
      model: 'Game'
    },{
      path: 'wishList',
      model: 'Game'
    },{
      path: 'playLog',
      model: 'Log',
      populate: {
        path: 'game',
        model: 'Game'
      }
    }])
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

function deleteFromCollectionLogRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      const newCollectionLog = user.collectionLog.reduce((accumulator, current) => {
        if(current.toString() !== req.params.gameId.toString()) {
          accumulator.push(current);
        }
        return accumulator;
      }, []);

      user.collectionLog = newCollectionLog;
      return user.save();
    })
    .then(() => {
      res.redirect('back');
    })
    .catch(next);
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


module.exports = {
  index: indexRoute,
  addGameToCollection: addGameToCollectionRoute,
  addGameToWishList: addGameToWishListRoute,
  deleteFromCollection: deleteFromCollectionLogRoute,
  myProfile: myProfileRoute,
  homePage: homePageRoute
};
