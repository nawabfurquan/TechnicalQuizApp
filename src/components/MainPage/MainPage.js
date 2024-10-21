import { useEffect, useRef, useState } from 'react';
import './MainPage.css';
import axios from 'axios';
import { API_URL, HEADER_TEXT_1, HEADER_TEXT_2, START_QUIZ } from '../../utils/constant';
import Button from '../Button/Button';
import QuizContainer from '../QuizContainer/QuizContainer';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { decryptData, encryptData } from '../../utils/encryption';

function MainPage({
  storage,
  isContentVisible,
  quizStarted,
  setQuizStarted,
  showScore,
  setShowScore
}) {
  // State Variables
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const scoreList = useRef([]);
  const timer = useRef(null);

  const goToNextQuestion = async (newScore) => {
    if (quizStarted) {
      const nextQuestion = currentQuestion + 1;
      // If there is a next question
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setTimeRemaining(180);
        // If it's the last question
      } else {
        setTimeRemaining(null);
        clearTimeout(timer.current);
        let tempList = decryptData(await storage.current.getItem('scoreList'));
        // Updating the high scores
        for (let i = 0; i < tempList.length; i++) {
          if (newScore === tempList[i]) break;
          if (newScore > tempList[i]) {
            tempList = [
              ...tempList.slice(0, i),
              newScore,
              ...tempList.slice(i, tempList.length - i)
            ];
            tempList = tempList.slice(0, 3);
            break;
          }
        }
        const encryptedScoreList = encryptData(tempList);
        await storage.current.setItem('scoreList', encryptedScoreList);
        scoreList.current = decryptData(await storage.current.getItem('scoreList'));
        setShowScore(true);
      }
    }
  };

  // Called when the timer is up
  const onTimeExpired = () => {
    goToNextQuestion(score);
  };

  useEffect(() => {
    if (!quizStarted || !showScore) {
      if (timeRemaining === 0) {
        onTimeExpired();
      } else {
        // Setting timeout for timer
        timer.current = setTimeout(() => {
          setTimeRemaining((time) => time - 1);
        }, 1000);
      }
    }
    // Cleanup for the timer
    return () => clearTimeout(timer.current);
  }, [timeRemaining, quizStarted, isContentVisible]);

  // Fetching the data by calling API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(API_URL);
      // Checking for the response code, Response code of 0 is valid
      if (response?.data?.response_code === 0) {
        const encryptedQuestions = encryptData(response?.data?.results);
        await storage.current.setItem('questions', encryptedQuestions);
        const tempQuestions = decryptData(await storage.current.getItem('questions'));
        setQuestions(tempQuestions);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimeRemaining(180);
      } else {
        // Show error if the response code is invalid
        setError('Error fetching data. Please try again later.');
        clearTimeout(timer.current);
      }
    } catch (error) {
      // Error Handling
      console.error('Error fetching data: ', error);
      setError('Error fetching data. Please try again later.');
      clearTimeout(timer.current);
    } finally {
      // Removing the loading screen
      setLoading(false);
    }
  };

  useEffect(() => {
    let timeoutId;
    clearTimeout(timer.current);
    if (quizStarted) {
      setLoading(true);
      // Calling fetchQuestions method after 5 seconds as the API requires a gap of 5 seconds between the calls
      timeoutId = setTimeout(() => fetchQuestions(), 5000);
    }
    // Cleaning up the Timeout
    return () => {
      clearTimeout(timeoutId);
    };
  }, [quizStarted]);

  // Called when the user clicks on Start button
  const handleStart = () => {
    setQuizStarted(true);
  };

  // Called when the user clicks on Restart button
  const handleRestart = () => {
    setQuizStarted(false);
    setTimeRemaining(null);
    clearTimeout(timer.current);
  };

  // Called when the user clicks the answer option
  const handleAnswerOptionClick = (isCorrect) => {
    let newScore = score;
    // If the answer is correct we increment the score
    if (isCorrect) {
      newScore += 1;
      setScore(score + 1);
    }
    // Then call goToNextQuestion
    goToNextQuestion(newScore);
  };

  // If loading is true, we show the Loader
  if (loading) return <Loader />;
  // If there is an error, we show an Error Message
  else if (error) return <ErrorMessage error={error} />;
  // Else, we show the content
  else {
    return (
      <div className="container" data-testid="container">
        {!quizStarted ? (
          <>
            <div className="header" data-testid="header">
              <h3>{HEADER_TEXT_1}</h3>
              <p>{HEADER_TEXT_2}</p>
            </div>
            <Button className={'start-button'} onClick={handleStart} text={START_QUIZ} />
          </>
        ) : (
          <QuizContainer
            showScore={showScore}
            timeRemaining={timeRemaining}
            score={score}
            handleRestart={handleRestart}
            questions={questions}
            scoreList={scoreList.current}
            currentQuestion={currentQuestion}
            handleAnswerOptionClick={handleAnswerOptionClick}
          />
        )}
      </div>
    );
  }
}

export default MainPage;
