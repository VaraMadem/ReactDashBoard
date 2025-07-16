import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

export default function Topbar() {
  return (
    <div className="w-full flex justify-between items-center p-4 bg-white shadow">
      <div className="flex items-center gap-3">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="border rounded p-2 w-64"
        />
      </div>
      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer" />
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </div>
  );
}
