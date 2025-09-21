import { create } from "zustand";
import type { Task } from "../types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const useTasks = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]"),

  // Add a new task and save to localStorage
  addTask: (task) =>
    set((state) => {
      const updated = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  // Edit task
  updateTask: (updatedTask) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  // Toggle completion status of a task
  toggleTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  // Delete a task and update localStorage
  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));
