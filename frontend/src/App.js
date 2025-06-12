import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const CognitiveGym = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userProgress, setUserProgress] = useState({
    totalGamesPlayed: 0,
    mazeCompletions: 0,
    wordTreeCompletions: 0,
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
          <div className="grid md:grid-cols-2 gap-8">
            
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
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Your Progress Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-green-600">{userProgress.averageScore}%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Maze Path Recall Game Component
  const MazeGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction'); // instruction, navigate, recall, complete
    const [maze, setMaze] = useState([]);
    const [playerPath, setPlayerPath] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [recallPath, setRecallPath] = useState([]);
    const [score, setScore] = useState(0);
    const [mazeSize] = useState(5);

    const generateMaze = useCallback(() => {
      const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(0));
      // Create a simple path
      const path = [
        {x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, 
        {x: 2, y: 2}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}
      ];
      
      path.forEach(({x, y}) => {
        newMaze[y][x] = 1; // 1 = path, 0 = wall
      });
      
      newMaze[0][0] = 2; // Start
      newMaze[4][4] = 3; // End
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
        
        // Update progress
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
        if (cellValue === 0) cellClass += "bg-gray-800"; // Wall
        else if (cellValue === 2) cellClass += "bg-green-400"; // Start
        else if (cellValue === 3) cellClass += "bg-red-400"; // End
        else cellClass += "bg-white"; // Path
        
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
          {/* Header */}
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

          {/* Game Content */}
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

  // Word Tree Game Component
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
      // Add some incorrect words
      const allWords = Object.values(wordSets).flat();
      const incorrectWords = allWords.filter(w => !words.includes(w)).slice(0, 3);
      
      const allGameWords = [...words, ...incorrectWords].sort(() => Math.random() - 0.5);
      
      setFallingWords(allGameWords.map((word, index) => ({
        id: index,
        text: word,
        x: Math.random() * 70 + 10, // 10-80% from left
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
        
        // Check if tree is complete
        const correctWords = wordSets[currentRootWord];
        const completedWords = Object.keys({...treeProgress, [word.text]: true}).length;
        
        if (completedWords === correctWords.length) {
          setGamePhase('complete');
          setGameActive(false);
          
          // Update progress
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
      }
      return () => clearTimeout(timer);
    }, [gameActive, timeLeft]);

    // Animate falling words
    useEffect(() => {
      if (!gameActive) return;
      
      const animateWords = () => {
        setFallingWords(prev => 
          prev.map(word => ({
            ...word,
            y: word.y + word.speed
          })).filter(word => word.y < 100) // Remove words that fall off screen
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
          {/* Header */}
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

          {/* Game Content */}
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
                {/* Tree Progress */}
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

                {/* Game Area */}
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
                  
                  {/* Tree at bottom */}
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

  // Main render
  return (
    <div className="App">
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'maze' && <MazeGame />}
      {currentScreen === 'wordtree' && <WordTreeGame />}
    </div>
  );
};

export default CognitiveGym;