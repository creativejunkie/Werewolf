const mongoose = require('mongoose');

const gameRoomSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
    gameStarted: { type: Boolean, default: false }
});

module.exports = mongoose.model('GameRoom', gameRoomSchema);
