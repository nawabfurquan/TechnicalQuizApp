import React from 'react';
import Timer from '../Timer/Timer';
import ScoreContainer from '../ScoreContainer/ScoreContainer';
import Button from '../Button/Button';
import { RESTART_QUIZ } from '../../utils/constant';

const QuizContainer = ({
  showScore,
  timeRemaining,
  score,
  handleRestart,
  questions,
  scoreList,
  currentQuestion,
  handleAnswerOptionClick
}) => {
  return (
    <>
      {/* Show timer during the questions */}
      {!showScore && <Timer timeRemaining={timeRemaining} />}
      <>
        {showScore ? (
          <ScoreContainer
            score={score}
            handleRestart={handleRestart}
            questionLength={questions.length}
            scoreList={scoreList}
          />
        ) : (
          // Displaying question and answers
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span> of {questions.length}
              </div>
              <div
                className="question-text"
                dangerouslySetInnerHTML={{ __html: questions[currentQuestion]?.question }}
              />
            </div>
            <div
              style={{
                color:
                  questions[currentQuestion]?.difficulty === 'hard'
                    ? 'tomato'
                    : questions[currentQuestion]?.difficulty === 'medium'
                      ? '#baba1b'
                      : 'green',
                border: `1px solid ${
                  questions[currentQuestion]?.difficulty === 'hard'
                    ? 'tomato'
                    : questions[currentQuestion]?.difficulty === 'medium'
                      ? '#baba1b'
                      : 'green'
                }`
              }}
              className="question-difficulty">
              Difficulty: {questions[currentQuestion]?.difficulty}
            </div>
            <div className="answer-section">
              {questions[currentQuestion]?.incorrect_answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(false)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
              <button
                onClick={() => handleAnswerOptionClick(true)}
                dangerouslySetInnerHTML={{
                  __html: questions[currentQuestion]?.correct_answer
                }}
              />
            </div>
            <Button className={'restart-button'} onClick={handleRestart} text={RESTART_QUIZ} />
          </>
        )}
      </>
    </>
  );
};

export default QuizContainer;
