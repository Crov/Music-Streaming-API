const mongoose = require('mongoose');
const User = require('../models/users.model');
const Song = require('../models/songs.model');
const Artist = require('../models/artists.model');
const Playlist = require('../models/playlists.mode');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('likedSongs');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).send();
    }
}

exports.getUserPlaylists = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const playlists = await Playlist.find({ owner: user._id }).populate('songs');
        res.status(200).json(playlists);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getUserLikes = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'likedSongs',
            populate: {
                path: 'artist',
                model: 'Artist',
                select: 'name'
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.likedSongs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getUserFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followedArtists');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user.followedArtists);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.followArtist = async (req, res) => {
    const userId = req.params.id;
    const artistId = req.params.artistId;

    try {
        const user = await User.findById(userId);
        const artist = await Artist.findById(artistId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { followedArtists: artistId } },
            { new: true, runValidators: true }
        ).populate('followedArtists');

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.unfollowArtist = async (req, res) => {
    const userId = req.params.id;
    const artistId = req.params.artistId;

    try {
        const user = await User.findById(userId);
        const artist = await Artist.findById(artistId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $pull: { followedArtists: artistId } },
            { new: true, runValidators: true }
        ).populate('followedArtists');

        res.status(200).json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.likeSong = async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;

    try {
        const user = await User.findById(userId);
        const song = await Song.findById(songId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { likedSongs: songId } },
            { new: true, runValidators: true }
        );

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.unlikeSong = async (req, res) => {
    const userId = req.params.id;
    const songId = req.params.songId;

    try {
        const user = await User.findById(userId);
        const song = await Song.findById(songId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const updated = await User.findByIdAndUpdate(
            userId,
            { $pull: { likedSongs: songId }},
            { new: true, runValidators: true }
        )

        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}