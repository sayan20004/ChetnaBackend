const express = require('express');
const router = express.Router();
const { generateChatResponse } = require('../controllers/chatController');
const { protect, student } = require('../middleware/authMiddleware');

router.post('/', protect, student, generateChatResponse);

module.exports = router;