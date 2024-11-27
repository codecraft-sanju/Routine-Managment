import React, { useState, useEffect } from "react";
import RoutineItem from "./RoutineItem";

const RoutineApp = ({ username }) => {
  const [routines, setRoutines] = useState(() => {
    const savedRoutines = localStorage.getItem("routines");
    return savedRoutines ? JSON.parse(savedRoutines) : [];
  });

  const [routine, setRoutine] = useState("");
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM"); // AM or PM
  const [showLogoutWarning, setShowLogoutWarning] = useState(false);

  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const addRoutine = () => {
    if (!routine) {
      alert("Please fill in all fields!");
    } else {
      const time = `${hour}:${minute} ${period}`;
      const newRoutine = { id: Date.now(), routine, time, isEditing: false, isCompleted: false };
      setRoutines([...routines, newRoutine]);
      setRoutine("");
      setHour("12");
      setMinute("00");
      setPeriod("AM");
    }
  };

  const editRoutine = (id) => {
    setRoutines(
      routines.map((r) =>
        r.id === id ? { ...r, isEditing: !r.isEditing } : r
      )
    );
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter((r) => r.id !== id));
  };

  const updateRoutine = (id, updatedRoutine, updatedTime) => {
    setRoutines(
      routines.map((r) =>
        r.id === id
          ? { ...r, routine: updatedRoutine, time: updatedTime, isEditing: false }
          : r
      )
    );
  };

  const toggleCompletion = (id) => {
    setRoutines(
      routines.map((r) =>
        r.id === id ? { ...r, isCompleted: !r.isCompleted } : r
      )
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("routines");
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Hello, {username}</h1>
        <p className="mt-2 text-gray-600">Manage your routines below:</p>
        <p className="mt-2 text-sm text-gray-500">Created by Sanjay</p>
        <button
          onClick={() => setShowLogoutWarning(true)}
          className="px-4 py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="flex flex-wrap items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Routine Name"
            value={routine}
            onChange={(e) => setRoutine(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow md:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex items-center space-x-2">
            {/* Hours Dropdown */}
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 12 }, (_, i) => {
                const value = (i + 1).toString().padStart(2, "0");
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            {/* Minutes Dropdown */}
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {Array.from({ length: 60 }, (_, i) => {
                const value = i.toString().padStart(2, "0");
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>

            {/* AM/PM Dropdown */}
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-3 py-2 text-sm border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <button
            onClick={addRoutine}
            className="w-full px-4 py-2 text-white transition bg-blue-600 rounded-lg md:w-auto hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="mt-6 space-y-4">
          {routines.map((r) => (
            <RoutineItem
              key={r.id}
              routine={r}
              onEdit={editRoutine}
              onDelete={deleteRoutine}
              onUpdate={updateRoutine}
              onToggleCompletion={toggleCompletion}
            />
          ))}
        </ul>
      </div>

      {showLogoutWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-gray-800">
              Are you sure you want to logout?
            </h2>
            <p className="mt-2 text-gray-600">
              All your routines will be deleted permanently.
            </p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={() => setShowLogoutWarning(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Created by Sanjay |{" "}
          <a
            href="https://instagram.com/sanjuuu_x18"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            <span className="inline-block mr-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                className="inline w-4 h-4"
              />
            </span>
            @sanjuuu_x18
          </a>
        </p>
      </footer>
    </div>
  );
};

export default RoutineApp;
