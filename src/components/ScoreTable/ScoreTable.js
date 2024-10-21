import React from 'react';

const ScoreTable = ({ scoreList }) => {
  return (
    <div className="scoreboard-container">
      <div className="scoreboard-heading">Top 3 High Scores</div>
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scoreList.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score === 0 ? '-' : score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreTable;
