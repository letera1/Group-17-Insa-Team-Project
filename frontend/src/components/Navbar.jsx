import { Link, useLocation } from "react-router";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon} from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";
import ProfileEditModal from "./ProfileEditModal";
import messageIcon from '../public/logo.png'; // Ensure this path is correct
import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Get friend requests for notification badge
  const { data: friendRequests } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: getFriendRequests,
    refetchInterval: 10000, // 10 seconds
    enabled: !!authUser,
  });

  const unreadRequestsCount = friendRequests?.incomingReqs?.length || 0;

  // const queryClient = useQueryClient();
  // const { mutate: logoutMutation } = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  // });

  const { logoutMutation } = useLogout();

  
  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-14 sm:h-16 flex items-center">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between w-full">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <img src={messageIcon} alt="logo" className="size-7 sm:size-9 text-primary" />
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden xs:block">
                  Chatty
                </span>
              </Link>
            </div>
          )}

          
          {/* Right side items */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 ml-auto">
            {/* Notifications */}
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle btn-sm sm:btn-md relative">
                <BellIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-base-content opacity-70" />
                {unreadRequestsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {unreadRequestsCount > 9 ? '9+' : unreadRequestsCount}
                  </span>
                )}
              </button>
            </Link>

            {/* Theme Selector */}
            <div className="hidden sm:block">
              <ThemeSelector />
            </div
            

            {/* Avatar - Clickable */}
            <div 
              className="avatar cursor-pointer tooltip tooltip-bottom" 
              data-tip="Edit Profile"
              onClick={() => setIsProfileModalOpen(true)}
            >
              <div className="w-7 sm:w-8 lg:w-9 rounded-full hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-base-200 transition-all duration-200">
                <img 
                  src={authUser?.profilePic} 
                  alt="User Avatar" 
                  rel="noreferrer"
                  className="rounded-full"
                />
              </div>
            </div>
            

            {/* Logout button */}
            <button className="btn btn-ghost btn-circle btn-sm sm:btn-md" onClick={logoutMutation}>
              <LogOutIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-base-content opacity-70" />
            </button>
          </div>
        </div>
      </div>
      

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        authUser={authUser}
      />
    </nav>
  );
};
export default Navbar;




