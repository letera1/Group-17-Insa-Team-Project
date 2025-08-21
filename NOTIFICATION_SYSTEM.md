# Friend Request Notification System

This document describes the implementation of a simple popup notification system for friend requests in the Streamify application.

## Overview

The notification system provides real-time popup notifications when users receive friend requests, without requiring WebSockets. It uses a polling mechanism to check for new friend requests every 10 seconds.

## Features

- **Popup Notifications**: Real-time popup notifications appear in the top-right corner
- **Sound Effects**: Audio feedback when notifications are received
- **Auto-dismiss**: Notifications automatically disappear after 5 seconds
- **Clickable**: Clicking on a friend request notification takes you to the notifications page
- **Visual Badge**: Notification count badge on the navbar bell icon
- **Responsive Design**: Works on all screen sizes

## Components

### 1. Notification Store (`useNotificationStore.js`)
- Manages notification state using Zustand
- Handles adding, removing, and clearing notifications
- Auto-removes notifications after 5 seconds

### 2. Notification Popup (`NotificationPopup.jsx`)
- Displays notifications in the top-right corner
- Different icons for different notification types
- Clickable notifications that navigate to relevant pages

### 3. Friend Request Hook (`useFriendRequestNotifications.js`)
- Polls the server every 10 seconds for new friend requests
- Compares current requests with previous ones to detect new ones
- Triggers notifications for new friend requests

### 4. Audio Utility (`notificationAudio.js`)
- Creates simple beep sounds using Web Audio API
- Plays when friend request notifications are received

## How It Works

1. **Polling**: The system checks for new friend requests every 10 seconds
2. **Detection**: Compares current requests with previous state to identify new ones
3. **Notification**: Creates a popup notification with sender's name and request details
4. **Sound**: Plays a notification sound to alert the user
5. **Auto-cleanup**: Removes notifications after 5 seconds

## Usage

### For Users
- Notifications appear automatically when friend requests are received
- Click on a notification to go to the notifications page
- View the notification count badge on the navbar bell icon

### For Developers
- The system is automatically initialized on all authenticated pages
- No additional setup required
- Notifications are managed globally through the Zustand store

## Testing

The notification system automatically detects and displays real friend requests:
- When a user sends a friend request, the recipient will see a popup notification
- Notifications appear in real-time as requests are received
- The system polls for new requests every 10 seconds

## Configuration

- **Polling Interval**: 10 seconds (configurable in `useFriendRequestNotifications.js`)
- **Auto-dismiss Time**: 5 seconds (configurable in `useNotificationStore.js`)
- **Sound**: Enabled by default (can be disabled in `notificationAudio.js`)

## Browser Compatibility

- Modern browsers with Web Audio API support
- Gracefully degrades if audio is not supported
- Responsive design works on all screen sizes

## Future Enhancements

- User preferences for notification settings
- Different notification types (messages, calls, etc.)
- Push notifications for mobile devices
- Notification history and management
- Custom notification sounds
