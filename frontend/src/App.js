import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const CognitiveGym = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState({
    totalGamesPlayed: 0,
    mazeCompletions: 0,
    wordTreeCompletions: 0,
    rhythmReachCompletions: 0,
    roomRebuildCompletions: 0,
    totalScore: 0,
    averageScore: 0,
    streak: 0,
    level: 1,
    xp: 0,
    achievements: []
  });

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cognitiveGymUser');
    const savedProgress = localStorage.getItem('cognitiveGymProgress');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentScreen('dashboard');
    }
    
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('cognitiveGymProgress', JSON.stringify(userProgress));
    }
  }, [userProgress, user]);

  // Authentication Components
  const LoginScreen = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isSignup, setIsSignup] = useState(false);

    const handleAuth = (e) => {
      e.preventDefault();
      
      // Mock authentication - accept any input
      const newUser = {
        id: Date.now(),
        email: loginData.email || 'demo@cognitivegym.com',
        name: loginData.email ? loginData.email.split('@')[0] : 'Demo User',
        joinDate: new Date().toISOString(),
        avatar: '🧠'
      };
      
      setUser(newUser);
      localStorage.setItem('cognitiveGymUser', JSON.stringify(newUser));
      setCurrentScreen('dashboard');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-bold">🧠</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Cognitive Gym</h1>
            <p className="text-emerald-200">Brain Training for Life</p>
          </div>

          {/* Auth Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-emerald-200 text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                {isSignup ? 'Start Training' : 'Continue Training'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-emerald-300 hover:text-emerald-200 font-medium"
              >
                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </button>
            </div>

            {/* Demo Access */}
            <div className="mt-4 text-center">
              <button
                onClick={() => handleAuth({ preventDefault: () => {} })}
                className="text-blue-300 hover:text-blue-200 text-sm underline"
              >
                Continue as Demo User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const logout = () => {
    setUser(null);
    setCurrentScreen('login');
    localStorage.removeItem('cognitiveGymUser');
    localStorage.removeItem('cognitiveGymProgress');
  };

  // Enhanced progress update function
  const updateProgress = (gameType, score) => {
    setUserProgress(prev => {
      const newXP = prev.xp + Math.floor(score / 10) + 20; // Base XP + score bonus
      const newLevel = Math.floor(newXP / 100) + 1;
      const newTotalScore = prev.totalScore + score;
      const newGamesPlayed = prev.totalGamesPlayed + 1;
      const newAverageScore = Math.round(newTotalScore / newGamesPlayed);
      
      // Update specific game completions
      const gameCompletions = {
        maze: prev.mazeCompletions + (gameType === 'maze' ? 1 : 0),
        wordTree: prev.wordTreeCompletions + (gameType === 'wordTree' ? 1 : 0),
        rhythm: prev.rhythmReachCompletions + (gameType === 'rhythm' ? 1 : 0),
        room: prev.roomRebuildCompletions + (gameType === 'room' ? 1 : 0)
      };

      return {
        ...prev,
        totalGamesPlayed: newGamesPlayed,
        mazeCompletions: gameCompletions.maze,
        wordTreeCompletions: gameCompletions.wordTree,
        rhythmReachCompletions: gameCompletions.rhythm,
        roomRebuildCompletions: gameCompletions.room,
        totalScore: newTotalScore,
        averageScore: newAverageScore,
        xp: newXP,
        level: newLevel,
        streak: score > 70 ? prev.streak + 1 : 0
      };
    });
  };

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
                <p className="text-green-600 text-sm">Welcome back, {user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Level {userProgress.level}</p>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(userProgress.xp % 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{userProgress.xp % 100}/100 XP</p>
              </div>
              <button 
                onClick={logout}
                className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg transition-colors"
              >
                Logout
              </button>
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
                Level {userProgress.level} Cognitive Trainer with {userProgress.totalGamesPlayed} games completed!
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-emerald-600">{userProgress.streak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-green-600">{userProgress.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{userProgress.xp}</div>
                  <div className="text-sm text-gray-600">Total XP</div>
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
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-full px-3 py-1">
                <span className="text-emerald-600 font-semibold text-sm">Level {userProgress.level}</span>
              </div>
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
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🗺️</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Spatial Memory</span>
                </div>
                {/* Animated maze pattern */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-blue-800/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 w-8 h-2 bg-white/20 rounded"></div>
                <div className="absolute bottom-4 right-4 w-8 h-2 bg-white/20 rounded"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Maze Path Recall</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Navigate through enhanced mazes, then retrace your path from memory. Improved graphics and difficulty scaling.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-blue-600">{userProgress.mazeCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.min(5, Math.floor(userProgress.mazeCompletions / 2) + 1))}
                    {'☆'.repeat(Math.max(0, 5 - Math.min(5, Math.floor(userProgress.mazeCompletions / 2) + 1)))}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('maze')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Start Maze Challenge
                </button>
              </div>
            </div>

            {/* Word Tree Game */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-emerald-400 to-green-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🌳</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Language Skills</span>
                </div>
                {/* Falling leaves animation */}
                <div className="absolute top-8 left-12 w-2 h-2 bg-white/30 rounded-full animate-bounce"></div>
                <div className="absolute top-16 right-16 w-3 h-3 bg-white/40 rounded-full animate-pulse"></div>
                <div className="absolute bottom-12 left-8 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Word Tree</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Catch slowly falling words to complete synonym trees. Improved speed and visual feedback.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-emerald-600">{userProgress.wordTreeCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.min(5, Math.floor(userProgress.wordTreeCompletions / 2) + 1))}
                    {'☆'.repeat(Math.max(0, 5 - Math.min(5, Math.floor(userProgress.wordTreeCompletions / 2) + 1)))}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('wordtree')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Start Word Challenge
                </button>
              </div>
            </div>

            {/* Rhythm Reach Game */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🎵</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">VR-Style</span>
                </div>
                {/* Slower floating orbs */}
                <div className="absolute top-8 left-8 w-6 h-6 bg-white/30 rounded-full animate-pulse slow-pulse"></div>
                <div className="absolute bottom-12 right-12 w-4 h-4 bg-white/40 rounded-full animate-bounce slow-bounce"></div>
                <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white/50 rounded-full animate-ping slow-ping"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Rhythm Reach</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Tap larger, slower-moving orbs in 3D space with easier math challenges. Perfect for seniors!
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-purple-600">{userProgress.rhythmReachCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.min(5, Math.floor(userProgress.rhythmReachCompletions / 2) + 1))}
                    {'☆'.repeat(Math.max(0, 5 - Math.min(5, Math.floor(userProgress.rhythmReachCompletions / 2) + 1)))}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('rhythm')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Start VR Experience
                </button>
              </div>
            </div>

            {/* Room Rebuild Game */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-48 bg-gradient-to-br from-orange-400 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl">🏠</span>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Enhanced 3D</span>
                </div>
                {/* Isometric room elements */}
                <div className="absolute bottom-8 left-8 w-8 h-6 bg-white/20 rounded transform rotate-12 skew-x-12"></div>
                <div className="absolute bottom-6 right-8 w-6 h-8 bg-white/30 rounded transform -rotate-6 skew-y-6"></div>
                <div className="absolute top-12 left-1/2 w-4 h-4 bg-white/40 rounded-full"></div>
              </div>
              <div className="p-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-3">Room Rebuild</h4>
                <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                  Explore improved 3D isometric rooms with better graphics and realistic furniture placement.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Completions:</span>
                    <span className="font-semibold text-orange-600">{userProgress.roomRebuildCompletions}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.min(5, Math.floor(userProgress.roomRebuildCompletions / 2) + 1))}
                    {'☆'.repeat(Math.max(0, 5 - Math.min(5, Math.floor(userProgress.roomRebuildCompletions / 2) + 1)))}
                  </div>
                </div>
                <button 
                  onClick={() => setCurrentScreen('room')}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-semibold py-4 px-6 rounded-xl text-lg transition-all duration-200 transform hover:scale-105"
                >
                  Enter 3D Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Progress Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">Your Progress Journey</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-gray-800">{userProgress.totalGamesPlayed}</div>
              <div className="text-gray-600">Games Played</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
              <div className="text-3xl mb-2">🧭</div>
              <div className="text-2xl font-bold text-blue-600">{userProgress.mazeCompletions}</div>
              <div className="text-gray-600">Mazes Solved</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
              <div className="text-3xl mb-2">🌲</div>
              <div className="text-2xl font-bold text-emerald-600">{userProgress.wordTreeCompletions}</div>
              <div className="text-gray-600">Trees Completed</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
              <div className="text-3xl mb-2">🎵</div>
              <div className="text-2xl font-bold text-purple-600">{userProgress.rhythmReachCompletions}</div>
              <div className="text-gray-600">Rhythms Mastered</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
              <div className="text-3xl mb-2">🏠</div>
              <div className="text-2xl font-bold text-orange-600">{userProgress.roomRebuildCompletions}</div>
              <div className="text-gray-600">Rooms Rebuilt</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-2xl font-bold text-green-600">{userProgress.averageScore}%</div>
              <div className="text-gray-600">Average Score</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // FIXED: Enhanced Maze Game Component - Ensures path always reaches end
  const MazeGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [maze, setMaze] = useState([]);
    const [playerPath, setPlayerPath] = useState([]);
    const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
    const [recallPath, setRecallPath] = useState([]);
    const [score, setScore] = useState(0);
    const [mazeSize] = useState(6);

    // FIXED: Generate guaranteed path that always reaches the end
    const generateMaze = useCallback(() => {
      const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(0));
      
      // Create a guaranteed path from start to end using pathfinding
      const start = { x: 0, y: 0 };
      const end = { x: mazeSize - 1, y: mazeSize - 1 };
      
      // Generate a path that ensures we can reach the end
      const pathOptions = [
        // Simple L-shape paths that always work
        () => {
          const path = [];
          // Go right first, then down
          for (let x = 0; x < mazeSize; x++) {
            path.push({ x, y: 0 });
          }
          for (let y = 1; y < mazeSize; y++) {
            path.push({ x: mazeSize - 1, y });
          }
          return path;
        },
        // Go down first, then right
        () => {
          const path = [];
          for (let y = 0; y < mazeSize; y++) {
            path.push({ x: 0, y });
          }
          for (let x = 1; x < mazeSize; x++) {
            path.push({ x, y: mazeSize - 1 });
          }
          return path;
        },
        // Zigzag pattern
        () => {
          const path = [];
          let x = 0, y = 0;
          path.push({ x, y });
          
          while (x < mazeSize - 1 || y < mazeSize - 1) {
            if (x < mazeSize - 1) {
              x++;
              path.push({ x, y });
            }
            if (y < mazeSize - 1 && x === mazeSize - 1) {
              y++;
              path.push({ x, y });
            } else if (y < mazeSize - 1 && Math.random() > 0.5) {
              y++;
              path.push({ x, y });
            }
          }
          return path;
        }
      ];
      
      // Choose a random path generation method
      const selectedPath = pathOptions[Math.floor(Math.random() * pathOptions.length)]();
      
      // Set all path cells to walkable
      selectedPath.forEach(({x, y}) => {
        if (x < mazeSize && y < mazeSize) {
          newMaze[y][x] = 1;
        }
      });
      
      // Mark start and end
      newMaze[0][0] = 2; // Start
      newMaze[mazeSize-1][mazeSize-1] = 3; // End
      
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
        
        if (newX === mazeSize-1 && newY === mazeSize-1) {
          setTimeout(() => setGamePhase('recall'), 1500);
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
        
        const baseScore = Math.round((correctMoves / playerPath.length) * 100);
        const bonusScore = Math.max(0, (playerPath.length - newRecallPath.length + 5) * 2);
        const finalScore = Math.min(100, baseScore + bonusScore);
        
        setScore(finalScore);
        setGamePhase('complete');
        updateProgress('maze', finalScore);
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
      let cellClass = "w-16 h-16 border-2 border-gray-400 flex items-center justify-center text-lg font-bold transition-all duration-200 ";
      
      if (gamePhase === 'navigate') {
        if (cellValue === 0) cellClass += "bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner";
        else if (cellValue === 2) cellClass += "bg-gradient-to-br from-green-400 to-green-500 shadow-lg";
        else if (cellValue === 3) cellClass += "bg-gradient-to-br from-red-400 to-red-500 shadow-lg animate-pulse";
        else cellClass += "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200";
        
        if (currentPosition.x === x && currentPosition.y === y) {
          cellClass += " bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl transform scale-110";
          return <div key={`${x}-${y}`} className={cellClass}>🤖</div>;
        }
      } else if (gamePhase === 'recall') {
        cellClass += "bg-gradient-to-br from-gray-100 to-gray-200 hover:from-blue-200 hover:to-blue-300 cursor-pointer transform hover:scale-105 ";
        if (recallPath.some(p => p.x === x && p.y === y)) {
          cellClass += "bg-gradient-to-br from-blue-400 to-blue-500 text-white shadow-lg";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-blue-600 hover:text-blue-800 text-lg font-medium bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Enhanced Maze Challenge</h2>
            </div>
            {gamePhase === 'navigate' && (
              <div className="text-right bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Steps taken</p>
                <p className="text-2xl font-bold text-blue-600">{playerPath.length}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            {gamePhase === 'instruction' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🗺️</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enhanced Maze Navigation</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed bg-blue-50 p-6 rounded-xl">
                  <p className="mb-4">🎯 <strong>Navigate:</strong> Use arrow buttons to move from start (🏁) to finish (🎯)</p>
                  <p className="mb-4">🧠 <strong>Remember:</strong> Memorize every step of your path</p>
                  <p className="mb-4">✨ <strong>Recall:</strong> Recreate your exact path for bonus points</p>
                  <p className="text-blue-600 font-semibold">Level {userProgress.level} Difficulty - Path always reaches the end!</p>
                </div>
                <button 
                  onClick={() => setGamePhase('navigate')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start Challenge
                </button>
              </div>
            )}

            {gamePhase === 'navigate' && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg">Navigate to the target! 🎯</h3>
                <div className="grid gap-1 justify-center mb-8 mx-auto w-fit bg-gray-50 p-4 rounded-xl shadow-inner" style={{gridTemplateColumns: `repeat(${mazeSize}, minmax(0, 1fr))`}}>
                  {maze.map((row, y) => 
                    row.map((cell, x) => renderMazeCell(cell, x, y))
                  )}
                </div>
                <div className="flex justify-center items-center space-x-4">
                  <button onClick={() => movePlayer('up')} className="bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-xl shadow-lg transform hover:scale-105 transition-all">↑</button>
                  <div className="flex flex-col space-y-2">
                    <button onClick={() => movePlayer('left')} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-xl shadow-lg transform hover:scale-105 transition-all">←</button>
                    <button onClick={() => movePlayer('right')} className="bg-gradient-to-l from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-xl shadow-lg transform hover:scale-105 transition-all">→</button>
                  </div>
                  <button onClick={() => movePlayer('down')} className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-medium text-xl shadow-lg transform hover:scale-105 transition-all">↓</button>
                </div>
              </div>
            )}

            {gamePhase === 'recall' && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">Retrace your exact path! Click cells in order.</h3>
                <div className="grid gap-1 justify-center mb-6 mx-auto w-fit bg-gray-50 p-4 rounded-xl shadow-inner" style={{gridTemplateColumns: `repeat(${mazeSize}, minmax(0, 1fr))`}}>
                  {Array(mazeSize).fill().map((_, y) => 
                    Array(mazeSize).fill().map((_, x) => renderMazeCell(1, x, y))
                  )}
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-600 font-medium">Progress: {recallPath.length} / {playerPath.length}</p>
                  <div className="w-full bg-blue-200 rounded-full h-3 mt-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(recallPath.length / playerPath.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center">
                <div className="text-6xl mb-6">{score >= 90 ? '🏆' : score >= 75 ? '⭐' : score >= 60 ? '👏' : '💪'}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Challenge Complete!</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">{score}%</div>
                <p className="text-lg text-gray-600 mb-4">
                  {score >= 90 ? 'Perfect navigation!' : score >= 75 ? 'Excellent memory!' : score >= 60 ? 'Great job!' : 'Keep practicing!'}
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6">
                  <p className="text-blue-600 font-semibold">+{Math.floor(score / 10) + 20} XP Earned!</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
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

  // Word Tree Game Component (unchanged)
  const WordTreeGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [fallingWords, setFallingWords] = useState([]);
    const [treeProgress, setTreeProgress] = useState({});
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [gameActive, setGameActive] = useState(false);
    const [rootWord] = useState(() => {
      const wordSets = {
        happy: ['joyful', 'cheerful', 'elated', 'pleased', 'content'],
        big: ['large', 'huge', 'enormous', 'massive', 'giant'],
        fast: ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
        smart: ['clever', 'wise', 'bright', 'intelligent', 'brilliant']
      };
      const keys = Object.keys(wordSets);
      return keys[Math.floor(Math.random() * keys.length)];
    });

    const wordSets = {
      happy: ['joyful', 'cheerful', 'elated', 'pleased', 'content'],
      big: ['large', 'huge', 'enormous', 'massive', 'giant'],
      fast: ['quick', 'rapid', 'swift', 'speedy', 'hasty'],
      smart: ['clever', 'wise', 'bright', 'intelligent', 'brilliant']
    };

    const startGame = () => {
      setGamePhase('playing');
      setGameActive(true);
      setTimeLeft(90);
      setScore(0);
      setTreeProgress({});
      generateFallingWords();
    };

    const generateFallingWords = () => {
      const words = [...wordSets[rootWord]];
      const allWords = Object.values(wordSets).flat();
      const incorrectWords = allWords.filter(w => !words.includes(w)).slice(0, 4);
      
      const allGameWords = [...words, ...incorrectWords].sort(() => Math.random() - 0.5);
      
      setFallingWords(allGameWords.map((word, index) => ({
        id: Math.random() * 1000 + index,
        text: word,
        x: Math.random() * 70 + 10,
        y: -100,
        speed: Math.random() * 0.8 + 0.4,
        correct: words.includes(word)
      })));
    };

    const catchWord = (wordId) => {
      const word = fallingWords.find(w => w.id === wordId);
      if (!word) return;

      if (word.correct) {
        setScore(prev => prev + 15);
        setTreeProgress(prev => ({
          ...prev,
          [word.text]: true
        }));
        
        const correctWords = wordSets[rootWord];
        const completedWords = Object.keys({...treeProgress, [word.text]: true}).length;
        
        if (completedWords === correctWords.length) {
          setGamePhase('complete');
          setGameActive(false);
          updateProgress('wordTree', score + 15);
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
        updateProgress('wordTree', score);
      }
      return () => clearTimeout(timer);
    }, [gameActive, timeLeft, score]);

    useEffect(() => {
      if (!gameActive) return;
      
      const animateWords = () => {
        setFallingWords(prev => 
          prev.map(word => ({
            ...word,
            y: word.y + word.speed
          })).filter(word => word.y < 110)
        );
      };

      const interval = setInterval(animateWords, 30);
      return () => clearInterval(interval);
    }, [gameActive]);

    useEffect(() => {
      if (!gameActive) return;
      
      const addWords = () => {
        if (fallingWords.length < 4) {
          const words = [...wordSets[rootWord]];
          const allWords = Object.values(wordSets).flat();
          const incorrectWords = allWords.filter(w => !words.includes(w));
          const randomWords = [...words, ...incorrectWords].sort(() => Math.random() - 0.5).slice(0, 2);
          
          const newWords = randomWords.map(word => ({
            id: Math.random() * 1000,
            text: word,
            x: Math.random() * 70 + 10,
            y: -100,
            speed: Math.random() * 0.8 + 0.4,
            correct: words.includes(word)
          }));
          
          setFallingWords(prev => [...prev, ...newWords]);
        }
      };

      const interval = setInterval(addWords, 3000);
      return () => clearInterval(interval);
    }, [gameActive, fallingWords.length, rootWord]);

    const resetGame = () => {
      setGamePhase('instruction');
      setFallingWords([]);
      setTreeProgress({});
      setScore(0);
      setTimeLeft(90);
      setGameActive(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-emerald-600 hover:text-emerald-800 text-lg font-medium bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Enhanced Word Tree</h2>
            </div>
            {gamePhase === 'playing' && (
              <div className="flex space-x-6 text-right">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-emerald-600">{score}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-2xl font-bold text-orange-600">{timeLeft}s</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100">
            {gamePhase === 'instruction' && (
              <div className="text-center">
                <div className="text-6xl mb-6">🌳</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enhanced Word Tree Challenge</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed bg-emerald-50 p-6 rounded-xl">
                  <p className="mb-4">🍃 <strong>Watch:</strong> Words fall gently from the sky</p>
                  <p className="mb-4">🎯 <strong>Catch:</strong> Click words that mean the same as the root word</p>
                  <p className="mb-4">🌱 <strong>Grow:</strong> Complete your vocabulary tree</p>
                  <p className="text-emerald-600 font-bold text-xl">Root word: "{rootWord.toUpperCase()}"</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Start Growing
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-lg">
                    Growing tree for: <span className="text-emerald-600 font-bold text-2xl">"{rootWord}"</span>
                  </h3>
                  <div className="flex justify-center space-x-2 mb-4 flex-wrap gap-2">
                    {wordSets[rootWord].map(word => (
                      <div 
                        key={word}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          treeProgress[word] 
                            ? 'bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 shadow-sm transform scale-110' 
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {treeProgress[word] ? `✓ ${word}` : '???'}
                      </div>
                    ))}
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(Object.keys(treeProgress).length / wordSets[rootWord].length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div className="relative h-96 bg-gradient-to-b from-sky-100 via-emerald-50 to-green-100 rounded-xl overflow-hidden border-4 border-emerald-200 shadow-inner">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-100/30">
                    {[...Array(15)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-300/20 rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${3 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>

                  {fallingWords.map(word => (
                    <div
                      key={word.id}
                      className={`absolute px-6 py-3 rounded-full cursor-pointer font-semibold text-white transition-all duration-200 hover:scale-125 shadow-lg ${
                        word.correct 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700' 
                          : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
                      }`}
                      style={{
                        left: `${word.x}%`,
                        top: `${word.y}%`,
                        transform: 'translateX(-50%)',
                        minWidth: '120px',
                        textAlign: 'center',
                        fontSize: '16px',
                        zIndex: 10
                      }}
                      onClick={() => catchWord(word.id)}
                    >
                      {word.text}
                    </div>
                  ))}
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-6xl filter drop-shadow-lg">
                    🌳
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-t from-green-800/20 to-transparent rounded-full blur-sm"></div>
                </div>
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center">
                <div className="text-6xl mb-6">
                  {Object.keys(treeProgress).length === wordSets[rootWord].length ? '🏆' : score > 50 ? '⭐' : '🌱'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {Object.keys(treeProgress).length === wordSets[rootWord].length 
                    ? 'Perfect Tree!' 
                    : 'Tree Growing!'}
                </h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">{score} points</div>
                <p className="text-lg text-gray-600 mb-4">
                  You found {Object.keys(treeProgress).length} out of {wordSets[rootWord].length} synonyms for "{rootWord}"
                </p>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg mb-6">
                  <p className="text-emerald-600 font-semibold">+{Math.floor(score / 10) + 20} XP Earned!</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Grow Another Tree
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
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

  // Rhythm Reach Game Component (unchanged)
  const RhythmReachGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [orbs, setOrbs] = useState([]);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [mathChallenge, setMathChallenge] = useState(null);
    const [mathAnswer, setMathAnswer] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameActive, setGameActive] = useState(false);
    const [orbsHit, setOrbsHit] = useState(0);

    const generateOrb = () => {
      return {
        id: Math.random(),
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        z: Math.random() * 100 + 50,
        color: ['purple', 'pink', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 5)],
        size: Math.random() * 20 + 40,
        pulseSpeed: Math.random() * 1 + 2,
        createdAt: Date.now(),
        lifetime: 6000
      };
    };

    const generateMathChallenge = () => {
      const operations = ['+', '-'];
      const operation = operations[Math.floor(Math.random() * operations.length)];
      let num1, num2, answer;
      
      if (operation === '+') {
        num1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 15) + 1;
        answer = num1 + num2;
      } else {
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * num1) + 1;
        answer = num1 - num2;
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
      setTimeLeft(60);
      setOrbs([]);
      setMathChallenge(null);
    };

    const hitOrb = (orbId) => {
      const orb = orbs.find(o => o.id === orbId);
      if (!orb) return;

      setScore(prev => prev + (15 * Math.max(1, combo)));
      setCombo(prev => prev + 1);
      setOrbsHit(prev => prev + 1);
      setOrbs(prev => prev.filter(o => o.id !== orbId));

      if ((orbsHit + 1) % 8 === 0) {
        setMathChallenge(generateMathChallenge());
      }
    };

    const submitMathAnswer = () => {
      if (mathChallenge && mathAnswer === mathChallenge.answer) {
        setScore(prev => prev + 100);
        setCombo(prev => prev + 3);
      } else {
        setCombo(0);
      }
      setMathChallenge(null);
      setMathAnswer('');
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
        updateProgress('rhythm', score);
      }
      return () => clearTimeout(timer);
    }, [gameActive, timeLeft, score]);

    useEffect(() => {
      if (!gameActive) return;
      
      const generateOrbs = () => {
        setOrbs(prev => {
          const filtered = prev.filter(orb => Date.now() - orb.createdAt < orb.lifetime);
          
          if (filtered.length < 2) {
            return [...filtered, generateOrb()];
          }
          return filtered;
        });
      };

      const interval = setInterval(generateOrbs, 2000);
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
      setTimeLeft(60);
      setGameActive(false);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-purple-300 hover:text-purple-100 text-lg font-medium bg-white/10 backdrop-blur px-4 py-2 rounded-lg"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-white">Enhanced Rhythm Reach</h2>
              <div className="text-purple-300 text-sm bg-purple-800/30 px-3 py-1 rounded-full">
                Senior-Friendly VR Experience
              </div>
            </div>
            {gamePhase === 'playing' && (
              <div className="flex space-x-6 text-right text-white">
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-purple-300">Score</p>
                  <p className="text-2xl font-bold text-purple-300">{score}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-purple-300">Combo</p>
                  <p className="text-2xl font-bold text-pink-400">x{combo}</p>
                </div>
                <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                  <p className="text-sm text-purple-300">Time</p>
                  <p className="text-2xl font-bold text-yellow-400">{timeLeft}s</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black/20 backdrop-blur rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30">
            {gamePhase === 'instruction' && (
              <div className="text-center p-12 text-white">
                <div className="text-6xl mb-6">🎵</div>
                <h3 className="text-2xl font-bold mb-4">Senior-Friendly VR Rhythm Challenge</h3>
                <div className="text-lg mb-8 max-w-2xl mx-auto leading-relaxed text-purple-200 bg-purple-900/30 p-6 rounded-xl">
                  <p className="mb-4">🎯 <strong className="text-white">Tap Orbs:</strong> Click larger, slower-moving orbs in 3D space</p>
                  <p className="mb-4">🔥 <strong className="text-white">Build Combos:</strong> Hit consecutive orbs for bonus points</p>
                  <p className="mb-4">🧮 <strong className="text-white">Simple Math:</strong> Answer easy arithmetic questions</p>
                  <p className="text-pink-300 font-semibold">Perfect for seniors - larger targets, slower pace!</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Enter VR Experience
                </button>
              </div>
            )}

            {gamePhase === 'playing' && (
              <div className="relative">
                <div 
                  className="relative h-96 bg-gradient-to-b from-purple-900/50 via-blue-900/50 to-indigo-900/50 overflow-hidden"
                  style={{ perspective: '1200px' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20">
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>

                  {orbs.map(orb => (
                    <div
                      key={orb.id}
                      className={`absolute cursor-pointer transition-all duration-300 hover:scale-125`}
                      style={{
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        transform: `translateZ(${orb.z}px) translateX(-50%) translateY(-50%)`,
                        width: `${orb.size}px`,
                        height: `${orb.size}px`,
                        zIndex: Math.floor(orb.z)
                      }}
                      onClick={() => hitOrb(orb.id)}
                    >
                      <div 
                        className={`w-full h-full rounded-full shadow-2xl bg-gradient-to-br border-4 border-white/50 cursor-pointer transition-all duration-200 hover:border-white/80 ${
                          orb.color === 'purple' ? 'from-purple-400 to-purple-600' :
                          orb.color === 'pink' ? 'from-pink-400 to-pink-600' :
                          orb.color === 'blue' ? 'from-blue-400 to-blue-600' :
                          orb.color === 'green' ? 'from-green-400 to-green-600' :
                          'from-yellow-400 to-yellow-600'
                        }`}
                        style={{
                          boxShadow: `0 0 30px ${orb.color === 'purple' ? '#a855f7' : 
                                                orb.color === 'pink' ? '#ec4899' :
                                                orb.color === 'blue' ? '#3b82f6' :
                                                orb.color === 'green' ? '#10b981' : '#eab308'}, 
                                      0 0 60px ${orb.color === 'purple' ? '#a855f7' : 
                                                orb.color === 'pink' ? '#ec4899' :
                                                orb.color === 'blue' ? '#3b82f6' :
                                                orb.color === 'green' ? '#10b981' : '#eab308'}/50`,
                          animation: `float ${orb.pulseSpeed}s ease-in-out infinite`
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-white/40 to-transparent flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {orb.color === 'purple' ? '🔮' : 
                             orb.color === 'pink' ? '💎' :
                             orb.color === 'blue' ? '🌟' :
                             orb.color === 'green' ? '🍀' : '⚡'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="absolute bottom-4 left-4 text-white bg-black/30 backdrop-blur p-3 rounded-lg">
                    <div className="text-sm opacity-75">Orbs Hit: {orbsHit}</div>
                    {combo > 0 && (
                      <div className="text-xl font-bold text-pink-400 animate-pulse">
                        COMBO x{combo}! 🔥
                      </div>
                    )}
                  </div>
                </div>

                {mathChallenge && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-center max-w-sm mx-4 border border-white/20 shadow-2xl">
                      <h3 className="text-2xl font-bold text-white mb-4">Quick Math! 🧮</h3>
                      <div className="text-4xl font-bold text-yellow-300 mb-6 bg-black/20 p-4 rounded-xl">
                        {mathChallenge.question}
                      </div>
                      <input
                        type="number"
                        value={mathAnswer}
                        onChange={(e) => setMathAnswer(e.target.value)}
                        className="w-full text-3xl text-center border-2 border-white/30 rounded-lg py-4 mb-4 focus:border-yellow-400 focus:outline-none bg-white/10 text-white placeholder-white/60"
                        placeholder="?"
                        autoFocus
                      />
                      <button
                        onClick={submitMathAnswer}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold py-4 rounded-xl transition-all duration-200 transform hover:scale-105"
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
                  {score >= 600 ? '🏆' : score >= 300 ? '⭐' : score >= 150 ? '👏' : '💪'}
                </div>
                <h3 className="text-2xl font-bold mb-4">VR Session Complete!</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">{score} points</div>
                <div className="text-lg text-purple-200 mb-4 bg-purple-900/30 p-4 rounded-xl">
                  <p>🎯 Orbs Hit: {orbsHit}</p>
                  <p>🔥 Max Combo: {combo}</p>
                  <p className="mt-2 font-semibold">
                    {score >= 600 ? 'Outstanding VR performance!' : 
                     score >= 300 ? 'Excellent cognitive-motor skills!' : 
                     score >= 150 ? 'Great attention switching!' :
                     'Keep practicing your coordination!'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50/10 to-pink-50/10 p-4 rounded-lg mb-6">
                  <p className="text-purple-300 font-semibold">+{Math.floor(score / 10) + 20} XP Earned!</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
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

  // FIXED: Room Rebuild Game Component - Location markers beside positions
  const RoomRebuildGame = () => {
    const [gamePhase, setGamePhase] = useState('instruction');
    const [originalRoom, setOriginalRoom] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [selectedObject, setSelectedObject] = useState(null);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [viewTime, setViewTime] = useState(20);

    const roomObjects = [
      { id: 'chair', name: 'Chair', emoji: '🪑', color: '#8B4513', height: 80 },
      { id: 'table', name: 'Table', emoji: '🟫', color: '#A0522D', height: 60 },
      { id: 'lamp', name: 'Lamp', emoji: '💡', color: '#FFD700', height: 120 },
      { id: 'plant', name: 'Plant', emoji: '🪴', color: '#228B22', height: 100 },
      { id: 'book', name: 'Books', emoji: '📚', color: '#4169E1', height: 40 },
      { id: 'clock', name: 'Clock', emoji: '🕐', color: '#2F4F4F', height: 30 }
    ];

    const generateRoom = () => {
      const shuffled = roomObjects.sort(() => Math.random() - 0.5);
      const selectedObjects = shuffled.slice(0, 5);
      
      const positions = [
        { x: 25, y: 70, z: 20, name: 'Front Left' },
        { x: 75, y: 70, z: 20, name: 'Front Right' },
        { x: 50, y: 50, z: 60, name: 'Center' },
        { x: 20, y: 30, z: 100, name: 'Back Left' },
        { x: 80, y: 30, z: 100, name: 'Back Right' }
      ];

      return selectedObjects.map((obj, index) => ({
        ...obj,
        position: positions[index],
        correctPosition: positions[index],
        id: `${obj.id}_${index}`
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
      setViewTime(20);
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

      setCurrentRoom(prev => {
        // Find the selected object
        const selectedObj = prev.find(obj => obj.id === selectedObject);
        if (!selectedObj) return prev;

        // Find if there's an object at the target position
        const targetObj = prev.find(obj => 
          obj.id !== selectedObject && 
          Math.abs(obj.position.x - newPosition.x) < 15 && 
          Math.abs(obj.position.y - newPosition.y) < 15
        );

        // If there's an object at target position, swap them
        if (targetObj) {
          const selectedObjOriginalPosition = selectedObj.position;
          
          return prev.map(obj => {
            if (obj.id === selectedObject) {
              // Move selected object to target position
              return { ...obj, position: newPosition };
            } else if (obj.id === targetObj.id) {
              // Move target object to selected object's original position
              return { ...obj, position: selectedObjOriginalPosition };
            }
            return obj;
          });
        } else {
          // If no object at target position, just move the selected object
          return prev.map(obj => 
            obj.id === selectedObject 
              ? { ...obj, position: newPosition }
              : obj
          );
        }
      });
      
      setSelectedObject(null);
    };

    const checkCompletion = () => {
      let correctPlacements = 0;
      let totalObjects = originalRoom.length;

      originalRoom.forEach(originalObj => {
        const currentObj = currentRoom.find(obj => obj.id === originalObj.id);
        if (currentObj && 
            Math.abs(currentObj.position.x - originalObj.correctPosition.x) < 15 &&
            Math.abs(currentObj.position.y - originalObj.correctPosition.y) < 15) {
          correctPlacements++;
        }
      });

      if (correctPlacements === totalObjects) {
        const baseScore = 100;
        const mistakePenalty = mistakes * 5;
        const finalScore = Math.max(0, baseScore - mistakePenalty);
        setScore(finalScore);
        setGamePhase('complete');
        updateProgress('room', finalScore);
      }
    };

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
      setViewTime(20);
    };

    // FIXED: Position markers are now beside the locations, not overlapping
    const RoomPositions = [
      { x: 25, y: 70, z: 20, name: 'Front Left', markerX: 10, markerY: 80 },  // Marker below and left
      { x: 75, y: 70, z: 20, name: 'Front Right', markerX: 90, markerY: 80 }, // Marker below and right
      { x: 50, y: 50, z: 60, name: 'Center', markerX: 35, markerY: 40 },      // Marker above and left
      { x: 20, y: 30, z: 100, name: 'Back Left', markerX: 5, markerY: 20 },   // Marker above and left
      { x: 80, y: 30, z: 100, name: 'Back Right', markerX: 95, markerY: 20 }  // Marker above and right
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentScreen('dashboard')}
                className="text-orange-600 hover:text-orange-800 text-lg font-medium bg-white px-4 py-2 rounded-lg shadow-sm"
              >
                ← Back to Dashboard
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Enhanced 3D Room Rebuild</h2>
              <div className="text-orange-600 text-sm bg-orange-100 px-3 py-1 rounded-full">
                Isometric Memory Challenge
              </div>
            </div>
            {gamePhase === 'memorize' && (
              <div className="text-right bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Study Time</p>
                <p className="text-3xl font-bold text-orange-600">{viewTime}s</p>
              </div>
            )}
            {gamePhase === 'rebuild' && (
              <div className="text-right bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Mistakes</p>
                <p className="text-2xl font-bold text-red-600">{mistakes}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-200">
            {gamePhase === 'instruction' && (
              <div className="text-center p-12">
                <div className="text-6xl mb-6">🏠</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Enhanced 3D Room Memory Challenge</h3>
                <div className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed bg-orange-50 p-6 rounded-xl">
                  <p className="mb-4">🏛️ <strong>Study:</strong> Examine the isometric 3D room layout for 20 seconds</p>
                  <p className="mb-4">🔄 <strong>Rebuild:</strong> Furniture will be scrambled - restore the original layout</p>
                  <p className="mb-4">🎯 <strong>Precision:</strong> Click objects to select, then click position markers to place</p>
                  <p className="text-orange-600 font-semibold">Enhanced graphics with easy-to-use position markers!</p>
                </div>
                <button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Enter Enhanced 3D Room
                </button>
              </div>
            )}

            {(gamePhase === 'memorize' || gamePhase === 'rebuild') && (
              <div className="p-8">
                {gamePhase === 'memorize' && (
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                      Study this 3D room layout carefully
                    </h3>
                    <div className="text-3xl font-bold text-orange-600">
                      {viewTime} seconds remaining
                    </div>
                  </div>
                )}

                {gamePhase === 'rebuild' && (
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg">
                      Rebuild the room from memory
                    </h3>
                    <p className="text-gray-600">Click an object to select it, then click a <span className="font-bold text-orange-600">position marker 📍</span> to place it</p>
                  </div>
                )}

                {/* Enhanced 3D Room View */}
                <div 
                  className="relative mx-auto bg-gradient-to-b from-sky-200 via-blue-100 to-green-200 rounded-xl overflow-hidden border-4 border-orange-300 shadow-2xl"
                  style={{ 
                    width: '700px', 
                    height: '500px', 
                    background: `
                      linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 25%, #81c784 50%, #dcedc8 75%, #f3e5ab 100%),
                      repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)
                    `
                  }}
                >
                  {/* Isometric Floor Grid */}
                  <svg className="absolute inset-0 pointer-events-none opacity-30" width="100%" height="100%">
                    <defs>
                      <pattern id="isoGrid" width="40" height="35" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 40 17.5 L 20 35 L 0 17.5 Z" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#isoGrid)" />
                  </svg>

                  {/* FIXED: Position Markers - Now positioned BESIDE the actual positions with enhanced interaction */}
                  {gamePhase === 'rebuild' && RoomPositions.map((pos, index) => (
                    <div
                      key={index}
                      className="absolute border-3 border-dashed border-orange-500 rounded-lg bg-orange-200/80 cursor-pointer hover:bg-orange-300/90 transition-all duration-200 flex items-center justify-center text-xs text-orange-800 font-bold shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                      style={{
                        left: `${pos.markerX}%`,
                        top: `${pos.markerY}%`,
                        width: '80px',
                        height: '60px',
                        transform: `translateX(-50%) translateY(-50%)`,
                        zIndex: 400,
                        background: selectedObject 
                          ? `linear-gradient(135deg, rgba(34, 197, 94, 0.8), rgba(34, 197, 94, 0.9))` 
                          : `linear-gradient(135deg, rgba(251, 146, 60, 0.8), rgba(251, 146, 60, 0.9))`,
                        backdropFilter: 'blur(2px)',
                        border: selectedObject 
                          ? '3px dashed #16a34a' 
                          : '3px dashed #ea580c',
                        animation: selectedObject ? 'pulse 2s ease-in-out infinite' : 'none'
                      }}
                      onClick={() => placeObject(pos)}
                    >
                      <div className="text-center">
                        <div className="text-xl">
                          {selectedObject ? '✅' : '📍'}
                        </div>
                        <div className="text-xs leading-tight font-extrabold">
                          {pos.name}
                        </div>
                        {selectedObject && (
                          <div className="text-xs text-green-800 font-bold mt-1">
                            Click to place
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Enhanced 3D Objects */}
                  {currentRoom.map(obj => {
                    const isSelected = selectedObject === obj.id;
                    const zDepth = obj.position.z;
                    const scale = 1 - (zDepth / 500);
                    
                    return (
                      <div
                        key={obj.id}
                        className={`absolute cursor-pointer transition-all duration-300 hover:scale-110 ${
                          isSelected ? 'ring-4 ring-orange-500 ring-opacity-75 animate-pulse z-50' : ''
                        }`}
                        style={{
                          left: `${obj.position.x}%`,
                          top: `${obj.position.y}%`,
                          transform: `
                            translateX(-50%) translateY(-50%) 
                            translateZ(${zDepth}px) 
                            rotateX(15deg) rotateY(-10deg) 
                            scale(${scale})
                          `,
                          zIndex: isSelected ? 350 : 300 - zDepth,
                          filter: `brightness(${1 - zDepth / 1000}) contrast(${1 + zDepth / 500})`
                        }}
                        onClick={() => selectObject(obj.id)}
                      >
                        <div className="relative">
                          <div 
                            className="absolute bg-gray-800/20 rounded-full blur-sm"
                            style={{
                              width: `${60 + obj.height / 4}px`,
                              height: '20px',
                              bottom: '-10px',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              zIndex: -1
                            }}
                          />
                          
                          <div className={`text-center bg-white/90 backdrop-blur rounded-lg p-3 shadow-xl border border-white/50 ${isSelected ? 'bg-orange-200/90' : ''}`}>
                            <div 
                              className="mb-2 filter drop-shadow-lg"
                              style={{ 
                                fontSize: `${Math.max(40, 60 - zDepth / 5)}px`,
                                height: `${obj.height * scale}px`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {obj.emoji}
                            </div>
                            <div 
                              className={`text-xs font-bold px-2 py-1 rounded-full ${isSelected ? 'bg-orange-300 text-orange-900' : 'bg-white/80 text-gray-800'}`}
                              style={{ fontSize: `${Math.max(10, 12 - zDepth / 50)}px` }}
                            >
                              {obj.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Enhanced Room Lighting */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-transparent to-blue-900/20 pointer-events-none mix-blend-overlay"></div>
                  
                  {/* Room Corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-gray-400/50"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-gray-400/50"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-gray-400/50"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-gray-400/50"></div>
                </div>

                {/* Enhanced Object Selection UI */}
                {selectedObject && gamePhase === 'rebuild' && (
                  <div className="text-center mt-6">
                    <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-red-100 px-6 py-3 rounded-full shadow-lg border border-orange-200">
                      <span className="text-3xl">{currentRoom.find(obj => obj.id === selectedObject)?.emoji}</span>
                      <span className="font-bold text-orange-800 text-lg">
                        {currentRoom.find(obj => obj.id === selectedObject)?.name} selected
                      </span>
                      <span className="animate-bounce">👆</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 bg-blue-50 p-2 rounded-lg">
                      📍 Click an <strong>orange position marker</strong> beside the desired location to place this object
                    </p>
                  </div>
                )}
              </div>
            )}

            {gamePhase === 'complete' && (
              <div className="text-center p-12">
                <div className="text-6xl mb-6">
                  {score >= 90 ? '🏆' : score >= 75 ? '⭐' : score >= 60 ? '👏' : '💪'}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">3D Room Rebuilt!</h3>
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">{score}%</div>
                <div className="text-lg text-gray-600 mb-4 bg-orange-50 p-4 rounded-lg">
                  <p>🎯 Placement Accuracy: {score}%</p>
                  <p>❌ Mistakes: {mistakes}</p>
                  <p className="mt-2 font-semibold">
                    {score >= 90 ? 'Perfect spatial memory and 3D perception!' : 
                     score >= 75 ? 'Excellent 3D visualization skills!' : 
                     score >= 60 ? 'Great spatial awareness!' :
                     'Keep training your 3D memory skills!'}
                  </p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-6">
                  <p className="text-orange-600 font-semibold">+{Math.floor(score / 10) + 20} XP Earned!</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={resetGame}
                    className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Rebuild Another Room
                  </button>
                  <button 
                    onClick={() => setCurrentScreen('dashboard')}
                    className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
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
  if (currentScreen === 'login') {
    return <LoginScreen />;
  }

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