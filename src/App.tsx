import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";
import "./App.css";

function App() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div
      className="bg-cover bg-center bg-fixed m-0 p-0"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="min-h-screen bg-gray-500/50 flex items-center justify-center md:justify-start sm:p-10">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-[40rem]">
          <h1 className="text-xl md:text-2xl font-bold mb-4 text-center">
            📝 To-Do App List Manager
          </h1>

          <TaskForm
            editingTask={editingTask}
            onFinishEdit={() => setEditingTask(null)}
          />

          <TaskList onEdit={(task) => setEditingTask(task)} />
        </div>
      </div>
    </div>
  );
}

export default App;
