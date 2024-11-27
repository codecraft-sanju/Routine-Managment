import React, { useState } from "react";

const RoutineItem = ({ routine, onEdit, onDelete, onUpdate }) => {
  const [updatedRoutine, setUpdatedRoutine] = useState(routine.routine);
  const [showFullText, setShowFullText] = useState(false);

  const saveChanges = () => {
    onUpdate(routine.id, updatedRoutine, routine.time);
  };

  return (
    <li className="flex flex-col p-4 space-y-4 bg-white rounded-lg shadow hover:shadow-lg">
      {routine.isEditing ? (
        <div>
          <input
            type="text"
            value={updatedRoutine}
            onChange={(e) => setUpdatedRoutine(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-bold text-gray-700 break-words whitespace-normal">
            {showFullText || routine.routine.length <= 50
              ? routine.routine
              : `${routine.routine.substring(0, 50)}...`}
            {routine.routine.length > 50 && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="ml-2 text-blue-500 hover:underline"
              >
                {showFullText ? "Show less" : "Read more"}
              </button>
            )}
          </h3>
        </div>
      )}
      <div>
        <button
          onClick={() => (routine.isEditing ? saveChanges() : onEdit(routine.id))}
          className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {routine.isEditing ? "Save" : "Edit"}
        </button>
        <button
          onClick={() => onDelete(routine.id)}
          className="px-4 py-2 ml-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default RoutineItem;
