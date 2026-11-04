const express = require('express');
const router = express.Router();
const c = require('../controllers/users.controller');

router.get('/', c.getAllUsers);
router.get('/:id', c.getUserById);
router.post('/', c.createUser);
router.put('/:id', c.updateUser);
router.delete('/:id', c.deleteUser);
router.get('/:id/playlists', c.getUserPlaylists);
router.get('/:id/following', c.getUserFollowing);
router.post('/:id/following/:artistId', c.followArtist);
router.delete('/:id/following/:artistId', c.unfollowArtist);
router.get('/:id/likes', c.getUserLikes);
router.post('/:id/likes/:songId', c.likeSong);
router.delete('/:id/likes/:songId', c.unlikeSong);

module.exports = router;