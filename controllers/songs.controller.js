const mongoose = require('mongoose');
const Song = require('../models/songs.model');
const Artist = require('../models/artists.model');
const User = require('../models/users.model');
const Playlist = require('../models/playlists.mode');

exports.getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate({
            path: 'artist',
            select: 'name'
        });
        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
}

exports.getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id).populate({
            path: 'artist',
            select: 'name'
        });
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.status(200).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.createSong = async (req, res) => {
    try {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) {
            return res.status(404).json({ error: "Artist not found" });
        }

        const song = await Song.create(req.body);
        res.status(201).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateSong = async (req, res) => {
    try {
        if (req.body.artist) {
            const artist = await Artist.findById(req.body.artist);

            if (!artist) {
                return res.status(404).json({ error: 'Artist not found' });
            }
        }

        const song = await Song.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(200).json(song);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).send();
    }
}

exports.playSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { $inc: { playCount: 1 }},
            { new: true }
        );

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.status(200).json(song);
    } catch(err) {
        res.status(400).json({ error: err.message });
    }
}

exports.searchSongs = async (req, res) => {
    try {
        const title = req.query.title;

        if (!title) {
            return res.status(400).json({ error: 'title query parameter is required' });
        }

        const songs = await Song.find({
            title: { $regex: title, $options: 'i' }
        }).populate({
            path: 'artist',
            select: 'name'
        });

        res.status(200).json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};