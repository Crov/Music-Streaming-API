const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const Download = sequelize.define(
    'Download',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'user_id'
        },
        songId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'song_id'
        }
    },
    {
        tableName: 'downloads',
        timestamps: true,
        createdAt: 'downloaded_at',
        updatedAt: false,
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'song_id']
            }
        ]
    }
);

module.exports = Download;