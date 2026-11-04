const express = require('express');
const router = express.Router();
const c = require('../controllers/songs.controller');

router.get('/', c.getAllSongs);
router.get('/search', c.searchSongs);
router.get('/:id', c.getSongById);
router.post('/', c.createSong);
router.put('/:id', c.updateSong);
router.delete('/:id', c.deleteSong);
router.post('/:id/play', c.playSong);

module.exports = router;