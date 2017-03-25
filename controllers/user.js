const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .then((users) => res.json(users))
    .catch(next);
}

// function createRoute(req, res, next) {
//   User
//     .create(req.body)
//     .then((user) => res.status(201).json(user))
//     .catch(next);
// }

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.image = req.file.filename;
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then((user) => res.json(user))
    .catch(next);
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
//  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
