const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String }], // Array of multiple-choice options
    answer: { type: String, required: true } // Correct answer
});

const ParticipantSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    score: { type: Number, default: 0 }
});

const QuizSchema = new mongoose.Schema({
    quizId: { type: String, required: true, unique: true },
    participants: [ParticipantSchema], // List of participants with their scores
    questions: [QuestionSchema] // List of questions
});

module.exports = mongoose.model('Quiz', QuizSchema);

