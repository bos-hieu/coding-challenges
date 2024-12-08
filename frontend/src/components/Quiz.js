import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_URL);

const Quiz = ({ quizId, username, updateParticipants }) => {
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        // Emit joinRoom and joinQuiz events
        console.log('Joining room:', quizId);
        socket.emit('joinRoom', quizId);

        console.log('Joining quiz:', quizId);
        socket.emit('joinQuiz', { quizId, username });

        // Listen for quizUpdated events
        socket.on('quizUpdated', (data) => {
            updateParticipants(data); // Update the participants list
        });

        return () => {
            socket.off('quizUpdated');
        }
    }, [quizId, username]);

    const submitAnswer = () => {
        const scoreIncrement = answer === '1' ? 10 : 0;
        socket.emit('submitAnswer', { quizId, username, scoreIncrement });
        setAnswer('');
    };

    return (
        <div>
            <h1>Quiz ID: {quizId}, User: {username}</h1>
            <input
                type="text"
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />
            <button onClick={submitAnswer}>Submit Answer</button>
        </div>
    );
};

export default Quiz;
