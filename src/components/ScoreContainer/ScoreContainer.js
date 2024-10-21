import React from 'react';
import { RESTART_QUIZ } from '../../utils/constant';
import ScoreTable from '../ScoreTable/ScoreTable';
import Button from '../Button/Button';

const ScoreContainer = ({ score, questionLength, scoreList, handleRestart }) => {
  // Displaying the score and Scoreboard
  return (
    <div className="score-container">
      <div className="score-text question-text" style={{ fontWeight: 'bold', fontSize: '24px' }}>
        You scored {score} out of {questionLength}
      </div>
      <ScoreTable scoreList={scoreList} />
      <Button className={'restart-button'} onClick={handleRestart} text={RESTART_QUIZ} />
    </div>
  );
};

export default ScoreContainer;
