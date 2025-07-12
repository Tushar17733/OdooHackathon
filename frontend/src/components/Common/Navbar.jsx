import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Custom hook to use AuthContext

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">StackIt</Link>
        <div className="space-x-4">
          {user ? ( // If user is logged in
            <>
              <Link to="/ask-question" className="hover:text-gray-300">Ask Question</Link>
              <span className="text-gray-300">Hello, {user.username}</span>
              {/* Notification bell will go here later */}
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Logout</button>
            </>
          ) : ( // If no user is logged in
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;