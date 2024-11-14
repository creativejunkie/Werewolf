const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: String,
    role: String,
    gameRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'GameRoom' }
});

module.exports = mongoose.model('Player', playerSchema);
