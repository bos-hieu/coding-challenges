import React from 'react';

const Leaderboard = ({ participants }) => {
    const sortedParticipants = [...participants].sort((a, b) => b.score - a.score);

    return (
        <div>
            <h2>Leaderboard</h2>
            <ol>
                {sortedParticipants.map((p, index) => (
                    <li key={index}>{p.username}: {p.score}</li>
                ))}
            </ol>
        </div>
    );
};

export default Leaderboard;
