import React from "react";
import { FaTachometerAlt, FaChartBar, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col fixed inset-y-0 left-0">
      <div className="px-6 py-4 text-2xl font-bold border-b border-blue-700">
        Applied Materials
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-3">
          <li>
            <button className="flex items-center gap-3 w-full text-left px-6 py-3 rounded-lg hover:bg-blue-700">
              <FaTachometerAlt className="text-white" /> Dashboard
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 w-full text-left px-6 py-3 rounded-lg hover:bg-blue-700">
              <FaChartBar className="text-white" /> Analytics
            </button>
          </li>
          <li>
            <button className="flex items-center gap-3 w-full text-left px-6 py-3 rounded-lg hover:bg-blue-700">
              <FaCog className="text-white" /> Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
