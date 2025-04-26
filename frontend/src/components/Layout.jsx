import { Outlet, Link } from "react-router-dom";
import TopMenu from "./TopMenu";
import LeftSidebar from "./LeftSidebar";
import { useState } from "react";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
    <TopMenu toggleSidebar={toggleSidebar} />
    <div className="flex flex-1">
      <div className={`transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="h-full">
          <LeftSidebar isOpen={sidebarOpen} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1">
        <div className="container mx-auto px-4 py-6">
            <Outlet>
            </Outlet>
        </div>
      </div>
    </div>
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Quản Lý Công Việc. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  </div>
  )
};

export default Layout;
