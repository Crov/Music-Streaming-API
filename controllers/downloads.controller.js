const mongoose = require('mongoose');
const User = require('../models/users.model');
const Song = require('../models/songs.model');
const Download = require('../models/downloads.model');

exports.createDownload = async (req, res) => {
    try {
        const userId = req.body.userId;
        const songId = req.body.songId;

        if (!userId || !songId) {
            return res.status(400).json({ error: 'userId and songId are required' });
        }

        const user = await User.findById(userId);
        const song = await Song.findById(songId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const [download, created] = await Download.findOrCreate({
            where: { userId: userId, songId: songId }
        });

        if (created) {
            return res.status(201).json(download);
        }

        res.status(200).json(download);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllDownloads = async (req, res) => {
    try {
        const downloads = await Download.findAll({
            order: [['downloaded_at', 'DESC']]
        });

        res.status(200).json(downloads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserDownloads = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const downloads = await Download.findAll({
            where: {
                userId: user._id.toString()
            },
            order: [['downloaded_at', 'DESC']]
        });

        res.status(200).json(downloads);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getDownloadById = async (req, res) => {
    try {
        const download = await Download.findByPk(req.params.id);

        if (!download) {
            return res.status(404).json({ error: 'Download not found' });
        }

        res.status(200).json(download);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteUserDownloads = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
        }

        await Download.destroy({ where: { userId: userId }});
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteDownload = async (req, res) => {
    try {
        const deleted = await Download.destroy({ where: { id: req.params.id } });

        if (!deleted) {
            return res.status(404).json({ error: 'Download not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};