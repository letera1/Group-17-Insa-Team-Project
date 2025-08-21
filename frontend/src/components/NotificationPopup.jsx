import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { XIcon, UserPlusIcon, BellIcon } from 'lucide-react';
import useNotificationStore from '../store/useNotificationStore';

const NotificationPopup = () => {
  const { notifications, removeNotification } = useNotificationStore();
  const navigate = useNavigate();

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    const timers = notifications.map(notification => 
      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000)
    );

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right-2 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              {notification.type === 'friendRequest' ? (
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <UserPlusIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <BellIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <button
                onClick={() => {
                  if (notification.type === 'friendRequest') {
                    navigate('/notifications');
                  }
                }}
                className="text-left w-full"
              >
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {notification.title}
                </p>
                {notification.message && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                )}
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {notification.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </button>
            </div>
            
            <button
              onClick={() => removeNotification(notification.id)}
              className="flex-shrink-0 w-6 h-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPopup;
