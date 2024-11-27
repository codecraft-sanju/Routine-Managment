import React, { useState, useEffect } from "react";
import RoutineItem from "./RoutineItem";

const RoutineApp = ({ username }) => {
  // Initialize routines from localStorage
  const [routines, setRoutines] = useState(() => {
    const savedRoutines = localStorage.getItem("routines");
    return savedRoutines ? JSON.parse(savedRoutines) : []; // Load saved routines or set an empty array
  });

  const [routine, setRoutine] = useState("");
  const [time, setTime] = useState("");

  // Save routines to localStorage whenever routines state changes
  useEffect(() => {
    localStorage.setItem("routines", JSON.stringify(routines));
  }, [routines]);

  const addRoutine = () => {
    if(!routine || !time) {
      alert('Please select all field are required!')
    }
    if (routine && time) {
      const newRoutine = { id: Date.now(), routine, time, isEditing: false };
      setRoutines([...routines, newRoutine]);
      setRoutine("");
      setTime("");
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

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("routines");
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Hello, {username}</h1>
        <p className="mt-2 text-gray-600">Manage your routines below:</p>
        <p className="mt-2 text-sm text-gray-500">Created by Sanjay</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 mt-4 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Routine Name"
            value={routine}
            onChange={(e) => setRoutine(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addRoutine}
            className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
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
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoutineApp;
