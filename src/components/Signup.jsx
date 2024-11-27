import React, { useState } from "react";

const Signup = ({ onSignUp }) => {
  const [name, setName] = useState("");

  const handleSignUp = () => {
    if (name.length == 0) {
      alert("Please Select your name first!");
    }
    if (name.trim()) {
      onSignUp(name);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-pink-200">
      <div className="w-full max-w-md p-8 text-center bg-white rounded shadow-lg">
        <h2 className="mb-6 text-3xl font-extrabold text-gray-700">Sign Up</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSignUp}
          className="px-6 py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
