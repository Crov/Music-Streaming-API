const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema(
    {
        title: { type: String, required: true },
        artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
        duration: { type: Number, required: true },
        playCount: { type: Number, default: 0 },
    },
    { timestamps: true}
)

module.exports = mongoose.model('Song', songSchema);