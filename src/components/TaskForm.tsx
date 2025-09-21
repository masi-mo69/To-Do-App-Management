import { useEffect, useState } from "react";
import { useTasks } from "../store/useTasks";
import type { Task } from "../types/task";
import { v4 as uuidv4 } from "uuid";

interface TaskFormProps {
  editingTask?: Task | null;
  onFinishEdit?: () => void;
}

export default function TaskForm({ editingTask, onFinishEdit }: TaskFormProps) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState<"Personal" | "Work">("Personal");
  const [error, setError] = useState("");
  const { addTask, updateTask } = useTasks();

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setCategory(editingTask.category);
      setError("");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Please enter a task");
      return;
    }

    if (editingTask) {
      updateTask({ ...editingTask, text, category });
      onFinishEdit?.();
    } else {
      const newTask: Task = {
        id: uuidv4(),
        text,
        category,
        completed: false,
      };
      addTask(newTask);
    }

    setText("");
    setCategory("Personal");
    setError("");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
          className="flex-1 border rounded px-3 py-2"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as "Personal" | "Work")}
          className="border rounded px-2"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingTask ? "Update" : "Add"}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm text-left mb-4">{error}</p>}
    </>
  );
}
