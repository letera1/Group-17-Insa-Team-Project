# Project Structure

Complete overview of the Language Exchange Platform file organization.

## Root Directory

```
language-exchange-platform/
├── .github/                      # GitHub specific files
├── backend/                      # Backend application
├── frontend/                     # Frontend application
├── docs/                         # Documentation
├── .editorconfig                 # Editor configuration
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── .prettierrc                   # Prettier configuration
├── .prettierignore               # Prettier ignore rules
├── CHANGELOG.md                  # Version history
├── CODE_OF_CONDUCT.md           # Community guidelines
├── CONTRIBUTING.md              # Contribution guidelines
├── CONTRIBUTORS.md              # Contributors list
├── LICENSE                      # MIT License
├── package.json                 # Root package configuration
├── PROJECT_STRUCTURE.md         # This file
├── README.md                    # Main documentation
└── SECURITY.md                  # Security policy
```

## GitHub Configuration (`.github/`)

```
.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md           # Bug report template
│   └── feature_request.md      # Feature request template
├── workflows/
│   └── ci.yml                  # CI/CD pipeline
└── PULL_REQUEST_TEMPLATE.md    # PR template
```

## Backend Structure (`backend/`)

```
backend/
├── src/
│   ├── controllers/            # Request handlers
│   │   ├── auth.controller.js      # Authentication logic
│   │   ├── chat.controller.js      # Chat functionality
│   │   └── user.controller.js      # User management
│   │
│   ├── middleware/             # Express middleware
│   │   └── auth.middleware.js      # JWT authentication
│   │
│   ├── models/                 # Database schemas
│   │   ├── User.js                 # User model
│   │   └── FriendRequest.js        # Friend request model
│   │
│   ├── routes/                 # API routes
│   │   ├── auth.routes.js          # Auth endpoints
│   │   ├── user.routes.js          # User endpoints
│   │   ├── friend.routes.js        # Friend endpoints
│   │   └── chat.routes.js          # Chat endpoints
│   │
│   ├── lib/                    # Utilities and helpers
│   │   ├── db.js                   # Database connection
│   │   └── stream.js               # Stream.io setup
│   │
│   └── server.js               # Application entry point
│
├── uploads/                    # File uploads directory
│   └── avatars/                    # User profile pictures
│
├── node_modules/               # Dependencies (git ignored)
├── .env                        # Environment variables (git ignored)
├── .env.example                # Environment template
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
└── README.md                   # Backend documentation
```

### Backend File Purposes

| File | Purpose |
|------|---------|
| `server.js` | Express app setup, middleware, routes |
| `controllers/*.js` | Business logic for each feature |
| `middleware/auth.middleware.js` | JWT token verification |
| `models/*.js` | Mongoose schemas and models |
| `routes/*.js` | API endpoint definitions |
| `lib/db.js` | MongoDB connection setup |
| `lib/stream.js` | Stream.io client initialization |

## Frontend Structure (`frontend/`)

```
frontend/
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── CallButton.jsx          # Video call button
│   │   ├── ChatLoader.jsx          # Chat loading state
│   │   ├── Footer.jsx              # Page footer
│   │   ├── FriendCard.jsx          # Friend list item
│   │   ├── Layout.jsx              # Page layout wrapper
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── NoFriendsFound.jsx      # Empty state
│   │   ├── NoNotificationsFound.jsx # Empty state
│   │   ├── NotificationPopup.jsx   # Notification UI
│   │   ├── PageLoader.jsx          # Page loading state
│   │   ├── PasswordStrengthIndicator.jsx # Password validation
│   │   ├── ProfileEditModal.jsx    # Profile editor
│   │   ├── Sidebar.jsx             # Navigation sidebar
│   │   └── ThemeSelector.jsx       # Theme switcher
│   │
│   ├── pages/                  # Page components
│   │   ├── CallPage.jsx            # Video call interface
│   │   ├── ChatPage.jsx            # Chat interface
│   │   ├── FreindPage.jsx          # Friends list
│   │   ├── HomePage.jsx            # Dashboard
│   │   ├── LoginPage.jsx           # Login form
│   │   ├── NotificationsPage.jsx   # Notifications
│   │   ├── OnboardingPage.jsx      # Profile setup
│   │   └── SignUpPage.jsx          # Registration form
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuthUser.js          # Get current user
│   │   ├── useFriendRequestNotifications.js # Friend notifications
│   │   ├── useLogin.js             # Login logic
│   │   ├── useLogout.js            # Logout logic
│   │   └── useSignUp.js            # Registration logic
│   │
│   ├── store/                  # State management (Zustand)
│   │   ├── useNotificationStore.js # Notification state
│   │   └── useThemeStore.js        # Theme state
│   │
│   ├── lib/                    # Utilities and helpers
│   │   ├── api.js                  # API functions
│   │   ├── axios.js                # Axios configuration
│   │   ├── imageUtils.js           # Image processing
│   │   ├── notificationAudio.js    # Sound effects
│   │   └── utils.js                # General utilities
│   │
│   ├── constants/              # Application constants
│   │   └── index.js                # Constant definitions
│   │
│   ├── public/                 # Public assets
│   │   ├── img.png
│   │   └── logo.png
│   │
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Application entry
│   └── index.css               # Global styles
│
├── public/                     # Static assets
│   ├── favicon.ico
│   └── *.png                       # Various images
│
├── dist/                       # Build output (git ignored)
├── node_modules/               # Dependencies (git ignored)
├── .env                        # Environment variables (git ignored)
├── .env.example                # Environment template
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML template
├── package.json                # Dependencies and scripts
├── package-lock.json           # Dependency lock file
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # Frontend documentation
```

