const router = require('express').Router();
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const games = require('../controllers/games');
const users = require('../controllers/users');
const playLog = require('../controllers/playLog');
const secureRoute = require('../lib/secureRoute');

router.route('/')
  .get(users.homePage);

router.route('/users')
  .get(users.index);

router.route('/users/:id/collectionlog')
  .post(users.addGameToCollection);

router.route('/users/:id/wishList')
  .post(users.addGameToWishList);

router.route('/logs/:id')
  .get(playLog.new)
  .post(playLog.add);

router.route('/myprofile')
  .get(users.myProfile);

router.route('/games')
  .get(games.index)
  .post(games.create);

router.route('/games/:id')
  .get(games.show);

router.route('/games/:id/comments')
  .post(games.createComment);

router.route('/games/:id/comments/:commentId')
  .delete(games.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.all('*', (req, res) => res.notFound());

module.exports = router;
