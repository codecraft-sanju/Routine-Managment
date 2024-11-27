import React, { useState } from "react";

const Signup = ({ onSignUp }) => {
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (name.trim().length === 0) {
      alert("Please enter your name first!");
      return;
    }
    onSignUp(name);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-500">
      <div className="relative w-full max-w-md p-8 overflow-hidden bg-white shadow-2xl rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 opacity-20 blur-2xl"></div>
        <div className="relative z-10">
          <h2 className="mb-6 text-4xl font-bold text-center text-gray-800">
            Welcome!
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Create your account to start managing routines.
          </p>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSignUp}
              className="w-full py-3 text-lg font-semibold text-white transition-transform duration-200 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105 focus:outline-none"
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline"
            >
              Privacy Policy
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
