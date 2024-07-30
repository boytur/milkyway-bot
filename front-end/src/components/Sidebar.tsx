import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTasks, FaUser, FaUsers, FaFileAlt } from 'react-icons/fa';
import { FaBarsStaggered } from "react-icons/fa6";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  { name: 'แดชบอร์ด', icon: <FaHome size={24} />, path: '/' },
  { name: 'รายการลงงาน', icon: <FaTasks size={24} />, path: '/work' },
  { name: 'โปรไฟล์', icon: <FaUser size={24} />, path: '/profile' },
  { name: 'สมาชิก', icon: <FaUsers size={24} />, path: '/member' },
  { name: 'Retrospective', icon: <FaFileAlt size={24} />, path: '/retrospective' }
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
        isCollapsed ? 'w-[4rem]' : 'w-60'
      } bg-white border-r border-gray-200 shadow-lg overflow-y-auto`}
    >
      {/* Toggle button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 ${
          isCollapsed ? 'rotate-180' : ''
        } transition-transform duration-300`}
      >
        <FaBarsStaggered size={22} />
      </button>

      {/* Sidebar content */}
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center mt-6">
          {!isCollapsed && <h1 className="text-xl font-bold">TEAM3</h1>}
        </div>
        <nav className={`flex-grow ${!isCollapsed ? "mt-[2rem]" : "mt-[3.7rem]"}`}>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsCollapsed(true)}
                  className={`flex items-center gap-4 px-4 py-2 mb-3 h-[3rem] rounded-md ${!isCollapsed ? "mx-3" : "mx-1"} ${
                    location.pathname === item.path
                      ? 'bg-gray-200 text-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''} transition-colors duration-300`}
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
