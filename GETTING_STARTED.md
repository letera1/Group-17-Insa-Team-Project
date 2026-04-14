# Getting Started with Language Exchange Platform

Welcome! This guide will help you get up and running quickly.

## 🎯 Quick Navigation

- **New to the project?** Start with [What is this project?](#what-is-this-project)
- **Want to contribute?** See [Contributing](#contributing)
- **Setting up development?** Go to [Development Setup](#development-setup)
- **Deploying to production?** Check [Deployment](#deployment)
- **Need help?** Visit [Support](#support)

---

## What is this project?

The Language Exchange Platform is a full-stack web application that connects language learners worldwide through:

- 💬 **Real-time Chat** - Instant messaging with typing indicators
- 📹 **Video Calls** - High-quality 1-on-1 video conversations
- 👥 **Friend System** - Connect with language partners
- 🌍 **Language Matching** - Find speakers of your target language
- 🎨 **Beautiful UI** - 32 themes with responsive design

## Technology Stack

**Frontend:** React 19, Vite, TailwindCSS, Stream.io  
**Backend:** Node.js, Express, MongoDB, Socket.io  
**Real-time:** Stream Chat & Video SDKs

---

## Development Setup

### 1. Prerequisites

Install these first:
- [Node.js 18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Git](https://git-scm.com/)
- [Stream.io Account](https://getstream.io/) (free tier available)

### 2. Clone and Install

```bash
# Clone the repository
git clone https://github.com/letera1/Group-17-Insa-Team-Project.git
cd Group-17-Insa-Team-Project

# Install all dependencies
npm run install:all
```

### 3. Configure Environment

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

Required variables:
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET_KEY` - Random secret (32+ characters)
- `STEAM_API_KEY` - From Stream.io dashboard
- `STEAM_API_SECRET` - From Stream.io dashboard

**Frontend** (`frontend/.env`):
```bash
cd frontend
cp .env.example .env
# Edit .env with your values
```

Required variables:
- `VITE_STREAM_API_KEY` - Same as backend STEAM_API_KEY

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access the App

- Frontend: http://localhost:5173
- Backend API: http://localhost:5001

**Detailed setup instructions:** [docs/SETUP.md](docs/SETUP.md)

---

## Project Structure

```
language-exchange-platform/
├── backend/              # Node.js + Express API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database schemas
│   │   ├── routes/       # API endpoints
│   │   └── middleware/   # Auth & validation
│   └── uploads/          # User avatars
│
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── store/        # State management
│   │   └── lib/          # Utilities
│   └── public/           # Static assets
│
├── docs/                 # Documentation
├── .github/              # GitHub templates & workflows
└── [config files]        # Various configuration files
```

**Complete structure:** [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## Key Features Explained

### Authentication
- JWT-based authentication with HTTP-only cookies
- Secure password hashing with bcrypt
- Protected routes and middleware

### Chat System
- Powered by Stream Chat SDK
- Real-time messaging
- Typing indicators
- Message history
- Online/offline status

### Video Calls
- Powered by Stream Video SDK
- WebRTC-based connections
- Screen sharing support
- High-quality audio/video

### Friend System
- Send/receive friend requests
- Accept/reject requests
- Friends list management
- Real-time notifications

---

## Contributing

We welcome contributions! Here's how:

### 1. Fork and Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/Group-17-Insa-Team-Project.git
cd Group-17-Insa-Team-Project
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

- Follow the code style (Prettier + ESLint)
- Write meaningful commit messages
- Test your changes

### 4. Commit and Push

```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request

- Go to GitHub and create a PR
- Fill out the PR template
- Wait for review

**Full guidelines:** [CONTRIBUTING.md](CONTRIBUTING.md)

---

## Common Tasks

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Format Code

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Lint Code

```bash
cd frontend
npm run lint
```

### Build for Production

```bash
# Build frontend
cd frontend
npm run build

# Start backend in production
cd backend
npm start
```

---

## Deployment

### Quick Deploy Options

1. **Vercel (Frontend) + Railway (Backend)**
   - Easiest option
   - Free tier available
   - Automatic deployments

2. **Heroku**
   - Simple deployment
   - Free tier available
   - Good for small projects

3. **VPS (DigitalOcean, AWS, etc.)**
   - Full control
   - Best for production
   - Requires more setup

4. **Docker**
   - Containerized deployment
   - Consistent environments
   - Easy scaling

**Complete deployment guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

---

## API Overview

### Authentication Endpoints

```
POST   /api/auth/signup    - Create account
POST   /api/auth/login     - Login
POST   /api/auth/logout    - Logout
GET    /api/auth/me        - Get current user
```

### User Endpoints

```
GET    /api/users          - List users
GET    /api/users/:id      - Get user
PUT    /api/users/profile  - Update profile
POST   /api/users/avatar   - Upload avatar
```

### Friend Endpoints

```
POST   /api/friends/request     - Send request
GET    /api/friends/requests    - Get requests
PUT    /api/friends/:id/accept  - Accept request
PUT    /api/friends/:id/reject  - Reject request
GET    /api/friends             - Get friends
```

**Complete API reference:** [docs/API.md](docs/API.md)

---

## Troubleshooting

### Port Already in Use

```bash
# Find and kill process
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows
```

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
brew services list  # macOS
sudo systemctl status mongod  # Linux

# Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

- Ensure `.env` files exist (not `.env.example`)
- Restart servers after changing `.env`
- Check for syntax errors (no quotes needed)

**More solutions:** [docs/SETUP.md#troubleshooting](docs/SETUP.md#troubleshooting)

---

## Support

### Documentation

- [Setup Guide](docs/SETUP.md) - Development environment
- [API Docs](docs/API.md) - API reference
- [Architecture](docs/ARCHITECTURE.md) - System design
- [Deployment](docs/DEPLOYMENT.md) - Production setup

### Community

- 🐛 [Report Bugs](https://github.com/letera1/Group-17-Insa-Team-Project/issues)
- 💡 [Request Features](https://github.com/letera1/Group-17-Insa-Team-Project/issues)
- 💬 [Discussions](https://github.com/letera1/Group-17-Insa-Team-Project/discussions)
- 📧 Email: [support@yourproject.com]

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

---

## Security

Found a security vulnerability? Please report it responsibly:

- **DO NOT** create a public GitHub issue
- **DO** email [security@yourproject.com]
- See [SECURITY.md](SECURITY.md) for details

---

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

```
MIT License - Copyright (c) 2026 Group 17 INSA Team
```

---

## What's Next?

Now that you're set up:

1. ✅ Explore the codebase
2. ✅ Read the [Architecture docs](docs/ARCHITECTURE.md)
3. ✅ Check [open issues](https://github.com/letera1/Group-17-Insa-Team-Project/issues)
4. ✅ Make your first contribution!
5. ✅ Join our community

---

## Quick Links

| Resource | Link |
|----------|------|
| 📖 Main README | [README.md](README.md) |
| 🚀 Setup Guide | [docs/SETUP.md](docs/SETUP.md) |
| 📚 API Docs | [docs/API.md](docs/API.md) |
| 🏗️ Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 🚢 Deployment | [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) |
| 📁 Project Structure | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) |
| 🤝 Contributing | [CONTRIBUTING.md](CONTRIBUTING.md) |
| 🔒 Security | [SECURITY.md](SECURITY.md) |
| 📝 Changelog | [CHANGELOG.md](CHANGELOG.md) |

---

<div align="center">

**Happy Coding! 🎉**

Made with ❤️ by Group 17 INSA Team

[⬆ Back to Top](#getting-started-with-language-exchange-platform)

</div>
