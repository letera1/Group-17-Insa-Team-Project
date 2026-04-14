# Contributing to Language Exchange Platform

First off, thank you for considering contributing to the Language Exchange Platform! It's people like you that make this platform a great tool for language learners worldwide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if possible**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternative solutions you've considered**

### Your First Code Contribution

Unsure where to begin? You can start by looking through `beginner` and `help-wanted` issues:

- **Beginner issues** - issues which should only require a few lines of code
- **Help wanted issues** - issues which should be a bit more involved

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes
4. Make sure your code lints
5. Update documentation as needed
6. Issue the pull request!

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Stream.io account (for chat and video features)

### Installation

1. **Clone your fork of the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Group-17-Insa-Team-Project.git
   cd Group-17-Insa-Team-Project
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in both `backend` and `frontend` directories:
   
   **Backend `.env`:**
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   STEAM_API_KEY=your_stream_api_key
   STEAM_API_SECRET=your_stream_api_secret
   JWT_SECRET_KEY=your_jwt_secret_key
   NODE_ENV=development
   ```
   
   **Frontend `.env`:**
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```

4. **Run the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## Pull Request Process

1. **Update the README.md** with details of changes if applicable
2. **Update documentation** for any new features or API changes
3. **Follow the coding standards** outlined below
4. **Ensure all tests pass** before submitting
5. **Request review** from at least one maintainer
6. **Address review comments** promptly and professionally
7. **Squash commits** if requested before merging

### PR Title Format

Use conventional commit format for PR titles:
- `feat: add new language matching algorithm`
- `fix: resolve video call connection issue`
- `docs: update API documentation`
- `style: format code with prettier`
- `refactor: restructure authentication flow`
- `test: add unit tests for chat controller`
- `chore: update dependencies`

## Coding Standards

### JavaScript/React

- Use **ES6+ syntax**
- Follow **functional programming** principles where possible
- Use **meaningful variable and function names**
- Keep functions **small and focused** (single responsibility)
- Add **JSDoc comments** for complex functions
- Use **async/await** instead of promises chains

### Code Style

- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Required
- **Line length**: Maximum 100 characters
- **Trailing commas**: Required in multi-line objects/arrays

### React Specific

- Use **functional components** with hooks
- Keep components **small and reusable**
- Use **custom hooks** for shared logic
- Implement **proper error boundaries**
- Use **PropTypes** or TypeScript for type checking
- Follow **React best practices** for performance

### Backend Specific

- Use **async/await** for asynchronous operations
- Implement **proper error handling** with try-catch
- Use **middleware** for cross-cutting concerns
- Follow **RESTful API** conventions
- Validate **all user inputs**
- Use **environment variables** for configuration

### File Naming

- **Components**: PascalCase (e.g., `UserProfile.jsx`)
- **Utilities**: camelCase (e.g., `formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.js`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useAuth.js`)

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Code style changes (formatting, missing semicolons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```
feat(auth): add password reset functionality

Implement password reset flow with email verification.
Users can now request a password reset link via email.

Closes #123
```

```
fix(chat): resolve message ordering issue

Messages were displaying in incorrect order due to
timestamp comparison bug. Fixed by using proper date
comparison.

Fixes #456
```

## Testing

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Writing Tests

- Write **unit tests** for utilities and helpers
- Write **integration tests** for API endpoints
- Write **component tests** for React components
- Aim for **80%+ code coverage**
- Test **edge cases** and error scenarios

## Documentation

- Update **README.md** for user-facing changes
- Update **API documentation** for backend changes
- Add **inline comments** for complex logic
- Update **JSDoc comments** for function changes
- Create **migration guides** for breaking changes

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers directly.

## Recognition

Contributors will be recognized in our [Contributors](CONTRIBUTORS.md) file and in release notes.

Thank you for contributing! 🎉
