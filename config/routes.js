const router        = require('express').Router();
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const games         = require('../controllers/games');
const users         = require('../controllers/users');
const playLog       = require('../controllers/playLog');
const secureRoute   = require('../lib/secureRoute');

router.route('/')
  .get(users.homePage);

router.route('/users')
  .get(users.index);

router.route('/users/:id/collectionlog')
  .post(secureRoute, users.addGameToCollection);

router.route('/users/:id/collectionlog/:gameId')
  .put(secureRoute, users.deleteFromCollection);

router.route('/users/:id/wishList')
  .post(secureRoute, users.addGameToWishList);

router.route('/users/:id/wishList/:gameId')
  .put(secureRoute, users.deleteFromWishList);

router.route('/logs/:id')
  .get(playLog.new)
  .post(secureRoute, playLog.add);

router.route('/myprofile')
  .get(secureRoute, users.myProfile);

router.route('/games')
  .get(games.index)
  .post(secureRoute, games.create);

router.route('/games/:id')
  .get(games.show);

router.route('/games/:id/comments')
  .post(secureRoute, games.createComment);

router.route('/games/:id/comments/:commentId')
  .delete(secureRoute, games.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports      = router;
