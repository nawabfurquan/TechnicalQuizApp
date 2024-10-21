import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ScoreContainer from './ScoreContainer';

describe('ScoreContainer component', () => {
  test('renders ScoreTable', () => {
    const score = 3;
    const questionLength = 5;
    const scoreList = [10, 20, 0];
    const handleRestart = jest.fn();

    const { getByText } = render(
      <ScoreContainer
        score={score}
        questionLength={questionLength}
        scoreList={scoreList}
        handleRestart={handleRestart}
      />
    );

    const scoreText = getByText(`You scored ${score} out of ${questionLength}`);
    expect(scoreText).toBeInTheDocument();

    const scoreTableHeading = getByText('Top 3 High Scores');
    expect(scoreTableHeading).toBeInTheDocument();

    const restartButton = getByText('Restart Quiz');
    expect(restartButton).toBeInTheDocument();
  });

  test('calls handleRestart', () => {
    const score = 3;
    const questionLength = 5;
    const scoreList = [10, 20, 0];
    const handleRestart = jest.fn();

    const { getByText } = render(
      <ScoreContainer
        score={score}
        questionLength={questionLength}
        scoreList={scoreList}
        handleRestart={handleRestart}
      />
    );

    const restartButton = getByText('Restart Quiz');
    fireEvent.click(restartButton);

    expect(handleRestart).toHaveBeenCalledTimes(1);
  });
});
