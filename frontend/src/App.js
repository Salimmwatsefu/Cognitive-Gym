import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const CognitiveGym = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userProgress, setUserProgress] = useState({
    totalGamesPlayed: 0,
    mazeCompletions: 0,
    wordTreeCompletions: 0,
    rhythmReachCompletions: 0,
    roomRebuildCompletions: 0,
    averageScore: 0,
    streak: 0
  });

  // Dashboard Component
  const Dashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">🧠</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Cognitive Gym</h1>
                <p className="text-green-600 text-sm">Brain Training for Life</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Games Played</p>
              <p className="text-2xl font-bold text-green-600">{userProgress.totalGamesPlayed}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                Keep Your Mind 
                <span className="text-emerald-600"> Sharp & Active</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Enhance your cognitive abilities with engaging brain training games designed specifically for active seniors.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{userProgress.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{userProgress.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1716896495108-14fb4c283e10" 
                alt="Seniors in nature"
                className="rounded-2xl shadow-2xl w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Selection */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Brain Training</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            
            {/* Maze Path Recall Game */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🗺️</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Spatial Memory</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Maze Path Recall</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Navigate through a maze, then retrace your path from memory. Improves spatial awareness and memory recall.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-blue-600">{userProgress.mazeCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(3)}{'☆'.repeat(2)}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('maze')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-200"
                >
                  Start Maze Challenge
                </button>
              </div>
            </div>

            {/* Word Tree Game */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-green-600 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🌳</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Language Skills</span>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Word Tree</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Catch falling words to complete synonym trees. Enhances vocabulary and semantic memory.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-emerald-600">{userProgress.wordTreeCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}{'☆'.repeat(1)}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('wordtree')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-200"
                >
                  Start Word Challenge
                </button>
              </div>
            </div>

            {/* Rhythm Reach Game - NEW */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">VR-Style</span>
                </div>
                {/* Floating orbs animation */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 right-12 w-3 h-3 bg-white/40 rounded-full animate-ping"></div>
                <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Rhythm Reach</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Tap glowing orbs in 3D space while solving math. Tests cognitive-motor integration and attention switching.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-purple-600">{userProgress.rhythmReachCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('rhythm')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-200"
                >
                  Start VR Experience
                </button>
              </div>
            </div>

            {/* Room Rebuild Game - NEW */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🏠</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">3D Memory</span>
                </div>
                {/* 3D room elements */}
                <div className="absolute bottom-8 left-8 w-6 h-4 bg-white/20 rounded transform rotate-12"></div>
                <div className="absolute bottom-6 right-8 w-4 h-6 bg-white/30 rounded transform -rotate-6"></div>
                <div className="absolute top-12 left-1/2 w-3 h-3 bg-white/40 rounded-full"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Room Rebuild</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  View a 3D room, memorize furniture positions, then rebuild it. Enhances spatial memory and visual recognition.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-orange-600">{userProgress.roomRebuildCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(4)}{'☆'.repeat(1)}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('room')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-colors duration-200"
                >
                  Enter 3D Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Your Progress Journey</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-800">{userProgress.totalGamesPlayed}</div>
              <div className="text-gray-600">Games Played</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🧭</div>
              <div className="text-2xl font-bold text-blue-600">{userProgress.mazeCompletions}</div>
              <div className="text-gray-600">Mazes Solved</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🌲</div>
              <div className="text-2xl font-bold text-emerald-600">{userProgress.wordTreeCompletions}</div>
              <div className="text-gray-600">Trees Completed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🎵</div>
              <div className="text-2xl font-bold text-purple-600">{userProgress.rhythmReachCompletions}</div>
              <div className="text-gray-600">Rhythms Mastered</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-2xl font-bold text-orange-600">{userProgress.roomRebuildCompletions}</div>
              <div className="text-gray-600">Rooms Rebuilt</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-green-600">{userProgress.averageScore}%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Maze Path Recall Game Component (unchanged)
  const MazeGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [maze, setMaze] = useState([]);
    const [playerPath, setPlayerPath] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [recallPath, setRecallPath] = useState([]);
    const [score, setScore] = useState(0);
    const [mazeSize] = useState(5);

    const generateMaze = useCallback(() => {
      const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(0));
      const path = [
        {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, 
        {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}
      ];
      
      path.forEach(({x, y}) => {
        newMaze[y][x] = 1;
      });
      
      newMaze[0][0] = 2;
      newMaze[4][4] = 3;
      setMaze(newMaze);
      setCurrentPosition({x: 0, y: 0});
      setPlayerPath([{x: 0, y: 0}]);
    }, [mazeSize]);

    const movePlayer = (direction) => {
      if (gamePhase !== 'navigate') return;
      
      const directions = {
        up: {x: 0, y: -1},
        down: {x: 0, y: 1},
        left: {x: -1, y: 0},
        right: {x: 1, y: 0}
      };
      
      const move = directions[direction];
      const newX = currentPosition.x + move.x;
      const newY = currentPosition.y + move.y;
      
      if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze[newY][newX] !== 0) {
        const newPosition = {x: newX, y: newY};
        setCurrentPosition(newPosition);
        setPlayerPath([...playerPath, newPosition]);
        
        if (newX === 4 && newY === 4) {
          setTimeout(() => setGamePhase('recall'), 1000);
        }
      }
    };

    const selectRecallCell = (x, y) => {
      if (gamePhase !== 'recall') return;
      
      const newRecallPath = [...recallPath, {x, y}];
      setRecallPath(newRecallPath);
      
      if (newRecallPath.length === playerPath.length) {
        let correctMoves = 0;
        newRecallPath.forEach((move, index) => {
          if (playerPath[index] && move.x === playerPath[index].x && move.y === playerPath[index].y) {
            correctMoves++;
          }
        });
        
        const finalScore = Math.round((correctMoves / playerPath.length) * 100);
        setScore(finalScore);
        setGamePhase('complete');
        
        setUserProgress(prev => ({
          ...prev,
          totalGamesPlayed: prev.totalGamesPlayed + 1,
          mazeCompletions: prev.mazeCompletions + 1,
          averageScore: Math.round((prev.averageScore + finalScore) / 2),
          streak: finalScore > 70 ? prev.streak + 1 : 0
        }));
      }
    };

    const resetGame = () => {
      setGamePhase('instruction');
      setPlayerPath([]);
      setRecallPath([]);
      setScore(0);
    };

    useEffect(() => {
      if (gamePhase === 'navigate') {
        generateMaze();
      }
    }, [gamePhase, generateMaze]);

    const renderMazeCell = (cellValue, x, y) => {
      let cellClass = "w-12 h-12 border border-gray-300 flex items-center justify-center text-lg font-bold ";
      
      if (gamePhase === 'navigate') {
        if (cellValue === 0) cellClass += "bg-gray-800";
        else if (cellValue === 2) cellClass += "bg-green-400";
        else if (cellValue === 3) cellClass += "bg-red-400";
        else cellClass += "bg-white";
        
        if (currentPosition.x === x && currentPosition.y === y) {
          cellClass += " bg-blue-500 text-white";
          return <div key={`${x}-${y}`} className={cellClass}>😊</div>;
        }
      } else if (gamePhase === 'recall') {
        cellClass += "bg-gray-100 hover:bg-blue-200 cursor-pointer ";
        if (recallPath.some(p => p.x === x && p.y === y)) {
          cellClass += "bg-blue-400 text-white";
        }
      }
      
      return (
        <div 
          key={`${x}-${y}`} 
          className={cellClass}
          onClick={() => selectRecallCell(x, y)}
        >
          {gamePhase === 'navigate' && cellValue === 2 && '🏁'}
          {gamePhase === 'navigate' && cellValue === 3 && '🎯'}
          {gamePhase === 'recall' && recallPath.findIndex(p => p.x === x && p.y === y) + 1 || ''}
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-blue-600 hover:text-blue-800 text-lg font-medium"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Maze Path Recall</h2>
            </div>
            {gamePhase === 'navigate' && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Steps taken</p>
                <p className="text-2xl font-bold text-blue-600">{playerPath.length}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {gamePhase === 'instruction' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Play</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  <p className="mb-4">1. <strong>Navigate:</strong> Use arrow buttons to move from start (🏁) to finish (🎯)</p>
                  <p className="mb-4">2. <strong>Remember:</strong> Try to remember the path you took</p>
                  <p className="mb-4">3. <strong>Recall:</strong> Click the cells in the order you moved through them</p>
                </div>
                <button 
                  onClick={() => setGamePhase('navigate')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
                >
                  Start Challenge
                </button>
              </div>
            )}

            {gamePhase === 'navigate' && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Navigate to the target! 🎯</h3>
                <div className="grid grid-cols-5 gap-1 justify-center mb-8 mx-auto w-fit">
                  {maze.map((row, y) => 
                    row.map((cell, x) => renderMazeCell(cell, x, y))
                  )}
                </div>
                <div className="flex justify-center space-x-4">
                  <button onClick={() => movePlayer('up')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">↑</button>
                  <div className="flex flex-col space-y-2">
                    <button onClick={() => movePlayer('left')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">←</button>
                    <button onClick={() => movePlayer('right')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">→</button>
                  </div>
                  <button onClick={() => movePlayer('down')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">↓</button>
                </div>
              </div>
            )}

            {gamePhase === 'recall' && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Now retrace your path! Click the cells in order.</h3>
                <div className="grid grid-cols-5 gap-1 justify-center mb-6 mx-auto w-fit">
                  {Array(mazeSize).fill().map((_, y) => 
                    Array(mazeSize).fill().map((_, x) => renderMazeCell(1, x, y))
                  )}
                </div>
                <p className="text-gray-600">Progress: {recallPath.length} / {playerPath.length}</p>
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center">
                <div className="text-6xl mb-6">{score >= 80 ? '🏆' : score >= 60 ? '👏' : '💪'}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Challenge Complete!</h3>
                <div className="text-4xl font-bold text-blue-600 mb-4">{score}%</div>
                <p className="text-lg text-gray-600 mb-8">
                  {score >= 80 ? 'Excellent memory!' : score >= 60 ? 'Great job!' : 'Keep practicing!'}
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Word Tree Game Component (unchanged from previous)
  const WordTreeGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [fallingWords, setFallingWords] = useState([]);
    const [treeProgress, setTreeProgress] = useState({});
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameActive, setGameActive] = useState(false);

    const wordSets = {
      happy: ['joyful', 'cheerful', 'elated', 'pleased', 'content'],
      big: ['large', 'huge', 'enormous', 'massive', 'giant'],
      fast: ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
      smart: ['clever', 'wise', 'bright', 'intelligent', 'brilliant']
    };

    const currentRootWord = Object.keys(wordSets)[Math.floor(Math.random() * Object.keys(wordSets).length)];

    const startGame = () => {
      setGamePhase('playing');
      setGameActive(true);
      setTimeLeft(60);
      setScore(0);
      setTreeProgress({});
      generateFallingWords();
    };

    const generateFallingWords = () => {
      const words = [...wordSets[currentRootWord]];
      const allWords = Object.values(wordSets).flat();
      const incorrectWords = allWords.filter(w => !words.includes(w)).slice(0, 3);
      
      const allGameWords = [...words, ...incorrectWords].sort(() => Math.random() - 0.5);
      
      setFallingWords(allGameWords.map((word, index) => ({
        id: index,
        text: word,
        x: Math.random() * 70 + 10,
        y: -50,
        speed: Math.random() * 2 + 1,
        correct: words.includes(word)
      })));
    };

    const catchWord = (wordId) => {
      const word = fallingWords.find(w => w.id === wordId);
      if (!word) return;

      if (word.correct) {
        setScore(prev => prev + 10);
        setTreeProgress(prev => ({
          ...prev,
          [word.text]: true
        }));
        
        const correctWords = wordSets[currentRootWord];
        const completedWords = Object.keys({...treeProgress, [word.text]: true}).length;
        
        if (completedWords === correctWords.length) {
          setGamePhase('complete');
          setGameActive(false);
          
          setUserProgress(prev => ({
            ...prev,
            totalGamesPlayed: prev.totalGamesPlayed + 1,
            wordTreeCompletions: prev.wordTreeCompletions + 1,
            averageScore: Math.round((prev.averageScore + score + 10) / 2),
            streak: prev.streak + 1
          }));
        }
      } else {
        setScore(prev => Math.max(0, prev - 5));
      }

      setFallingWords(prev => prev.filter(w => w.id !== wordId));
    };

    useEffect(() => {
      let timer;
      if (gameActive && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setGamePhase('complete');
        setGameActive(false);
      }
      return () => clearTimeout(timer);
    }, [gameActive, timeLeft]);

    useEffect(() => {
      if (!gameActive) return;
      
      const animateWords = () => {
        setFallingWords(prev => 
          prev.map(word => ({
            ...word,
            y: word.y + word.speed
          })).filter(word => word.y < 100)
        );
      };

      const interval = setInterval(animateWords, 50);
      return () => clearInterval(interval);
    }, [gameActive]);

    const resetGame = () => {
      setGamePhase('instruction');
      setFallingWords([]);
      setTreeProgress({});
      setScore(0);
      setTimeLeft(60);
      setGameActive(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-emerald-600 hover:text-emerald-800 text-lg font-medium"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Word Tree</h2>
            </div>
            {gamePhase === 'playing' && (
              <div className="flex space-x-6 text-right">
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-emerald-600">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-2xl font-bold text-red-600">{timeLeft}s</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {gamePhase === 'instruction' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🌳</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">How to Play</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  <p className="mb-4">1. <strong>Watch:</strong> Words will fall from the top of the screen</p>
                  <p className="mb-4">2. <strong>Catch:</strong> Click on words that are synonyms of the root word</p>
                  <p className="mb-4">3. <strong>Grow:</strong> Complete the word tree by finding all synonyms</p>
                  <p className="text-emerald-600 font-semibold">Root word: "{currentRootWord.toUpperCase()}"</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
                >
                  Start Growing
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Growing tree for: <span className="text-emerald-600 font-bold">"{currentRootWord}"</span>
                  </h3>
                  <div className="flex justify-center space-x-2 mb-4">
                    {wordSets[currentRootWord].map(word => (
                      <div 
                        key={word}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          treeProgress[word] 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {treeProgress[word] ? word : '???'}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative h-96 bg-gradient-to-b from-sky-100 to-green-100 rounded-xl overflow-hidden border-4 border-emerald-200">
                  {fallingWords.map(word => (
                    <div
                      key={word.id}
                      className={`absolute px-4 py-2 rounded-full cursor-pointer font-medium text-white transition-all duration-200 hover:scale-110 ${
                        word.correct 
                          ? 'bg-emerald-500 hover:bg-emerald-600' 
                          : 'bg-red-500 hover:bg-red-600'
                      }`}
                      style={{
                        left: `${word.x}%`,
                        top: `${word.y}%`,
                        transform: 'translateX(-50%)'
                      }}
                      onClick={() => catchWord(word.id)}
                    >
                      {word.text}
                    </div>
                  ))}
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-4xl">
                    🌳
                  </div>
                </div>
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center">
                <div className="text-6xl mb-6">
                  {Object.keys(treeProgress).length === wordSets[currentRootWord].length ? '🏆' : '🌱'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {Object.keys(treeProgress).length === wordSets[currentRootWord].length 
                    ? 'Tree Complete!' 
                    : 'Time\'s Up!'}
                </h3>
                <div className="text-4xl font-bold text-emerald-600 mb-4">{score} points</div>
                <p className="text-lg text-gray-600 mb-8">
                  You found {Object.keys(treeProgress).length} out of {wordSets[currentRootWord].length} synonyms
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // NEW: Rhythm Reach Game Component - VR-Style
  const RhythmReachGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [orbs, setOrbs] = useState([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [mathChallenge, setMathChallenge] = useState(null);
    const [mathAnswer, setMathAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(45);
    const [gameActive, setGameActive] = useState(false);
    const [orbsHit, setOrbsHit] = useState(0);

    const generateOrb = () => {
      return {
        id: Math.random(),
        x: Math.random() * 80 + 10, // 10-90% from left
        y: Math.random() * 80 + 10, // 10-90% from top
        z: Math.random() * 200 + 50, // Z-depth for 3D effect
        color: ['purple', 'pink', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 5)],
        size: Math.random() * 30 + 20, // 20-50px
        pulseSpeed: Math.random() * 2 + 1,
        createdAt: Date.now()
      };
    };

    const generateMathChallenge = () => {
      const operations = ['+', '-', '×'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2, answer;
      
      switch (operation) {
        case '+':
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 20) + 1;
          answer = num1 + num2;
          break;
        case '-':
          num1 = Math.floor(Math.random() * 30) + 10;
          num2 = Math.floor(Math.random() * num1) + 1;
          answer = num1 - num2;
          break;
        case '×':
          num1 = Math.floor(Math.random() * 12) + 1;
          num2 = Math.floor(Math.random() * 12) + 1;
          answer = num1 * num2;
          break;
        default:
          num1 = 2; num2 = 2; answer = 4;
      }
      
      return {
        question: `${num1} ${operation} ${num2} = ?`,
        answer: answer.toString()
      };
    };

    const startGame = () => {
      setGamePhase('playing');
      setGameActive(true);
      setScore(0);
      setCombo(0);
      setOrbsHit(0);
      setTimeLeft(45);
      setOrbs([]);
      setMathChallenge(null);
    };

    const hitOrb = (orbId) => {
      const orb = orbs.find(o => o.id === orbId);
      if (!orb) return;

      setScore(prev => prev + (10 * (combo + 1)));
      setCombo(prev => prev + 1);
      setOrbsHit(prev => prev + 1);
      setOrbs(prev => prev.filter(o => o.id !== orbId));

      // Generate math challenge every 5 orbs
      if ((orbsHit + 1) % 5 === 0) {
        setMathChallenge(generateMathChallenge());
      }
    };

    const submitMathAnswer = () => {
      if (mathChallenge && mathAnswer === mathChallenge.answer) {
        setScore(prev => prev + 50);
        setCombo(prev => prev + 2);
      } else {
        setCombo(0); // Reset combo on wrong answer
      }
      setMathChallenge(null);
      setMathAnswer('');
    };

    // Game timer
    useEffect(() => {
      let timer;
      if (gameActive && timeLeft > 0) {
        timer = setTimeout(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0) {
        setGamePhase('complete');
        setGameActive(false);
        
        // Update progress
        setUserProgress(prev => ({
          ...prev,
          totalGamesPlayed: prev.totalGamesPlayed + 1,
          rhythmReachCompletions: prev.rhythmReachCompletions + 1,
          averageScore: Math.round((prev.averageScore + score) / 2),
          streak: score > 200 ? prev.streak + 1 : 0
        }));
      }
      return () => clearTimeout(timer);
    }, [gameActive, timeLeft, score]);

    // Generate orbs periodically
    useEffect(() => {
      if (!gameActive) return;
      
      const generateOrbs = () => {
        setOrbs(prev => {
          // Remove old orbs (after 4 seconds)
          const filtered = prev.filter(orb => Date.now() - orb.createdAt < 4000);
          
          // Add new orb if we have less than 3
          if (filtered.length < 3) {
            return [...filtered, generateOrb()];
          }
          return filtered;
        });
      };

      const interval = setInterval(generateOrbs, 800);
      return () => clearInterval(interval);
    }, [gameActive]);

    const resetGame = () => {
      setGamePhase('instruction');
      setOrbs([]);
      setScore(0);
      setCombo(0);
      setOrbsHit(0);
      setMathChallenge(null);
      setMathAnswer('');
      setTimeLeft(45);
      setGameActive(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-purple-300 hover:text-purple-100 text-lg font-medium"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-white">Rhythm Reach</h2>
              <div className="text-purple-300 text-sm bg-purple-800/30 px-3 py-1 rounded-full">
                VR-Style Experience
              </div>
            </div>
            {gamePhase === 'playing' && (
              <div className="flex space-x-6 text-right text-white">
                <div>
                  <p className="text-sm text-purple-300">Score</p>
                  <p className="text-2xl font-bold text-purple-300">{score}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-300">Combo</p>
                  <p className="text-2xl font-bold text-pink-400">x{combo}</p>
                </div>
                <div>
                  <p className="text-sm text-purple-300">Time</p>
                  <p className="text-2xl font-bold text-yellow-400">{timeLeft}s</p>
                </div>
              </div>
            )}
          </div>

          {/* Game Content */}
          <div className="bg-black/20 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30">
            {gamePhase === 'instruction' && (
              <div className="text-center p-12 text-white">
                <div className="text-6xl mb-6">🎵</div>
                <h3 className="text-2xl font-bold mb-4">VR-Style Rhythm Challenge</h3>
                <div className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-purple-200">
                  <p className="mb-4">1. <strong className="text-white">Tap Orbs:</strong> Click glowing orbs floating in 3D space</p>
                  <p className="mb-4">2. <strong className="text-white">Build Combos:</strong> Hit consecutive orbs to multiply your score</p>
                  <p className="mb-4">3. <strong className="text-white">Solve Math:</strong> Answer arithmetic questions that appear mid-game</p>
                  <p className="text-pink-300 font-semibold">Tests: Cognitive-motor integration & attention switching</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Enter VR Experience
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div className="relative">
                {/* 3D Game Space */}
                <div 
                  className="relative h-96 bg-gradient-to-b from-purple-900/50 via-blue-900/50 to-indigo-900/50 overflow-hidden"
                  style={{ perspective: '1000px' }}
                >
                  {/* Background stars */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Floating Orbs */}
                  {orbs.map(orb => (
                    <div
                      key={orb.id}
                      className={`absolute cursor-pointer transition-all duration-200 hover:scale-110 animate-pulse`}
                      style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        transform: `translateZ(${orb.z}px) translateX(-50%) translateY(-50%)`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        animationDuration: `${orb.pulseSpeed}s`
                      }}
                      onClick={() => hitOrb(orb.id)}
                    >
                      <div 
                        className={`w-full h-full rounded-full shadow-lg bg-gradient-to-br ${
                          orb.color === 'purple' ? 'from-purple-400 to-purple-600' :
                          orb.color === 'pink' ? 'from-pink-400 to-pink-600' :
                          orb.color === 'blue' ? 'from-blue-400 to-blue-600' :
                          orb.color === 'green' ? 'from-green-400 to-green-600' :
                          'from-yellow-400 to-yellow-600'
                        } border-2 border-white/50`}
                        style={{
                          boxShadow: `0 0 20px ${orb.color === 'purple' ? '#a855f7' : 
                                                orb.color === 'pink' ? '#ec4899' :
                                                orb.color === 'blue' ? '#3b82f6' :
                                                orb.color === 'green' ? '#10b981' : '#eab308'}`
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent" />
                      </div>
                    </div>
                  ))}

                  {/* Progress indicators */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-75">Orbs Hit: {orbsHit}</div>
                    {combo > 0 && (
                      <div className="text-lg font-bold text-pink-400">
                        COMBO x{combo}!
                      </div>
                    )}
                  </div>
                </div>

                {/* Math Challenge Overlay */}
                {mathChallenge && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Quick Math!</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-6">
                        {mathChallenge.question}
                      </div>
                      <input
                        type="number"
                        value={mathAnswer}
                        onChange={(e) => setMathAnswer(e.target.value)}
                        className="w-full text-2xl text-center border-2 border-purple-300 rounded-lg py-3 mb-4 focus:border-purple-500 focus:outline-none"
                        placeholder="?"
                        autoFocus
                      />
                      <button
                        onClick={submitMathAnswer}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                      >
                        Submit Answer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center p-12 text-white">
                <div className="text-6xl mb-6">
                  {score >= 400 ? '🏆' : score >= 200 ? '⭐' : '💪'}
                </div>
                <h3 className="text-2xl font-bold mb-4">VR Session Complete!</h3>
                <div className="text-4xl font-bold text-purple-400 mb-4">{score} points</div>
                <div className="text-lg text-purple-200 mb-8">
                  <p>Orbs Hit: {orbsHit}</p>
                  <p>Max Combo: {combo}</p>
                  <p className="mt-2">
                    {score >= 400 ? 'Outstanding cognitive-motor performance!' : 
                     score >= 200 ? 'Great attention switching!' : 
                     'Keep practicing your coordination!'}
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // NEW: Room Rebuild Game Component - 3D Memory
  const RoomRebuildGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [originalRoom, setOriginalRoom] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [viewTime, setViewTime] = useState(15);

    const roomObjects = [
      { id: 'chair', name: 'Chair', emoji: '🪑', color: 'brown' },
      { id: 'table', name: 'Table', emoji: '🗿', color: 'wood' },
      { id: 'lamp', name: 'Lamp', emoji: '💡', color: 'yellow' },
      { id: 'plant', name: 'Plant', emoji: '🪴', color: 'green' },
      { id: 'book', name: 'Books', emoji: '📚', color: 'blue' },
      { id: 'clock', name: 'Clock', emoji: '🕐', color: 'black' }
    ];

    const generateRoom = () => {
      const shuffled = roomObjects.sort(() => Math.random() - 0.5);
      const selectedObjects = shuffled.slice(0, 4); // Use 4 objects
      
      const positions = [
        { x: 20, y: 60, z: 0 }, // Front left
        { x: 70, y: 60, z: 0 }, // Front right
        { x: 30, y: 30, z: -50 }, // Back left
        { x: 60, y: 30, z: -50 }  // Back right
      ];

      return selectedObjects.map((obj, index) => ({
        ...obj,
        position: positions[index],
        correctPosition: positions[index]
      }));
    };

    const scrambleRoom = (room) => {
      const positions = room.map(obj => obj.position);
      const shuffledPositions = [...positions].sort(() => Math.random() - 0.5);
      
      return room.map((obj, index) => ({
        ...obj,
        position: shuffledPositions[index]
      }));
    };

    const startGame = () => {
      const newRoom = generateRoom();
      setOriginalRoom(newRoom);
      setCurrentRoom(newRoom);
      setGamePhase('memorize');
      setViewTime(15);
      setScore(0);
      setMistakes(0);
    };

    const startRebuild = () => {
      const scrambled = scrambleRoom(originalRoom);
      setCurrentRoom(scrambled);
      setGamePhase('rebuild');
    };

    const selectObject = (objectId) => {
      if (gamePhase !== 'rebuild') return;
      setSelectedObject(objectId);
    };

    const placeObject = (newPosition) => {
      if (!selectedObject || gamePhase !== 'rebuild') return;

      setCurrentRoom(prev => 
        prev.map(obj => 
          obj.id === selectedObject 
            ? { ...obj, position: newPosition }
            : obj
        )
      );
      setSelectedObject(null);
    };

    const checkCompletion = () => {
      let correctPlacements = 0;
      let totalObjects = originalRoom.length;

      originalRoom.forEach(originalObj => {
        const currentObj = currentRoom.find(obj => obj.id === originalObj.id);
        if (currentObj && 
            Math.abs(currentObj.position.x - originalObj.correctPosition.x) < 10 &&
            Math.abs(currentObj.position.y - originalObj.correctPosition.y) < 10) {
          correctPlacements++;
        }
      });

      if (correctPlacements === totalObjects) {
        const finalScore = Math.max(0, 100 - (mistakes * 10));
        setScore(finalScore);
        setGamePhase('complete');
        
        // Update progress
        setUserProgress(prev => ({
          ...prev,
          totalGamesPlayed: prev.totalGamesPlayed + 1,
          roomRebuildCompletions: prev.roomRebuildCompletions + 1,
          averageScore: Math.round((prev.averageScore + finalScore) / 2),
          streak: finalScore > 70 ? prev.streak + 1 : 0
        }));
      }
    };

    // Memorization timer
    useEffect(() => {
      let timer;
      if (gamePhase === 'memorize' && viewTime > 0) {
        timer = setTimeout(() => {
          setViewTime(prev => prev - 1);
        }, 1000);
      } else if (viewTime === 0) {
        startRebuild();
      }
      return () => clearTimeout(timer);
    }, [gamePhase, viewTime]);

    // Check completion whenever room changes
    useEffect(() => {
      if (gamePhase === 'rebuild' && currentRoom.length > 0) {
        checkCompletion();
      }
    }, [currentRoom, gamePhase]);

    const resetGame = () => {
      setGamePhase('instruction');
      setOriginalRoom([]);
      setCurrentRoom([]);
      setSelectedObject(null);
      setScore(0);
      setMistakes(0);
      setViewTime(15);
    };

    const RoomPositions = [
      { x: 20, y: 60, z: 0, name: 'Front Left' },
      { x: 70, y: 60, z: 0, name: 'Front Right' },
      { x: 30, y: 30, z: -50, name: 'Back Left' },
      { x: 60, y: 30, z: -50, name: 'Back Right' }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-orange-600 hover:text-orange-800 text-lg font-medium"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Room Rebuild</h2>
              <div className="text-orange-600 text-sm bg-orange-100 px-3 py-1 rounded-full">
                3D Memory Challenge
              </div>
            </div>
            {gamePhase === 'memorize' && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Memorize Time</p>
                <p className="text-3xl font-bold text-orange-600">{viewTime}s</p>
              </div>
            )}
            {gamePhase === 'rebuild' && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Mistakes</p>
                <p className="text-2xl font-bold text-red-600">{mistakes}</p>
              </div>
            )}
          </div>

          {/* Game Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {gamePhase === 'instruction' && (
              <div className="text-center p-12">
                <div className="text-6xl mb-6">🏠</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">3D Room Memory Challenge</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  <p className="mb-4">1. <strong>Memorize:</strong> Study the 3D room layout for 15 seconds</p>
                  <p className="mb-4">2. <strong>Rebuild:</strong> Objects will be scrambled - put them back in place</p>
                  <p className="mb-4">3. <strong>Precision:</strong> Click objects to select, then click positions to place</p>
                  <p className="text-orange-600 font-semibold">Tests: Short-term memory & spatial awareness</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200"
                >
                  Enter 3D Room
                </button>
              </div>
            )}

            {(gamePhase === 'memorize' || gamePhase === 'rebuild') && (
              <div className="p-8">
                {gamePhase === 'memorize' && (
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Memorize this room layout
                    </h3>
                    <div className="text-2xl font-bold text-orange-600">
                      {viewTime} seconds remaining
                    </div>
                  </div>
                )}

                {gamePhase === 'rebuild' && (
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Rebuild the room from memory
                    </h3>
                    <p className="text-gray-600">Click an object, then click where it should be placed</p>
                  </div>
                )}

                {/* 3D Room View */}
                <div 
                  className="relative mx-auto bg-gradient-to-b from-blue-100 to-green-200 rounded-xl overflow-hidden border-4 border-orange-200"
                  style={{ 
                    width: '600px', 
                    height: '400px', 
                    perspective: '800px',
                    background: 'linear-gradient(to bottom, #dbeafe 0%, #dcfce7 100%)'
                  }}
                >
                  {/* Floor */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-t from-amber-200 to-amber-100"
                    style={{
                      transform: 'rotateX(90deg) translateZ(-200px)',
                      transformOrigin: 'bottom'
                    }}
                  />

                  {/* Room Position Markers (only visible during rebuild) */}
                  {gamePhase === 'rebuild' && RoomPositions.map((pos, index) => (
                    <div
                      key={index}
                      className="absolute w-16 h-16 border-2 border-dashed border-orange-300 rounded-full bg-orange-100/50 cursor-pointer hover:bg-orange-200/70 transition-colors flex items-center justify-center text-xs text-orange-600 font-medium"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: `translateX(-50%) translateY(-50%) translateZ(${pos.z}px)`
                      }}
                      onClick={() => placeObject(pos)}
                    >
                      {pos.name.split(' ')[0]}
                    </div>
                  ))}

                  {/* Room Objects */}
                  {currentRoom.map(obj => (
                    <div
                      key={obj.id}
                      className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                        selectedObject === obj.id ? 'ring-4 ring-orange-400 ring-opacity-75' : ''
                      }`}
                      style={{
                        left: `${obj.position.x}%`,
                        top: `${obj.position.y}%`,
                        transform: `translateX(-50%) translateY(-50%) translateZ(${obj.position.z}px)`,
                        zIndex: 100 - obj.position.z
                      }}
                      onClick={() => selectObject(obj.id)}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-1 drop-shadow-lg">
                          {obj.emoji}
                        </div>
                        <div className="text-xs font-medium text-gray-700 bg-white/80 px-2 py-1 rounded">
                          {obj.name}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* 3D Room Perspective Lines */}
                  <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f59e0b" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Selected Object Info */}
                {selectedObject && gamePhase === 'rebuild' && (
                  <div className="text-center mt-4">
                    <div className="inline-flex items-center space-x-2 bg-orange-100 px-4 py-2 rounded-full">
                      <span className="text-2xl">{currentRoom.find(obj => obj.id === selectedObject)?.emoji}</span>
                      <span className="font-medium text-orange-800">
                        {currentRoom.find(obj => obj.id === selectedObject)?.name} selected
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Click a position marker to place this object</p>
                  </div>
                )}
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center p-12">
                <div className="text-6xl mb-6">
                  {score >= 80 ? '🏆' : score >= 60 ? '⭐' : '💪'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Room Rebuilt!</h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">{score}%</div>
                <div className="text-lg text-gray-600 mb-8">
                  <p>Mistakes: {mistakes}</p>
                  <p className="mt-2">
                    {score >= 80 ? 'Perfect spatial memory!' : 
                     score >= 60 ? 'Great visual recognition!' : 
                     'Keep training your spatial awareness!'}
                  </p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Rebuild Another Room
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <div className="App">
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'maze' && <MazeGame />}
      {currentScreen === 'wordtree' && <WordTreeGame />}
      {currentScreen === 'rhythm' && <RhythmReachGame />}
      {currentScreen === 'room' && <RoomRebuildGame />}
    </div>
  );
};

export default CognitiveGym;