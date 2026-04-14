# Pre-Commit Checklist

Use this checklist before committing code to ensure CI/CD pipeline passes.

## ✅ Code Quality Checks

### 1. Run Linter
```bash
# Frontend
cd frontend
npm run lint

# Expected: No errors or warnings
```

### 2. Run Tests (if available)
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### 3. Check Code Formatting
```bash
# From root directory
npm run format:check

# Or auto-fix formatting
npm run format
```

### 4. Build Check
```bash
# Frontend build
cd frontend
npm run build

# Should complete without errors
```

## 🚫 Common Issues to Avoid

### ESLint Errors

#### ❌ Unused Variables
```javascript
// BAD
const hideFooter = true; // Never used

// GOOD
// Remove unused variables or use them
```

#### ❌ Unnecessary Regex Escapes
```javascript
// BAD
/\[/  // Unnecessary escape

// GOOD
/[/   // No escape needed in character class
```

#### ❌ Unused Destructured Variables
```javascript
// BAD
const [_, value] = array;

// GOOD
const [, value] = array;  // Use comma to skip
```

### React Warnings

#### ⚠️ Fast Refresh Issues
```javascript
// BAD - Exporting non-component from component file
export const MyComponent = () => {...};
export const helperFunction = () => {...};

// GOOD - Keep helpers in same file but not exported
const helperFunction = () => {...};
export const MyComponent = () => {...};

// BETTER - Move helpers to separate file
// utils/helpers.js
export const helperFunction = () => {...};
```

## 🔧 Quick Fixes

### Fix All Formatting Issues
```bash
npm run format
```

### Fix Auto-fixable ESLint Issues
```bash
cd frontend
npx eslint . --fix
```

### Clear Cache and Reinstall
```bash
# If you encounter weird errors
rm -rf node_modules package-lock.json
npm install
```

## 📋 Before Creating PR

- [ ] All linter checks pass
- [ ] All tests pass (if applicable)
- [ ] Code is properly formatted
- [ ] Build completes successfully
- [ ] No console.log or debugging code left
- [ ] Environment variables are not hardcoded
- [ ] Sensitive data is not committed
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

## 🎯 Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### Examples
```bash
git commit -m "feat(auth): add password reset functionality"
git commit -m "fix(chat): resolve message ordering issue"
git commit -m "docs: update API documentation"
```

## 🚀 CI/CD Pipeline Jobs

Your commit will trigger these checks:

1. **Backend Tests** (Node 18.x, 20.x)
   - Install dependencies
   - Run linter
   - Run tests

2. **Frontend Tests** (Node 18.x, 20.x)
   - Install dependencies
   - Run linter
   - Run tests
   - Build application

3. **Security Audit**
   - Check for vulnerable dependencies
   - Run npm audit

4. **Code Quality Check**
   - Check code formatting
   - Run linter

5. **Build Check**
   - Build entire project
   - Upload artifacts

## 💡 Tips

### Enable Auto-formatting in VS Code

Add to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Use Git Hooks

Install husky for automatic checks:
```bash
npm install --save-dev husky lint-staged
npx husky install
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "*.{js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

### Quick Commands

```bash
# Check everything before commit
npm run lint && npm run format:check && npm run build

# Fix everything automatically
npm run format && cd frontend && npx eslint . --fix
```

## 📞 Need Help?

- Check [ESLint Fixes](ESLINT_FIXES.md) for common solutions
- Review [Contributing Guidelines](../CONTRIBUTING.md)
- Ask in [GitHub Discussions](https://github.com/letera1/Group-17-Insa-Team-Project/discussions)

---

**Remember**: It's easier to fix issues locally than to wait for CI/CD to fail! 🎯
