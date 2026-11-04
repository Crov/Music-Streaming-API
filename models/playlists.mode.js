const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        description: String,
        owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        isPublic: { type: Boolean, default: true },
        songs: { type: [mongoose.Schema.Types.ObjectId], ref: 'Song'}
    },
    { timestamps: true}
)

module.exports = mongoose.model('Playlist', playlistSchema);