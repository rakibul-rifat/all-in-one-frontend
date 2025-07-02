import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function BanglaTypingPractice() {
  const [targetText, setTargetText] = useState('আমি বাংলায় গান গাই, আমি বাংলার গান গাই।');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let timer;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(value);

    if (value === targetText) {
      setIsFinished(true);
    }
  };

  const calculateAccuracy = () => {
    let correctCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctCount++;
      }
    }
    return ((correctCount / targetText.length) * 100).toFixed(2);
  };

  const calculateWPM = () => {
    const words = userInput.trim().split(/\s+/).length;
    const minutes = elapsedTime / 60;
    return minutes > 0 ? Math.round(words / minutes) : 0;
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setElapsedTime(0);
    setIsFinished(false);
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 bg-gray-900 text-gray-300 rounded shadow mt-5"
    >
      <h2 className="text-xl font-bold mb-3 text-center">Bangla Typing Practice (Bijoy 52)</h2>

      <textarea
        value={targetText}
        onChange={(e) => setTargetText(e.target.value)}
        className="w-full p-2 mb-3 border rounded bg-gray-800 text-white"
        rows={3}
      />

      <div
        className="w-full p-3 mb-3 border rounded bg-gray-800 text-white"
        style={{ minHeight: '120px', whiteSpace: 'pre-wrap' }}
      >
        {targetText.split('').map((char, idx) => {
          let className = '';
          if (idx < userInput.length) {
            className = userInput[idx] === char ? 'text-green-500' : 'text-red-500';
          }
          return (
            <span key={idx} className={className}>
              {char}
            </span>
          );
        })}
      </div>

      <textarea
        value={userInput}
        onChange={handleInputChange}
        disabled={isFinished}
        className="w-full p-2 mb-3 border rounded bg-gray-800 text-white"
        rows={3}
        placeholder="Start typing here..."
      />

      <div className="flex flex-wrap justify-between text-sm mb-3">
        <p>⏰ Time: {elapsedTime}s</p>
        <p>✅ Accuracy: {calculateAccuracy()}%</p>
        <p>🏃‍♂️ WPM: {calculateWPM()}</p>
      </div>

      <button
        onClick={resetTest}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {isFinished ? 'Restart' : 'Reset'}
      </button>

      {/* Floating Go to Home button */}
      <Link
        to="/"
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Home
      </Link>
    </motion.div>
  );
}

export default BanglaTypingPractice;
