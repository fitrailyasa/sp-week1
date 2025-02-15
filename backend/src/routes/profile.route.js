const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/', authenticate(), authorize(['user', 'admin']), profileController.getProfiles);

router
  .route('/:id')
  .get(authenticate(), authorize(['user', 'admin']), profileController.getProfile)
  .put(authenticate(), authorize(['user', 'admin']), profileController.updateProfile);

module.exports = router;
