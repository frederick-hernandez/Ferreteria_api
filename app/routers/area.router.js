const router = require('express').Router();

const area = require('../controllers/area.controller.js');

router.get('/areas/findall', area.findall);

module.exports = router;