const Game = require('../models/game');

function indexRoute(req, res, next) {
  if(req.query.title) {
    req.query = { title: new RegExp(req.query.title, 'i')};
  }

  Game
    .find(req.query)
    .exec()
    .then((games) => res.render('games/index', { games }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('games/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Game
    .create(req.body)
    .then(() => res.redirect('/games'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest('/games/new', err.toString());
      }
      next(err);
    });
}

function showRoute(req, res, next) {
  Game
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then((game) => {
      if(!game) return res.notFound();
      return res.render('games/show', { game });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Game
    .findById(req.params.id)
    .exec()
    .then((game) => {
      if(!game) return res.notFound();
      return res.render('games/edit', { game });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Game
    .findById(req.params.id)
    .exec()
    .then((game) => {
      if(!game) return res.notFound();

      game = Object.assign(game, req.body);

      return game.save();
    })
    .then(() => res.redirect(`/games/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/games/${req.params.id}/edit`, err.toString());
      }
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Game
    .findById(req.params.id)
    .exec()
    .then((game) => {
      if(!game) return res.notFound();
      return game.remove();
    })
    .then(() => res.redirect('/games'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Game
    .findById(req.params.id)
    .exec()
    .then((game) => {
      if(!game) return res.notFound();

      game.comments.push(req.body);
      return game.save();
    })
    .then((game) => {
      res.redirect(`/games/${game.id}`);
    })
    .catch((err) => {
      if(err.name === 'ValidationError') {
        return res.badRequest(`/games/${req.params.id}`, err.toString());
      }
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Game
    .findById(req.params.id)
    .exec()
    .then((game) => {
      if(!game) return res.notFound();

      const comment = game.comments.id(req.params.commentId);
      comment.remove();

      return game.save();
    })
    .then((game) => {
      res.redirect(`/games/${game.id}`);
    })
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
