
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LogOut, User, BookmarkIcon, ImageIcon, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Quokka<span className="text-primary">Share</span>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Navbar links for desktop */}
          <div
            className={`flex items-center space-x-4 ${
              isOpen ? "block" : "hidden"
            } lg:flex`}
          >
            {user ? (
              <>
                <Link
                  to="/my-posts"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <ImageIcon className="w-5 h-5 mr-1" />
                  <span>My Posts</span>
                </Link>
                <Link
                  to="/saved-posts"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <BookmarkIcon className="w-5 h-5 mr-1" />
                  <span>Saved</span>
                </Link>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-1" />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#8e58b7]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 lg:hidden transition-transform ${
          isOpen ? "transform-none" : "transform translate-x-full"
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`bg-white w-3/4 h-full p-6 fixed top-0 right-0 transition-transform ${
            isOpen ? "transform-none" : "transform translate-x-full"
          }`}
        >
          <div className="flex justify-between w-3/4 items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Quokka<span className="text-primary">Share</span>
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {user ? (
              <>
                <Link
                  to="/my-posts"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <ImageIcon className="w-5 h-5 mr-1" />
                  <span>My Posts</span>
                </Link>
                <Link
                  to="/saved-posts"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <BookmarkIcon className="w-5 h-5 mr-1" />
                  <span>Saved</span>
                </Link>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-1" />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-[#8e58b7]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

