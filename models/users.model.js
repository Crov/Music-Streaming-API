const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, minlength: 3, maxlength: 24},
        email: { type: String, required: true, unique: true },
        likedSongs: { type: [mongoose.Schema.Types.ObjectId], ref: 'Song', default: [] },
        followedArtists: { type: [mongoose.Schema.Types.ObjectId], ref: 'Artist', default: [] },
    },
    { timestamps: true}
)

module.exports = mongoose.model('User', userSchema);