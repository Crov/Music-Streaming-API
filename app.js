const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const Download = require('./models/downloads.model');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRouter = require('./routes/users.route');
const artistRouter = require('./routes/artists.route');
const songRouter = require('./routes/songs.route');
const playlistRouter = require('./routes/playlists.route');
const downloadRouter = require('./routes/downloads.route');

app.use('/users', userRouter);
app.use('/artists', artistRouter);
app.use('/songs', songRouter);
app.use('/playlists', playlistRouter);
app.use('/downloads', downloadRouter);

app.use((req, res) => {
    res.status(404).json({ error: 'Page not found' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/musicDB');
        console.log('Connected to MongoDB');

        await Download.sequelize.authenticate();
        await Download.sequelize.sync();
        console.log('Connected to SQLite');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exitCode = 1;
    }
}

main();