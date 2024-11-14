const express = require('express');
const router = express.Router();
const GameRoom = require('../models/GameRoom');
const Player = require('../models/Player');
const { v4: uuidv4 } = require('uuid');

// Create a new game room
router.post('/create', async (req, res) => {
    const code = uuidv4().slice(0, 6); // Generate a 6-character unique code
    const gameRoom = new GameRoom({ code });
    await gameRoom.save();
    res.json({ code });
});

// Join an existing game room
router.post('/:code/join', async (req, res) => {
    const { code } = req.params;
    const { name } = req.body;
    let gameRoom = await GameRoom.findOne({ code });

    if (gameRoom && !gameRoom.gameStarted) {
        const player = new Player({ name, gameRoom: gameRoom._id });
        await player.save();
        gameRoom.players.push(player._id);
        await gameRoom.save();
        res.json({ message: `${name} joined game with code ${code}`, playerId: player._id });
    } else {
        res.status(404).json({ message: "Game not found or already started." });
    }
});

module.exports = router;
