import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  getDocs
} from 'firebase/firestore';

import { motion } from 'framer-motion';

import BottomNav from './BottomNav';

const SENTENCES_REF = collection(db, "sentences");

function BanglaTypingPractice() {
  const [targetText, setTargetText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [timeLimit, setTimeLimit] = useState(5); // default 5 minutes
  const totalSeconds = timeLimit * 60;

  // Fetch a random Bangla sentence from Firestore
  const fetchRandomSentence = async () => {
    try {
      const snapshot = await getDocs(SENTENCES_REF);
      const sentences = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.text) sentences.push(data.text);
      });
      if (sentences.length > 0) {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setTargetText(sentences[randomIndex]);
      } else {
        setTargetText('আমি বাংলায় গান গাই।'); // fallback
      }
    } catch (error) {
      console.error('Failed to fetch sentence:', error);
      setTargetText('আমি বাংলায় গান গাই।'); // fallback
    }
  };

  useEffect(() => {
    fetchRandomSentence();
  }, []);

  useEffect(() => {
    let timer;
    if (startTime && !isFinished) {
      timer = setInterval(() => {
        const secondsPassed = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime(secondsPassed);

        if (secondsPassed >= totalSeconds) {
          setIsFinished(true);
          clearInterval(timer);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isFinished, totalSeconds]);

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

  const resetTest = async () => {
    setUserInput('');
    setStartTime(null);
    setElapsedTime(0);
    setIsFinished(false);
    await fetchRandomSentence(); // new sentence
  };

  const timeLeft = Math.max(0, totalSeconds - elapsedTime);

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-2 bg-black text-gray-300 rounded shadow mt-5"
    >
      <h2 className="text-xl font-bold mb-3 text-center">Bangla Typing Practice (Bijoy 52)</h2>

      <div className="mb-3 text-center">
        <label className="mr-2">🕒 Set Time Limit:</label>
        <select
          value={timeLimit}
          onChange={(e) => setTimeLimit(Number(e.target.value))}
          disabled={startTime !== null}
          className="p-1 bg-gray-700 text-white rounded"
        >
          {Array.from({ length: 30 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} minute{(i + 1) > 1 && 's'}
            </option>
          ))}
        </select>
      </div>

      <div
        className="overflow-auto p-3 mb-3 border rounded bg-gray-800 text-white"
        style={{ height: '200px', whiteSpace: 'pre-wrap' }}
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
        style={{ height: "100px" }}
      />

      <div className="flex flex-wrap justify-between text-sm mb-3">
        <p>⏰ Time Left: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</p>
        <p>✅ Accuracy: {calculateAccuracy()}%</p>
        <p>🏃‍♂️ WPM: {calculateWPM()}</p>
      </div>

      <button
        onClick={resetTest}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {isFinished ? 'Restart' : 'Reset'}
      </button>

      <BottomNav />
    </motion.div>
  );
}

export default BanglaTypingPractice;
