// routes/api.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/profileController');

router.get('/projects', ctrl.projectsBySkill);
router.get('/skills/top', ctrl.getTopSkills);
router.get('/search', ctrl.searchProfiles);

module.exports = router;