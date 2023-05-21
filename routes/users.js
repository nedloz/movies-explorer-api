const router = require('express').Router();

const {
  getMe,
  updateMe,
} = require('../controllers/users');

const {
  updateMeValidator,
} = require('../middlewares/validators');

router.get('/me', getMe);
router.patch('/me', updateMeValidator, updateMe);

module.exports = router;
