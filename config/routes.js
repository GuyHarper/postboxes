const router = require('express').Router();
const postboxes = require('../controllers/postboxes');

router.route('/postboxes')
  .get(postboxes.index)
  .post(postboxes.create);

router.route('/postboxes/:id')
  .get(postboxes.show)
  .put(postboxes.update)
  .delete(postboxes.delete);

module.exports = router;
