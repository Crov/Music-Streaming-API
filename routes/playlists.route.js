const express = require('express');
const router = express.Router();
const c = require('../controllers/playlists.controller');

router.get('/', c.getAllPlaylists);
router.get('/:id', c.getPlaylistById);
router.post('/', c.createPlaylist);
router.put('/:id', c.updatePlaylist);
router.delete('/:id', c.deletePlaylist);
router.post('/:id/songs', c.addSong);
router.delete('/:id/songs/:songId', c.removeSong);

module.exports = router;