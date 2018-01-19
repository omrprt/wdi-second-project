const User               = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        req.flash('dangerFlash', 'Unknown email/password combination');
        return res.redirect('back');
      }

      req.session.userId = user.id;
      req.user           = user;

      req.flash('successFlash', `Welcome back, ${user.username}!`);
      res.redirect('/');
    })
    .catch(next);
}

function sessionsDelete(req, res) {
  req.session.regenerate(() => res.redirect('/'));
}

module.exports           = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
