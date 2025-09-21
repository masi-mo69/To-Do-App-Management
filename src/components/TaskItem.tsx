import { useState } from "react";
import type { Task } from "../types/task";
import { useTasks } from "../store/useTasks";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onEdit }: TaskItemProps) {
  const { toggleTask, deleteTask } = useTasks();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center border rounded px-3 py-2 mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
          <span
            className={`text-left ${
              task.completed ? "line-through text-gray-500" : "text-darkText"
            }`}
          >
            {task.text}{" "}
            <span className="text-sm text-gray-400">({task.category})</span>
          </span>
        </div>

        <div className="flex gap-3 text-gray-600">
          <button
            onClick={() => onEdit(task)}
            className="hover:text-blue-500"
            title="Edit"
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="hover:text-red-500"
            title="Delete"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/*Modal to confirm deletion*/}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-gray-500/80 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-center">
              Confirm Delete
            </h2>
            <p className="mb-4 text-center">
              Are you sure you want to delete this task?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTask(task.id);
                  setIsConfirmOpen(false);
                }}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
