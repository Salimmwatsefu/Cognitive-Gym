# 🧠 Cognitive Gym - Brain Training for Seniors

**A modern, immersive digital platform designed to promote brain health and cognitive longevity using VR-style experiences for seniors.**

![Cognitive Gym Dashboard](https://images.unsplash.com/photo-1716896495108-14fb4c283e10)

## 🌟 Features

### 🎮 Four Cognitive Training Games

1. **🗺️ Maze Path Recall** - Spatial/Visual Memory
   - Navigate through enhanced mazes with guaranteed paths to completion
   - Memory challenge: retrace your exact path from memory
   - Adaptive difficulty based on user level

2. **🌳 Word Tree** - Language/Verbal Skills
   - Catch slowly falling words to complete synonym trees
   - Fixed flickering issues with stable root word display
   - Enhanced visual feedback and progress tracking

3. **🎵 Rhythm Reach** - VR-Style Cognitive-Motor Integration
   - Tap larger, slower-moving 3D orbs in virtual space
   - Easier math challenges integrated mid-game
   - Perfect for seniors with larger targets and slower pace

4. **🏠 Room Rebuild** - Enhanced 3D Spatial Memory
   - Study isometric 3D room layouts with realistic furniture
   - Position markers placed beside locations for easier use
   - Improved graphics with true depth perception

### 🔐 Authentication System
- Mock authentication with localStorage persistence
- User profiles with progress tracking
- Level system with XP rewards
- Secure logout functionality

### 📊 Progress Tracking
- **Level System**: Gain XP and level up based on performance
- **Comprehensive Stats**: Track completions, average scores, and streaks
- **Local Storage**: All progress saved locally for persistence
- **Achievement System**: Star ratings based on game completions

### 🎨 Senior-Friendly Design
- **Large, readable fonts** (18px+ on desktop)
- **High contrast colors** with accessibility support
- **Intuitive navigation** with clear visual cues
- **Calming nature-inspired color palette**
- **Big clickable areas** (minimum 44px touch targets)
- **Smooth, gentle animations** that aren't overwhelming

## 🚀 Local Development Setup (WSL2)

### Prerequisites

Make sure you have the following installed in your WSL2 environment:

```bash
# Update your WSL2 system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+ (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Yarn package manager
npm install -g yarn

# Verify installations
node --version    # Should be v18+
yarn --version    # Should be 1.22+
```

### 📥 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cognitive-gym
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   yarn install
   ```

3. **Environment Setup**
   
   The app uses environment variables for configuration. Check that `.env` exists in the frontend directory:
   ```bash
   # Frontend environment (frontend/.env)
   WDS_SOCKET_PORT=443
   REACT_APP_BACKEND_URL=http://localhost:3000
   ```

### 🏃 Running the Application

#### Option 1: Development Mode (Recommended)

1. **Start the frontend development server**
   ```bash
   cd frontend
   yarn start
   ```

2. **Access the application**
   - Open your browser and navigate to: `http://localhost:3000`
   - The app will automatically reload when you make changes

#### Option 2: Production Build

1. **Build the application**
   ```bash
   cd frontend
   yarn build
   ```

2. **Serve the built application**
   ```bash
   # Install a simple HTTP server
   npm install -g serve
   
   # Serve the built app
   serve -s build -l 3000
   ```

### 🐛 Troubleshooting

#### Common WSL2 Issues

1. **Port not accessible from Windows host**
   ```bash
   # Check if WSL2 is using the correct networking mode
   # In Windows PowerShell (as Administrator):
   netsh interface portproxy show all
   
   # If needed, add port forwarding:
   netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<WSL2-IP>
   ```

2. **Node.js permission issues**
   ```bash
   # Fix npm/yarn global permissions
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Memory issues with large builds**
   ```bash
   # Increase Node.js memory limit
   export NODE_OPTIONS="--max-old-space-size=4096"
   ```

#### Browser Access Issues

1. **Can't access from Windows browser**
   - Try: `http://localhost:3000`
   - Alternative: `http://127.0.0.1:3000`
   - If still not working, use WSL2 IP: `http://<WSL2-IP>:3000`

2. **Find your WSL2 IP address**
   ```bash
   ip addr show eth0 | grep "inet\b" | awk '{print $2}' | cut -d/ -f1
   ```

### 🔧 Development Commands

```bash
# Install new dependencies
yarn add <package-name>

# Install development dependencies
yarn add -D <package-name>

# Run linting
yarn lint

# Run tests (if available)
yarn test

# Build for production
yarn build

# Analyze bundle size
yarn build && npx source-map-explorer 'build/static/js/*.js'
```

### 📱 Testing on Mobile Devices

1. **Find your WSL2 IP address**
   ```bash
   hostname -I | awk '{print $1}'
   ```

2. **Make sure Windows Firewall allows the connection**
   - Add an inbound rule for port 3000
   - Or temporarily disable Windows Firewall for testing

3. **Access from mobile device**
   - Connect mobile device to same network as your computer
   - Navigate to: `http://<WSL2-IP>:3000`

### 🔒 Security Notes

- This is a development setup with mock authentication
- Data is stored in browser localStorage only
- For production deployment, implement proper backend authentication
- Use HTTPS for production deployments

### 📚 Project Structure

```
cognitive-gym/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   │   ├── App.js          # Main application component
│   │   ├── App.css         # Application styles
│   │   └── index.js        # Entry point
│   ├── package.json        # Dependencies and scripts
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── .env               # Environment variables
├── tests/                   # Test files
├── scripts/                # Utility scripts
└── README.md              # This file
```

### 🎯 Development Tips

1. **Hot Reload**: The development server supports hot reload - changes are reflected immediately
2. **Browser DevTools**: Use React Developer Tools for debugging
3. **Console Logs**: Check browser console for any runtime errors
4. **Network Tab**: Monitor API calls (currently all mock data)
5. **Responsive Design**: Test on different screen sizes using browser DevTools

### 🆘 Need Help?

1. **Check the browser console** for error messages
2. **Verify all dependencies** are installed correctly
3. **Ensure proper Node.js version** (18+ recommended)
4. **Check WSL2 networking** if accessing from Windows browser
5. **Clear browser cache** if seeing stale content

---

## 🎮 Game Instructions

### Getting Started
1. **Login/Signup**: Use any email or click "Continue as Demo User"
2. **Dashboard**: View your progress and select games
3. **Play Games**: Each game has its own tutorial
4. **Track Progress**: Earn XP, level up, and build streaks!

### Game Tips
- **Maze Path Recall**: Take your time during navigation, the path is guaranteed to reach the end
- **Word Tree**: Words fall slowly - you have plenty of time to click them
- **Rhythm Reach**: Large orbs make clicking easy, math questions are simple addition/subtraction
- **Room Rebuild**: Use the orange position markers beside the intended locations

Enjoy your brain training journey! 🧠✨