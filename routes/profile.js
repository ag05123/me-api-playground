// routes/profile.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');

router.post('/', ctrl.createProfile);
router.get('/', ctrl.getAllProfiles);
router.get('/:id', ctrl.getProfileById);
router.put('/:id', ctrl.updateProfile);
router.delete('/:id', ctrl.deleteProfile);

module.exports = router;