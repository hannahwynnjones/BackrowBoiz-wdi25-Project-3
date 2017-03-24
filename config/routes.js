const router = require('express').Router();
const userController = require('../controllers/user');
const itemController = require('../controllers/item');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/users')
  .get(userController.index) //landing page
  .post(userController.create);

router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

router.route('/item')
  .get(itemController.index)
  .post(itemController.create);

router.route('/item/:id')
  .get(itemController.show)
  .put(itemController.update)
  .delete(itemController.delete);

router.route('/item/:id/comments')
  .post(itemController.createComment);

router.route('/item/:id/comments/:commentId')
  .delete(itemController.deleteComment);

// router.route('/register')
//   .post(auth.register);
//
// router.route('/login')
//   .post(auth.login);

// catch all 404 response
router.all('*', (req, res) => res.notFound());

module.exports = router;
