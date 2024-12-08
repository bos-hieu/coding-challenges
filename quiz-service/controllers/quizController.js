const Quiz = require('../models/Quiz');

const joinQuiz = async (quizId, username) => {
    let quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
        quiz = new Quiz({ quizId, participants: [] });
    }

    // Ensure the username is not already in the participants list
    const isUserAlreadyParticipating = quiz.participants.some(
        (p) => p.username.toLowerCase() === username.toLowerCase()
    );

    if (!isUserAlreadyParticipating) {
        console.log('Adding participant:', username);
        quiz.participants.push({ username });
        await quiz.save();
    } else {
        console.log('Participant already exists:', username);
    }

    return quiz;
};

const updateScore = async (quizId, username, scoreIncrement) => {
    const quiz = await Quiz.findOneAndUpdate(
        { quizId, 'participants.username': username },
        { $inc: { 'participants.$.score': scoreIncrement } },
        { new: true }
    );

    return quiz;
};

module.exports = { joinQuiz, updateScore };
