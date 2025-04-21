const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const registrationController = require('../controllers/registration.controller');

// Parent registration
router.post('/parent', upload.single('profilePicture'), registrationController.registerParent);

// Driver registration
router.post(
  '/driver',
  upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'cnicOrLicense', maxCount: 1 },
  ]),
  registrationController.registerDriver
);

module.exports = router;
