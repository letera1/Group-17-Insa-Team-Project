import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useFriendRequestNotifications from "../hooks/useFriendRequestNotifications";

const Layout = ({ children, showSidebar = false }) => {
  // Initialize friend request notifications
  useFriendRequestNotifications();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          <Navbar onMenuClick={() => setMobileOpen(true)} />

          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>

      {/* Mobile drawer */}
      {showSidebar && mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-base-200 shadow-xl z-50">
            <div className="h-full overflow-y-auto">
              <Sidebar isMobile={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Layout;
