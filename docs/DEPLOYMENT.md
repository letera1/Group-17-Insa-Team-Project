# Deployment Guide

This guide covers deploying the Language Exchange Platform to production environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Options](#deployment-options)
- [Database Setup](#database-setup)
- [Security Checklist](#security-checklist)
- [Monitoring](#monitoring)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ Node.js 18+ installed
- ✅ MongoDB database (Atlas or self-hosted)
- ✅ Stream.io account with API credentials
- ✅ Domain name (optional but recommended)
- ✅ SSL certificate (for HTTPS)
- ✅ Server or hosting platform account

---

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5001
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/language-exchange?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET_KEY=your-super-secret-jwt-key-change-this-in-production

# Stream.io
STEAM_API_KEY=your-stream-api-key
STEAM_API_SECRET=your-stream-api-secret

# CORS
FRONTEND_URL=https://yourdomain.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Stream.io
VITE_STREAM_API_KEY=your-stream-api-key

# API URL
VITE_API_URL=https://api.yourdomain.com
```

---

## Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

#### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Certbot (for SSL)
sudo apt install -y certbot python3-certbot-nginx
```

#### 2. Clone and Build

```bash
# Clone repository
git clone https://github.com/yourusername/language-exchange-platform.git
cd language-exchange-platform

# Install and build
npm run build
```

#### 3. Configure PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'language-exchange-backend',
    cwd: './backend',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5001
    }
  }]
};
```

Start the application:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 4. Configure Nginx

Create `/etc/nginx/sites-available/language-exchange`:

```nginx
# Backend API
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/language-exchange/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/language-exchange /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 5. Setup SSL

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com
```

---

### Option 2: Heroku

#### 1. Install Heroku CLI

```bash
npm install -g heroku
heroku login
```

#### 2. Create Heroku Apps

```bash
# Create backend app
heroku create your-app-backend

# Create frontend app (optional, can use Vercel/Netlify instead)
heroku create your-app-frontend
```

#### 3. Configure Backend

Add `Procfile` in backend directory:

```
web: node src/server.js
```

Set environment variables:

```bash
heroku config:set NODE_ENV=production -a your-app-backend
heroku config:set MONGO_URI=your-mongodb-uri -a your-app-backend
heroku config:set JWT_SECRET_KEY=your-secret -a your-app-backend
heroku config:set STEAM_API_KEY=your-key -a your-app-backend
heroku config:set STEAM_API_SECRET=your-secret -a your-app-backend
```

#### 4. Deploy

```bash
# Backend
cd backend
git init
heroku git:remote -a your-app-backend
git add .
git commit -m "Deploy backend"
git push heroku main
```

---

### Option 3: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
cd frontend
vercel --prod
```

3. Set environment variables in Vercel dashboard

#### Backend on Railway

1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add environment variables
4. Deploy automatically on push

---

### Option 4: Docker

#### 1. Create Dockerfiles

**Backend Dockerfile:**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5001

CMD ["node", "src/server.js"]
```

**Frontend Dockerfile:**

```dockerfile
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 2. Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
      - MONGO_URI=${MONGO_URI}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      - STEAM_API_KEY=${STEAM_API_KEY}
      - STEAM_API_SECRET=${STEAM_API_SECRET}
    depends_on:
      - mongodb
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
```

#### 3. Deploy

```bash
docker-compose up -d
```

---

## Database Setup

### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (or allow from anywhere for development)
5. Get connection string
6. Update `MONGO_URI` in environment variables

### Self-Hosted MongoDB

```bash
# Install MongoDB
sudo apt install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
> use language_exchange
> db.createUser({
    user: "admin",
    pwd: "secure_password",
    roles: ["readWrite", "dbAdmin"]
  })
```

---

## Security Checklist

Before going to production:

### Environment

- [ ] All environment variables are set correctly
- [ ] No sensitive data in code or version control
- [ ] `.env` files are in `.gitignore`
- [ ] Strong JWT secret key (32+ characters)
- [ ] Database credentials are secure

### Application

- [ ] HTTPS is enabled (SSL certificate)
- [ ] CORS is configured for production domain only
- [ ] Rate limiting is enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection protection (using Mongoose)
- [ ] XSS protection enabled
- [ ] CSRF protection for state-changing operations
- [ ] Secure HTTP headers (helmet.js)

### Database

- [ ] MongoDB authentication enabled
- [ ] Database firewall rules configured
- [ ] Regular backups scheduled
- [ ] Connection string uses SSL

### Monitoring

- [ ] Error logging configured
- [ ] Performance monitoring enabled
- [ ] Uptime monitoring setup
- [ ] Alerts configured for critical issues

---

## Monitoring

### PM2 Monitoring

```bash
# View logs
pm2 logs

# Monitor resources
pm2 monit

# View status
pm2 status
```

### Application Monitoring

Consider using:

- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring
- **Datadog** - Infrastructure monitoring

### Uptime Monitoring

- **UptimeRobot** - Free uptime monitoring
- **Pingdom** - Advanced monitoring
- **StatusCake** - Website monitoring

---

## Backup Strategy

### Database Backups

```bash
# Manual backup
mongodump --uri="mongodb+srv://..." --out=/backups/$(date +%Y%m%d)

# Automated daily backups (cron)
0 2 * * * /usr/bin/mongodump --uri="mongodb+srv://..." --out=/backups/$(date +\%Y\%m\%d)
```

### File Backups

```bash
# Backup uploads directory
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz backend/uploads/
```

---

## Scaling

### Horizontal Scaling

- Use PM2 cluster mode for multiple instances
- Load balance with Nginx
- Use Redis for session storage
- Implement caching strategies

### Database Scaling

- Enable MongoDB replica sets
- Use read replicas for read-heavy operations
- Implement database indexing
- Consider sharding for large datasets

---

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
sudo lsof -i :5001
sudo kill -9 <PID>
```

**Permission denied:**
```bash
sudo chown -R $USER:$USER /var/www/language-exchange
```

**Nginx configuration error:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

**PM2 not starting:**
```bash
pm2 delete all
pm2 start ecosystem.config.js
pm2 logs
```

---

## Rollback Strategy

If deployment fails:

```bash
# PM2
pm2 stop all
git checkout previous-stable-tag
npm install
pm2 restart all

# Docker
docker-compose down
git checkout previous-stable-tag
docker-compose up -d --build
```

---

## Post-Deployment

After successful deployment:

1. ✅ Test all critical features
2. ✅ Verify SSL certificate
3. ✅ Check monitoring dashboards
4. ✅ Test backup restoration
5. ✅ Update documentation
6. ✅ Notify team of deployment

---

For more information, see the [main README](../README.md) or [API Documentation](API.md).