### Frontend File Purposes

| File/Folder | Purpose |
|-------------|---------|
| `components/` | Reusable UI components |
| `pages/` | Full page components (routes) |
| `hooks/` | Custom React hooks for logic reuse |
| `store/` | Global state management |
| `lib/` | Utility functions and configurations |
| `constants/` | Application-wide constants |
| `App.jsx` | Main app component with routing |
| `main.jsx` | React app initialization |
| `index.css` | Global CSS and Tailwind imports |

## Documentation (`docs/`)

```
docs/
├── API.md                      # API reference
├── ARCHITECTURE.md             # System architecture
├── DEPLOYMENT.md               # Deployment guide
└── SETUP.md                    # Development setup
```

## Configuration Files

### Root Level

| File | Purpose |
|------|---------|
| `.editorconfig` | Consistent editor settings |
| `.prettierrc` | Code formatting rules |
| `.prettierignore` | Files to skip formatting |
| `.gitignore` | Files to exclude from Git |
| `package.json` | Project metadata and scripts |

### Backend

| File | Purpose |
|------|---------|
| `.env` | Environment variables (not in Git) |
| `.env.example` | Environment template |
| `package.json` | Backend dependencies |

### Frontend

| File | Purpose |
|------|---------|
| `.env` | Environment variables (not in Git) |
| `.env.example` | Environment template |
| `eslint.config.js` | Linting rules |
| `tailwind.config.js` | Tailwind CSS configuration |
| `vite.config.js` | Vite build configuration |
| `postcss.config.js` | PostCSS plugins |
| `package.json` | Frontend dependencies |

## Key Directories Explained

### `/backend/src/controllers/`
Contains business logic for handling requests. Each controller manages a specific feature domain (auth, users, chat, etc.).

### `/backend/src/models/`
Mongoose schemas defining the structure of MongoDB documents. Includes validation, indexes, and methods.

### `/backend/src/routes/`
Express route definitions that map HTTP endpoints to controller functions.

### `/backend/src/middleware/`
Express middleware for cross-cutting concerns like authentication, error handling, and logging.

### `/frontend/src/components/`
Reusable React components that can be used across multiple pages. Should be generic and configurable via props.

### `/frontend/src/pages/`
Full-page components that correspond to routes. These compose smaller components to create complete views.

### `/frontend/src/hooks/`
Custom React hooks that encapsulate reusable logic. Follow the `use*` naming convention.

### `/frontend/src/store/`
Zustand stores for global state management. Each store manages a specific slice of application state.

### `/frontend/src/lib/`
Utility functions, API clients, and helper modules used throughout the application.

## File Naming Conventions

### Backend
- **Controllers**: `*.controller.js` (e.g., `auth.controller.js`)
- **Models**: PascalCase (e.g., `User.js`, `FriendRequest.js`)
- **Routes**: `*.routes.js` (e.g., `auth.routes.js`)
- **Middleware**: `*.middleware.js` (e.g., `auth.middleware.js`)
- **Utilities**: camelCase (e.g., `db.js`, `stream.js`)

### Frontend
- **Components**: PascalCase (e.g., `Navbar.jsx`, `FriendCard.jsx`)
- **Pages**: PascalCase with `Page` suffix (e.g., `HomePage.jsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.js`)
- **Stores**: camelCase with `Store` suffix (e.g., `useThemeStore.js`)
- **Utilities**: camelCase (e.g., `utils.js`, `api.js`)

## Important Files to Never Commit

These files should always be in `.gitignore`:

```
# Environment variables
.env
.env.local
.env.*.local

# Dependencies
node_modules/
package-lock.json (optional)

# Build outputs
dist/
build/
.next/

# Uploads
uploads/
*.log

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

## Adding New Features

When adding a new feature, follow this structure:

### Backend
1. Create model in `models/` if needed
2. Create controller in `controllers/`
3. Create routes in `routes/`
4. Add middleware if needed
5. Update API documentation

### Frontend
1. Create components in `components/`
2. Create page in `pages/` if needed
3. Create custom hooks in `hooks/` if needed
4. Add to routing in `App.jsx`
5. Update state management if needed

## Best Practices

1. **Keep components small** - Each component should do one thing well
2. **Reuse code** - Extract common logic into hooks or utilities
3. **Follow naming conventions** - Consistent naming improves readability
4. **Document complex logic** - Add comments for non-obvious code
5. **Keep files organized** - Put files in appropriate directories
6. **Avoid deep nesting** - Keep directory structure flat when possible
7. **Use absolute imports** - Configure path aliases for cleaner imports

---

For more information, see:
- [Architecture Documentation](docs/ARCHITECTURE.md)
- [Setup Guide](docs/SETUP.md)
- [Contributing Guidelines](CONTRIBUTING.md)
