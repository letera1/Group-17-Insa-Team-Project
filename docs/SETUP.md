# Development Setup Guide

Complete guide for setting up the Language Exchange Platform development environment.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

Before you begin, ensure you have the following installed:

#### 1. Node.js and npm

**Version Required:** Node.js 18.x or higher

**Installation:**

- **Windows/macOS**: Download from [nodejs.org](https://nodejs.org/)
- **Linux (Ubuntu/Debian)**:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```
- **macOS (Homebrew)**:
  ```bash
  brew install node
  ```

**Verify Installation:**
```bash
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher
```

#### 2. MongoDB

**Option A: Local Installation**

- **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- **macOS (Homebrew)**:
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```
- **Linux (Ubuntu)**:
  ```bash
  wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
  echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**

1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist your IP address
5. Get connection string

**Verify Installation (Local):**
```bash
mongosh  # Should connect to MongoDB shell
```

#### 3. Git

**Installation:**

- **Windows**: Download from [git-scm.com](https://git-scm.com/)
- **macOS**: `brew install git`
- **Linux**: `sudo apt-get install git`

**Verify Installation:**
```bash
git --version
```

#### 4. Stream.io Account

1. Sign up at [getstream.io](https://getstream.io/)
2. Create a new app
3. Get your API Key and Secret from the dashboard
4. Enable both Chat and Video products

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/letera1/Group-17-Insa-Team-Project.git
cd Group-17-Insa-Team-Project
```

### 2. Install Dependencies

**Option A: Install All at Once**
```bash
npm run install:all
```

**Option B: Install Separately**
```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

## Configuration

### 1. Backend Configuration

Create `backend/.env` file:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your values:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
# For local MongoDB:
MONGO_URI=mongodb://localhost:27017/language-exchange

# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/language-exchange?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-min-32-characters-long

# Stream.io Configuration
STEAM_API_KEY=your-stream-api-key-from-dashboard
STEAM_API_SECRET=your-stream-api-secret-from-dashboard

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

**Important Notes:**

- **JWT_SECRET_KEY**: Use a strong, random string (minimum 32 characters)
  ```bash
  # Generate a secure key:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **MONGO_URI**: Use your actual MongoDB connection string
- **STEAM_API_KEY/SECRET**: Get from Stream.io dashboard

### 2. Frontend Configuration

Create `frontend/.env` file:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
# Stream.io Configuration
VITE_STREAM_API_KEY=your-stream-api-key-from-dashboard

# API Configuration
VITE_API_URL=http://localhost:5001
```

**Important:** Use the same Stream API key as in backend configuration.

### 3. Verify Configuration

Check that all environment files are created:

```bash
# From project root
ls backend/.env
ls frontend/.env
```

---

## Running the Application

### Development Mode

#### Option 1: Run Both Servers Separately (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port 5001
MongoDB connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v6.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### Option 2: Run from Root

**Backend:**
```bash
npm run dev:backend
```

**Frontend:**
```bash
npm run dev:frontend
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **API Health Check**: http://localhost:5001/api/health

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production mode
cd ../backend
npm start
```

---

## Development Workflow

### Code Style

The project uses Prettier for code formatting:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Linting

```bash
# Frontend linting
cd frontend
npm run lint
```

### Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

### Git Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Create a Pull Request** on GitHub

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Port 5001 is already in use`

**Solution:**
```bash
# Find process using port
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

#### 2. MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**

- **Check if MongoDB is running:**
  ```bash
  # macOS
  brew services list
  
  # Linux
  sudo systemctl status mongod
  
  # Windows
  # Check Services app for MongoDB service
  ```

- **Start MongoDB:**
  ```bash
  # macOS
  brew services start mongodb-community
  
  # Linux
  sudo systemctl start mongod
  
  # Windows
  net start MongoDB
  ```

- **Verify connection string** in `backend/.env`

#### 3. Module Not Found

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Stream.io Connection Issues

**Error:** `Stream API key is invalid`

**Solutions:**

- Verify API key in both `backend/.env` and `frontend/.env`
- Check that Chat and Video products are enabled in Stream dashboard
- Ensure no extra spaces in environment variables

#### 5. CORS Errors

**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions:**

- Verify `FRONTEND_URL` in `backend/.env` matches frontend URL
- Check that backend is running on correct port
- Clear browser cache and restart both servers

#### 6. File Upload Errors

**Error:** `ENOENT: no such file or directory, open 'uploads/...'`

**Solution:**
```bash
# Create uploads directory
cd backend
mkdir -p uploads/avatars
```

#### 7. Environment Variables Not Loading

**Solutions:**

- Ensure `.env` files exist (not `.env.example`)
- Restart the development servers after changing `.env`
- Check for syntax errors in `.env` files (no quotes needed)
- Verify file is named exactly `.env` (not `.env.txt`)

### Getting Help

If you encounter issues not covered here:

1. **Check existing issues**: [GitHub Issues](https://github.com/letera1/Group-17-Insa-Team-Project/issues)
2. **Create a new issue**: Include error messages, environment details, and steps to reproduce
3. **Ask in discussions**: [GitHub Discussions](https://github.com/letera1/Group-17-Insa-Team-Project/discussions)

### Useful Commands

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB status
mongosh --eval "db.adminCommand('ping')"

# View backend logs
cd backend
npm run dev

# View frontend logs
cd frontend
npm run dev

# Clear npm cache
npm cache clean --force

# Reinstall all dependencies
npm run clean
npm run install:all
```

---

## Next Steps

After successful setup:

1. Read the [Contributing Guidelines](../CONTRIBUTING.md)
2. Check the [API Documentation](API.md)
3. Review the [Architecture Documentation](ARCHITECTURE.md)
4. Start building! 🚀

---

For deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).
