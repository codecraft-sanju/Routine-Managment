import React, { useState } from "react";

const RoutineItem = ({ routine, onEdit, onDelete, onUpdate }) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routine.routine);
  const [updatedTime, setUpdatedTime] = useState(routine.time);

  const saveChanges = () => {
    onUpdate(routine.id, updatedRoutine, updatedTime);
  };

  return (
    <li className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg">
      {routine.isEditing ? (
        <div className="flex space-x-2">
          <input
            type="text"
            value={updatedRoutine}
            onChange={(e) => setUpdatedRoutine(e.target.value)}
            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
            className="px-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      <div className="space-x-2">
        {routine.isEditing ? (
          <button
            onClick={saveChanges}
            className="px-2 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => onEdit(routine.id)}
            className="px-2 py-1 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(routine.id)}
          className="px-2 py-1 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default RoutineItem;