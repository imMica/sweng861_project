const express = require('express');
const contoller_home = require('../controllers/home');

//set routers
router = express.Router();
router.get('/api/spotify/', contoller_home.spotify_search);

module.exports = router;