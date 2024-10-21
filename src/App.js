import MainPage from './components/MainPage/MainPage';
import Header from './components/Header/Header';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import localforage from 'localforage';
import { encryptData } from './utils/encryption';

const App = () => {
  // State variables
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const storage = useRef(
    localforage.createInstance({
      name: 'mySecureStorage',
      version: 1,
      driver: localforage.INDEXEDDB
    })
  );

  // Initialize storage
  useEffect(() => {
    const initializeStorage = async () => {
      await storage.current.setItem('scoreList', encryptData([0, 0, 0]));
    };
    initializeStorage();
  }, []);

  // Add event listener for visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (
        (document.hidden || document.webkitHidden || document.msHidden) &&
        quizStarted &&
        !showScore
      ) {
        setIsContentVisible(false);
      } else {
        setTimeout(() => {
          setIsContentVisible(true);
        }, 3000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [quizStarted, showScore]);

  return (
    <div className="app">
      <Header />
      <MainPage
        storage={storage}
        isContentVisible={isContentVisible}
        quizStarted={quizStarted}
        setQuizStarted={setQuizStarted}
        showScore={showScore}
        setShowScore={setShowScore}
      />
      {/* Show popup if user goes away from quiz */}
      {!isContentVisible && (
        <div className="popup">Please don't leave the application window during the quiz</div>
      )}
    </div>
  );
};

export default App;
