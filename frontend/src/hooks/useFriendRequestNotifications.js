import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFriendRequests } from '../lib/api';
import useNotificationStore from '../store/useNotificationStore';
import useAuthUser from './useAuthUser';

const useFriendRequestNotifications = () => {
  const { authUser } = useAuthUser();
  const { addNotification } = useNotificationStore();
  const previousRequestsRef = useRef(new Set());
  const isFirstLoadRef = useRef(true);

  // Query friend requests every 10 seconds
  const { data: friendRequests } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
    refetchInterval: 10000, // 10 seconds
    enabled: !!authUser, // Only run when user is authenticated
  });

  useEffect(() => {
    if (!authUser || !friendRequests) return;

    const incomingRequests = friendRequests.incomingReqs || [];
    const currentRequestIds = new Set(incomingRequests.map(req => req._id));

    // Skip notification on first load
    if (isFirstLoadRef.current) {
      previousRequestsRef.current = currentRequestIds;
      isFirstLoadRef.current = false;
      return;
    }

    // Check for new friend requests
    incomingRequests.forEach(request => {
      if (!previousRequestsRef.current.has(request._id)) {
        // This is a new friend request
        addNotification({
          type: 'friendRequest',
          title: 'New Friend Request',
          message: `${request.sender.fullName} sent you a friend request`,
          senderId: request.sender._id,
          requestId: request._id,
        });
      }
    });

    // Update previous requests
    previousRequestsRef.current = currentRequestIds;
  }, [friendRequests, authUser, addNotification]);

  return null; // This hook doesn't return anything, it just manages notifications
};

export default useFriendRequestNotifications;
