const express = require('express');
const router = express.Router();
const c = require('../controllers/downloads.controller');

router.post('/', c.createDownload);
router.get('/', c.getAllDownloads);
router.get('/user/:userId', c.getUserDownloads);
router.get('/:id', c.getDownloadById);
router.delete('/', c.deleteUserDownloads);
router.delete('/:id', c.deleteDownload);

module.exports = router;