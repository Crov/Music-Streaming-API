const mongoose = require('mongoose');
const Artist = require("../models/artists.model");
const Song = require("../models/songs.model")
const User = require("../models/users.model");

exports.getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.status(200).json(artists);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getSingleArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        
        if (!artist) {
            return res.status(404).json({ error: "Artist not found "});
        }

        res.status(200).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
}

exports.createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        res.status(200).json(artist);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).send();
    }
}

exports.getSongs = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const songs = await Song.find({ artist: artist._id });
        res.status(200).json(songs);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

exports.getFollowers = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const followers = await User.find({ followedArtists: artist._id }).select('username');
        res.status(200).json(followers);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}