# Architecture Documentation

## System Overview

The Language Exchange Platform is a full-stack web application built with a modern tech stack, designed to connect language learners through real-time chat and video communication.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React 19 + Vite + TailwindCSS + DaisyUI             │   │
│  │  - Component-based UI                                 │   │
│  │  - State Management (Zustand)                         │   │
│  │  - Data Fetching (TanStack Query)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/WSS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Node.js + Express.js                                 │   │
│  │  - RESTful API                                        │   │
│  │  - WebSocket (Socket.io)                              │   │
│  │  - Authentication Middleware                          │   │
│  │  - File Upload Handling                               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│   MongoDB    │   │  Stream.io   │   │ File Storage │
│   Database   │   │  Chat/Video  │   │   (Local)    │
└──────────────┘   └──────────────┘   └──────────────┘
```

## Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 19.0.0 |
| Vite | Build Tool | 6.3.1 |
| TailwindCSS | Styling | 3.4.17 |
| DaisyUI | Component Library | 4.12.24 |
| React Router | Routing | 7.5.1 |
| TanStack Query | Data Fetching | 5.74.4 |
| Zustand | State Management | 5.0.3 |
| Stream Video SDK | Video Calls | 1.14.4 |
| Stream Chat React | Chat UI | 12.14.0 |
| Axios | HTTP Client | 1.11.0 |
| Socket.io Client | WebSocket | 4.8.1 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| Node.js | Runtime | 18+ |
| Express.js | Web Framework | 4.21.2 |
| MongoDB | Database | 8.13.2 |
| Mongoose | ODM | 8.13.2 |
| JWT | Authentication | 9.0.2 |
| Bcrypt | Password Hashing | 3.0.2 |
| Socket.io | WebSocket | 4.8.1 |
| Multer | File Upload | 2.0.2 |
| Stream Chat | Chat Backend | 8.60.0 |

## Directory Structure

```
language-exchange-platform/
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/             # CI/CD workflows
│       └── ci.yml
├── backend/                   # Backend application
│   ├── src/
│   │   ├── controllers/      # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   ├── middleware/       # Express middleware
│   │   │   └── auth.middleware.js
│   │   ├── models/          # Database models
│   │   │   ├── User.js
│   │   │   └── FriendRequest.js
│   │   ├── routes/          # API routes
│   │   ├── lib/             # Utilities
│   │   │   ├── db.js
│   │   │   └── stream.js
│   │   └── server.js        # Entry point
│   ├── uploads/             # File uploads
│   ├── .env.example
│   └── package.json
├── frontend/                 # Frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # State management
│   │   ├── lib/            # Utilities
│   │   ├── constants/      # Constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/             # Static assets
│   ├── .env.example
│   └── package.json
├── docs/                    # Documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CHANGELOG.md
├── LICENSE
├── README.md
└── package.json
```

## Data Flow

### Authentication Flow

```
1. User submits credentials
   ↓
2. Frontend sends POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Backend generates JWT token
   ↓
5. Token stored in HTTP-only cookie
   ↓
6. Frontend receives user data
   ↓
7. User redirected to dashboard
```

### Chat Flow

```
1. User opens chat with friend
   ↓
2. Frontend requests Stream token
   ↓
3. Backend generates Stream user token
   ↓
4. Frontend connects to Stream Chat
   ↓
5. Messages sync in real-time
   ↓
6. Typing indicators via Stream
```

### Video Call Flow

```
1. User initiates call
   ↓
2. Frontend creates Stream call
   ↓
3. Notification sent via Socket.io
   ↓
4. Recipient receives call notification
   ↓
5. Both users join Stream video call
   ↓
6. WebRTC connection established
```

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  fullName: String (required),
  profilePicture: String,
  nativeLanguage: String,
  learningLanguage: String,
  location: String,
  bio: String,
  streamUserId: String,
  friends: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### FriendRequest Model

```javascript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  recipient: ObjectId (ref: User),
  status: String (enum: ['pending', 'accepted', 'rejected']),
  createdAt: Date,
  updatedAt: Date
}
```

## API Architecture

### RESTful Endpoints

```
Authentication:
POST   /api/auth/signup      - Create new account
POST   /api/auth/login       - Authenticate user
POST   /api/auth/logout      - End session
GET    /api/auth/me          - Get current user

