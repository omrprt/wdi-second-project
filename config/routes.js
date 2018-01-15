const router = require('express').Router();
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const games = require('../controllers/games');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');


router.get('/', (req, res) => res.render('statics/index'));

router.route('/users')
  .get(users.index);

router.route('/users/:id/collectionlog')
  .post(users.addGameToCollection);

router.route('/users/:id/wishList')
  .post(users.addGameToWishList);

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
