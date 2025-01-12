import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google.");
    }
  };

  return (
    <>
      <div className="relative w-full min-h-screen " id="login">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-[#8e58b7]"></div>
        </div>

        <div className="relative rounded-2xl pt-4 max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Sign In
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-1.5 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-1.5 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-1.5 rounded-md hover:bg-blue-600"
            >
              Sign In
            </button>
          </form>

          <div className="google-login flex items-center justify-center gap-4 w-full mt-4 bg-white border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50">
            <FcGoogle size={24} />
            <button onClick={handleGoogleSignIn} className="">
              Sign In with Google
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
