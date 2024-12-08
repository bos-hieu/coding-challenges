require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');
const Quiz = require('./models/Quiz'); // Import Quiz model
const { joinQuiz, updateScore } = require('./controllers/quizController'); // Business logic for Quiz

// Initialize Express and HTTP server
const app = express();
const server = http.createServer(app);

// Load environment variables
const PORT = process.env.PORT || 3030;
const MONGODB_URI = process.env.MONGODB_URI;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:3000';

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors({
    origin: ALLOWED_ORIGIN, // Allow requests from frontend
    methods: ['GET', 'POST'],
    credentials: true // Allow cookies and headers
}));

// Set up routes for HTTP APIs
app.get('/api/quizzes', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
});

app.post('/api/quizzes', async (req, res) => {
    try {
        const { quizId, questions } = req.body;
        const newQuiz = new Quiz({ quizId, participants: [], questions });
        await newQuiz.save();
        res.status(201).json(newQuiz);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create quiz' });
    }
});

// Set up Socket.IO
const io = new Server(server, {
    cors: {
        origin: ALLOWED_ORIGIN, // Allow frontend's origin for WebSocket
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Socket.IO Events
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle joinQuiz event
    socket.on('joinQuiz', async ({ quizId, username }) => {
        try {
            console.log(`User ${username} joining quiz ${quizId}`);
            const quiz = await joinQuiz(quizId, username); // Business logic to add user to quiz
            console.log(`Emitting quizUpdated to room ${quizId} with participants:`, quiz.participants.length);
            io.to(quizId).emit('quizUpdated', quiz.participants); // Notify all clients in the room
        } catch (err) {
            console.error('Error in joinQuiz:', err);
        }
    });

    // Handle score updates
    socket.on('submitAnswer', async ({ quizId, username, scoreIncrement }) => {
        try {
            const quiz = await updateScore(quizId, username, scoreIncrement);
            io.to(quizId).emit('quizUpdated', quiz.participants);
        } catch (err) {
            console.error('Error updating score:', err);
        }
    });

    // Handle user joining a room for real-time updates
    socket.on('joinRoom', (quizId) => {
        socket.join(quizId);
        console.log(`User ${socket.id} joined room ${quizId}`);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