Users:
GET    /api/users            - List all users
GET    /api/users/:id        - Get user by ID
PUT    /api/users/profile    - Update profile
POST   /api/users/avatar     - Upload avatar

Friends:
POST   /api/friends/request  - Send friend request
GET    /api/friends/requests - Get pending requests
PUT    /api/friends/:id/accept - Accept request
PUT    /api/friends/:id/reject - Reject request
GET    /api/friends          - Get friends list

Chat:
GET    /api/chat/token       - Get Stream token
```

### WebSocket Events

```
Connection:
- connect
- disconnect

Friend Requests:
- friend_request_received
- friend_request_accepted
- friend_request_rejected

Presence:
- user_online
- user_offline
```

## Security Architecture

### Authentication

- **JWT Tokens**: Stateless authentication
- **HTTP-only Cookies**: XSS protection
- **Bcrypt**: Password hashing (10 rounds)
- **Token Expiration**: 7 days

### Authorization

- **Middleware**: Protects routes
- **User Context**: Attached to requests
- **Resource Ownership**: Verified per request

### Data Protection

- **Input Validation**: All user inputs
- **SQL Injection**: Prevented by Mongoose
- **XSS Protection**: React escaping
- **CORS**: Configured for specific origins
- **Rate Limiting**: Prevents abuse

## Performance Considerations

### Frontend Optimization

- **Code Splitting**: Route-based
- **Lazy Loading**: Components on demand
- **Image Optimization**: Compressed uploads
- **Caching**: TanStack Query
- **Bundle Size**: Tree shaking with Vite

### Backend Optimization

- **Database Indexing**: On frequently queried fields
- **Connection Pooling**: MongoDB connections
- **Compression**: Gzip responses
- **Caching**: Consider Redis for sessions
- **CDN**: Static assets

## Scalability

### Horizontal Scaling

- **Stateless Backend**: Can run multiple instances
- **Load Balancing**: Nginx or cloud load balancer
- **Session Storage**: Move to Redis
- **File Storage**: Move to S3 or CDN

### Database Scaling

- **Indexing**: Optimize queries
- **Replica Sets**: Read scaling
- **Sharding**: For large datasets
- **Caching**: Redis for hot data

## Monitoring & Logging

### Application Monitoring

- **Error Tracking**: Sentry (recommended)
- **Performance**: New Relic or Datadog
- **Uptime**: UptimeRobot
- **Logs**: Winston or Pino

### Metrics to Track

- **Response Times**: API latency
- **Error Rates**: 4xx and 5xx errors
- **User Activity**: Active users
- **Database Performance**: Query times
- **Resource Usage**: CPU, memory, disk

## Deployment Architecture

### Production Setup

```
┌─────────────────────────────────────────┐
│           Load Balancer (Nginx)         │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────┐        ┌──────────────┐
│  Backend     │        │  Backend     │
│  Instance 1  │        │  Instance 2  │
└──────────────┘        └──────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌───────────────────────┐
        │   MongoDB Cluster     │
        │   (Replica Set)       │
        └───────────────────────┘
```

### CI/CD Pipeline

```
1. Code Push to GitHub
   ↓
2. GitHub Actions Triggered
   ↓
3. Run Tests & Linting
   ↓
4. Build Application
   ↓
5. Deploy to Staging
   ↓
6. Run E2E Tests
   ↓
7. Deploy to Production
```

## Future Enhancements

### Planned Features

- **Multi-language UI**: i18n support
- **Advanced Matching**: ML-based partner suggestions
- **Group Calls**: 3+ participants
- **Progress Tracking**: Learning analytics
- **Scheduled Sessions**: Calendar integration
- **Mobile Apps**: React Native
- **Payment Integration**: Premium features

### Technical Improvements

- **TypeScript**: Type safety
- **GraphQL**: Alternative to REST
- **Microservices**: Service separation
- **Kubernetes**: Container orchestration
- **Redis**: Caching layer
- **Elasticsearch**: Advanced search

---

For more information, see:
- [API Documentation](API.md)
- [Deployment Guide](DEPLOYMENT.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
