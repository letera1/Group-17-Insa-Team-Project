import { create } from 'zustand';
import { playFriendRequestSound } from '../lib/notificationAudio';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  
  // Add a new notification
  addNotification: (notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date(),
    };
    
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));
    
    // Play sound for friend request notifications
    if (notification.type === 'friendRequest') {
      playFriendRequestSound();
    }
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },
  
  // Remove a notification by id
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
  
  // Clear all notifications
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));

export default useNotificationStore;
