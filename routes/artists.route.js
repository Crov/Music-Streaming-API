const express = require('express');
const router = express.Router();
const c = require('../controllers/artists.controller');

router.get('/', c.getAllArtists);
router.get('/:id', c.getSingleArtist);
router.post('/', c.createArtist);
router.put('/:id', c.updateArtist);
router.delete('/:id', c.deleteArtist);
router.get('/:id/songs', c.getSongs);
router.get('/:id/followers', c.getFollowers);

module.exports = router;