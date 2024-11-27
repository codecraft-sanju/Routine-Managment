import React, { useState } from "react";

const RoutineItem = ({ routine, onEdit, onDelete, onUpdate }) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routine.routine);
  const [updatedTime, setUpdatedTime] = useState(routine.time);

  const saveChanges = () => {
    onUpdate(routine.id, updatedRoutine, updatedTime);
  };

  return (
    <li className="flex flex-col items-center justify-between p-4 space-y-4 bg-white rounded-lg shadow sm:flex-row hover:shadow-lg sm:space-y-0 sm:space-x-4">
      {routine.isEditing ? (
        <div className="flex flex-wrap items-center w-full space-y-2 sm:flex-nowrap sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            value={updatedRoutine}
            onChange={(e) => setUpdatedRoutine(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-700 break-words truncate whitespace-normal">
            {routine.routine}
          </h3>
          <p className="text-sm text-gray-500">{routine.time}</p>
        </div>
      )}
      <div className="flex justify-center w-full space-x-2 sm:w-auto sm:justify-end">
        {routine.isEditing ? (
          <button
            onClick={saveChanges}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => onEdit(routine.id)}
            className="w-full px-4 py-2 text-white bg-yellow-500 rounded-lg sm:w-auto hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(routine.id)}
          className="w-full px-4 py-2 text-white bg-red-500 rounded-lg sm:w-auto hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default RoutineItem;
