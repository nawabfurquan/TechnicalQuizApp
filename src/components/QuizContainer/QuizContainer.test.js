import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuizContainer from './QuizContainer';

describe('QuizContainer component', () => {
  const mockQuestions = [
    {
      question: 'What is 2 + 2?',
      difficulty: 'easy',
      incorrect_answers: ['3', '5', '4'],
      correct_answer: '4'
    }
  ];

  const handleAnswerOptionClick = jest.fn();
  const handleRestart = jest.fn();

  test('renders timer during questions', () => {
    const { getByText } = render(
      <QuizContainer
        showScore={false}
        timeRemaining={15}
        score={0}
        handleRestart={handleRestart}
        questions={mockQuestions}
        scoreList={[]}
        currentQuestion={0}
        handleAnswerOptionClick={handleAnswerOptionClick}
      />
    );

    const timerElement = getByText('Time Remaining:');
    expect(timerElement).toBeInTheDocument();
  });

  test('renders score container on showScore', () => {
    const { getByText } = render(
      <QuizContainer
        showScore={true}
        timeRemaining={0}
        score={3}
        handleRestart={handleRestart}
        questions={mockQuestions}
        scoreList={[10, 20, 0]}
        currentQuestion={0}
        handleAnswerOptionClick={handleAnswerOptionClick}
      />
    );

    const scoreText = getByText('You scored 3 out of 1');
    expect(scoreText).toBeInTheDocument();
  });
});
