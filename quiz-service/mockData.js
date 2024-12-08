const mongoose = require('mongoose');
const Quiz = require('./models/Quiz'); // Import your Quiz model

// Connect to MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/realtime-quiz';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mock Data
const mockQuizzes = [
    {
        quizId: 'quiz1',
        participants: [
            { username: 'Alice', score: 50 },
            { username: 'Bob', score: 40 },
            { username: 'Charlie', score: 30 }
        ],
        questions: [
            { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
            { question: 'What is the capital of France?', options: ['Rome', 'Paris', 'Berlin'], answer: 'Paris' },
            { question: 'What is the square root of 16?', options: ['2', '4', '8'], answer: '4' }
        ]
    },
    {
        quizId: 'quiz2',
        participants: [
            { username: 'Diana', score: 60 },
            { username: 'Ethan', score: 50 },
            { username: 'Fiona', score: 40 }
        ],
        questions: [
            { question: 'What is the largest planet?', options: ['Earth', 'Mars', 'Jupiter'], answer: 'Jupiter' },
            { question: 'What is the speed of light?', options: ['300 km/s', '300,000 km/s', '300,000 m/s'], answer: '300,000 km/s' },
            { question: 'Who wrote Hamlet?', options: ['Shakespeare', 'Dickens', 'Hemingway'], answer: 'Shakespeare' }
        ]
    }
];

// Function to Insert Mock Data
const insertMockData = async () => {
    try {
        await Quiz.deleteMany({}); // Clear existing data
        await Quiz.insertMany(mockQuizzes); // Insert mock data
        console.log('Mock data inserted successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error inserting mock data:', err);
    }
};

// Run the Function
insertMockData();
