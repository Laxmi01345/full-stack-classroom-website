import { Link } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col fixed top-0 left-0">
      <div className="flex flex-col items-center p-4">
      <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full border-2 border-white">
          <FaUserAlt className="text-3xl" />
        </div>
       
        <h2 className="text-xl mt-2">Laxmi Ray</h2>
        <p className="text-sm">Principal</p>
      </div>
      <div className="flex-1">
        <ul className="list-none">
          <li className="p-4 hover:bg-gray-600">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-gray-600">
            <Link to="/classrooms">Classrooms</Link>
          </li>
          <li className="p-4 hover:bg-gray-600">
            <Link to="/teachers">Teachers</Link>
          </li>
          <li className="p-4 hover:bg-gray-600">
            <Link to="/teachers">Students</Link>
          </li>
        </ul>
      </div>
      <button 
        className="w-full bg-red-600 p-4 text-white hover:bg-red-800"
        onClick=""
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
