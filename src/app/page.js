'use client';

import { useState, useEffect, useRef } from 'react';

const PI = '14159265358979323846264338327950288419716939937510';

export default function Home() {
  const [input, setInput] = useState('');
  const [correct, setCorrect] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval;
    if (startTime && correct) {
      interval = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [startTime, correct]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    const nextChar = val[val.length - 1];

    if (val.length === 1 && !startTime) {
      setStartTime(Date.now());
    }

    if (nextChar === PI[input.length]) {
      setInput(val);
      setCorrect(true);
      if (val.length > bestScore) {
        setBestScore(val.length);
        setBestTime(Date.now() - startTime);
      }
    } else {
      setCorrect(false);
      setTimeout(() => {
        setInput('');
        setElapsed(0);
        setStartTime(null);
        setCorrect(true);
        inputRef.current?.focus();
      }, 800);
    }
  };

  const formatTime = (ms) => {
    const sec = Math.floor(ms / 1000);
    const msPart = ms % 1000;
    return `${sec}:${msPart.toString().padStart(3, '0')}`;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 text-center font-mono">
      <div className="border-4 border-blue-600 p-8 rounded-xl shadow-md bg-white">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Memory Pi Game</h1>
        <div className="grid grid-cols-2 gap-12 mb-6 text-left">
          <div>
            <p className="font-bold">Best score: <span className="font-normal">{bestScore} digits</span></p>
            <p className="font-bold">Best time: <span className="font-normal">{bestTime ? formatTime(bestTime) : '—'}</span></p>
          </div>
          <div>
            <p className="font-bold">Score: <span className="font-normal">{input.length} digits</span></p>
            <p className="font-bold">Time: <span className="font-normal">{startTime ? formatTime(elapsed) : '0:000'}</span></p>
          </div>
        </div>
        <div className="text-2xl mb-4">
          <span className="text-black">3.</span>
          {[...input].map((d, i) => (
            <span key={i} className="text-green-600">{d}</span>
          ))}
          <span className="text-black"> _</span>
        </div>
        <input
          ref={inputRef}
          className="absolute opacity-0"
          value={input}
          onChange={handleChange}
          autoFocus
        />
        <div className="h-4 w-4 bg-red-500 mx-auto my-4" />
        <div className="flex gap-6 justify-center mt-6">
          <button
            onClick={() => {
              setInput('');
              setElapsed(0);
              setStartTime(null);
              setCorrect(true);
              inputRef.current?.focus();
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
          >
            Restart
          </button>
        </div>
      </div>
    </main>
  );
}
