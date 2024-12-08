import React, {useState, useCallback} from 'react';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App = () => {
    const [quizId, setQuizId] = useState('');
    const [username, setUsername] = useState('');
    const [joined, setJoined] = useState(false);
    const [participants, setParticipants] = useState([]);

    const handleJoin = () => {
        setJoined(true);
    };

    const updateParticipants = useCallback((updatedParticipants) => {
        setParticipants(updatedParticipants);
    });

    return (
        <div>
            {!joined ? (
                <div>
                    <h1>Join a Quiz</h1>
                    <input
                        type="text"
                        placeholder="Quiz ID"
                        value={quizId}
                        onChange={(e) => setQuizId(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleJoin}>Join Quiz</button>
                </div>
            ) : (
                <div style={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
                    <div style={{flex: 3}}>
                        <Quiz
                            quizId={quizId}
                            username={username}
                            updateParticipants={updateParticipants}
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <Leaderboard participants={participants}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
