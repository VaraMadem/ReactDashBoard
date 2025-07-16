import { FaTable, FaChartBar, FaCog } from "react-icons/fa";

export default function Layout({ children, activePage, setActivePage }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar - fixed and always full height */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col fixed inset-y-0 left-0">
        <div className="text-center py-6 text-xl font-bold border-b border-blue-700">
          Applied Materials
        </div>
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          <button
            className={`flex items-center p-3 rounded hover:bg-blue-700 w-full ${
              activePage === "dashboard" && "bg-blue-700"
            }`}
            onClick={() => setActivePage("dashboard")}
          >
            <FaTable className="mr-3" /> Dashboard
          </button>
          <button
            className={`flex items-center p-3 rounded hover:bg-blue-700 w-full ${
              activePage === "analytics" && "bg-blue-700"
            }`}
            onClick={() => setActivePage("analytics")}
          >
            <FaChartBar className="mr-3" /> Analytics
          </button>
          <button className="flex items-center p-3 rounded hover:bg-blue-700 w-full">
            <FaCog className="mr-3" /> Settings
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Dashboard Overview
          </h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Theme
          </button>
        </header>

        {/* Page Content */}
        <div className="p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}
