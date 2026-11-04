const Playlist = require('../models/playlists.mode');
const User = require('../models/users.model');
const Song = require('../models/songs.model');

exports.getAllPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find().populate('songs');
        res.status(200).json(playlists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPlaylistById = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id).populate('songs');

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createPlaylist = async (req, res) => {
    try {
        const owner = await User.findById(req.body.owner);

        if (!owner) {
            return res.status(404).json({ error: 'User not found' });
        }

        const playlist = await Playlist.create(req.body);
        res.status(201).json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updatePlaylist = async (req, res) => {
    try {
        if (req.body.owner) {
            const owner = await User.findById(req.body.owner);

            if (!owner) {
                return res.status(404).json({ error: 'User not found' });
            }
        }

        const playlist = await Playlist.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletePlaylist = async (req, res) => {
    try {
        const playlist = await Playlist.findByIdAndDelete(req.params.id);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addSong = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        const song = await Song.findById(req.body.songId);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { songs: song._id } },
            { new: true }
        ).populate('songs');

        res.status(200).json(updatedPlaylist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.removeSong = async (req, res) => {
    try {
        const playlist = await Playlist.findById(req.params.id);
        const song = await Song.findById(req.params.songId);

        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const updatedPlaylist = await Playlist.findByIdAndUpdate(
            req.params.id,
            { $pull: { songs: req.params.songId } },
            { new: true }
        ).populate('songs');

        res.status(200).json(updatedPlaylist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
