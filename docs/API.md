# API Documentation

## Base URL

```
Development: http://localhost:5001/api
Production: https://your-domain.com/api
```

## Authentication

All authenticated endpoints require a JWT token stored in HTTP-only cookies.

### Headers

```
Content-Type: application/json
```

---

## Authentication Endpoints

### Sign Up

Create a new user account.

**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Account created successfully",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "createdAt": "2026-04-14T10:00:00.000Z"
  }
}
```

**Errors:**
- `400` - Invalid input data
- `409` - Email already exists

---

### Login

Authenticate a user and receive a JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged in successfully",
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePicture": "avatar_url",
    "nativeLanguage": "English",
    "learningLanguage": "Spanish"
  }
}
```

**Errors:**
- `400` - Invalid credentials
- `404` - User not found

---

### Logout

Log out the current user.

**Endpoint:** `POST /auth/logout`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Get Current User

Get the authenticated user's profile.

**Endpoint:** `GET /auth/me`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "email": "user@example.com",
    "fullName": "John Doe",
    "profilePicture": "avatar_url",
    "nativeLanguage": "English",
    "learningLanguage": "Spanish",
    "location": "New York, USA",
    "bio": "Language enthusiast"
  }
}
```

---

## User Endpoints

### Update Profile

Update user profile information.

**Endpoint:** `PUT /users/profile`

**Authentication:** Required

**Request Body:**
```json
{
  "fullName": "John Doe",
  "nativeLanguage": "English",
  "learningLanguage": "Spanish",
  "location": "New York, USA",
  "bio": "Passionate about learning languages"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "user": {
    "_id": "user_id",
    "fullName": "John Doe",
    "nativeLanguage": "English",
    "learningLanguage": "Spanish",
    "location": "New York, USA",
    "bio": "Passionate about learning languages"
  }
}
```

---

### Upload Avatar

Upload a profile picture.

**Endpoint:** `POST /users/avatar`

**Authentication:** Required

**Content-Type:** `multipart/form-data`

**Request Body:**
```
avatar: [File]
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "avatarUrl": "/uploads/avatars/filename.jpg"
}
```

**Errors:**
- `400` - No file uploaded or invalid file type
- `413` - File too large (max 5MB)

---

### Get All Users

Get a list of all users (for finding language partners).

**Endpoint:** `GET /users`

**Authentication:** Required

**Query Parameters:**
- `learningLanguage` (optional) - Filter by learning language
- `nativeLanguage` (optional) - Filter by native language
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20)

**Response:** `200 OK`
```json
{
  "success": true,
  "users": [
    {
      "_id": "user_id",
      "fullName": "Jane Smith",
      "profilePicture": "avatar_url",
      "nativeLanguage": "Spanish",
      "learningLanguage": "English",
      "location": "Madrid, Spain",
      "bio": "Love learning languages!"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalUsers": 100
  }
}
```

---

### Get User by ID

Get a specific user's profile.

**Endpoint:** `GET /users/:id`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "user": {
    "_id": "user_id",
    "fullName": "Jane Smith",
    "profilePicture": "avatar_url",
    "nativeLanguage": "Spanish",
    "learningLanguage": "English",
    "location": "Madrid, Spain",
    "bio": "Love learning languages!"
  }
}
```

---

## Friend Request Endpoints

### Send Friend Request

Send a friend request to another user.

**Endpoint:** `POST /friends/request`

**Authentication:** Required

**Request Body:**
```json
{
  "recipientId": "user_id"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Friend request sent",
  "friendRequest": {
    "_id": "request_id",
    "sender": "sender_id",
    "recipient": "recipient_id",
    "status": "pending",
    "createdAt": "2026-04-14T10:00:00.000Z"
  }
}
```

---

### Get Friend Requests

Get all pending friend requests.

**Endpoint:** `GET /friends/requests`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "requests": [
    {
      "_id": "request_id",
      "sender": {
        "_id": "sender_id",
        "fullName": "John Doe",
        "profilePicture": "avatar_url"
      },
      "status": "pending",
      "createdAt": "2026-04-14T10:00:00.000Z"
    }
  ]
}
```

---

### Accept Friend Request

Accept a pending friend request.

**Endpoint:** `PUT /friends/request/:id/accept`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Friend request accepted"
}
```

---

### Reject Friend Request

Reject a pending friend request.

**Endpoint:** `PUT /friends/request/:id/reject`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Friend request rejected"
}
```

---

### Get Friends List

Get all accepted friends.

**Endpoint:** `GET /friends`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "friends": [
    {
      "_id": "user_id",
      "fullName": "Jane Smith",
      "profilePicture": "avatar_url",
      "nativeLanguage": "Spanish",
      "learningLanguage": "English",
      "isOnline": true
    }
  ]
}
```

---

## Chat Endpoints

### Get Stream Chat Token

Get a token for Stream Chat authentication.

**Endpoint:** `GET /chat/token`

**Authentication:** Required

**Response:** `200 OK`
```json
{
  "success": true,
  "token": "stream_chat_token",
  "userId": "user_id"
}
```

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": ["Specific error details"]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **General endpoints**: 100 requests per minute
- **Upload endpoints**: 10 requests per minute

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1618394400
```

---

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

**Response includes:**
```json
{
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100,
    "itemsPerPage": 20
  }
}
```

---

## WebSocket Events

The application uses Socket.io for real-time features.

### Connection

```javascript
const socket = io('http://localhost:5001', {
  auth: { token: 'jwt_token' }
});
```

### Events

**friend_request_received**
```javascript
socket.on('friend_request_received', (data) => {
  // Handle new friend request
});
```

**friend_request_accepted**
```javascript
socket.on('friend_request_accepted', (data) => {
  // Handle accepted friend request
});
```

**user_online**
```javascript
socket.on('user_online', (userId) => {
  // Handle user coming online
});
```

**user_offline**
```javascript
socket.on('user_offline', (userId) => {
  // Handle user going offline
});
```

---

## Testing

Use tools like Postman or curl to test the API:

```bash
# Sign up
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","fullName":"Test User"}'

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

---

For more information, see the [main README](../README.md).
