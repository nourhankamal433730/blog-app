import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <nav className="bg-fuchsia-950 text-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold ml-9">
          My Blog
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-9">
          {user ? (
            <>
              <Link to="/" className="text-xl hover:text-rose-700 transition font-bold">Home</Link>
              <Link to="/my-blogs" className=" text-xl hover:text-rose-700 transition font-bold">My Blogs</Link>
              <Link to="/edit/new" className=" text-xl hover:text-rose-700 transition font-bold">Add Blog</Link>
            </>
          ) : null}
        </div>

        {/* Authentication Buttons */}
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xl hover:text-rose-700 transition font-bold mr-9"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="bg-fuchsia-600 px-4 py-2 rounded hover:bg-indigo-400 transition">
                Login
              </Link>
              <Link to="/register" className="bg-fuchsia-600 px-4 py-2 rounded hover:bg-indigo-400 transition">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
