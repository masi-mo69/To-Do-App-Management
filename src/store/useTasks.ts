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

  addTask: (task) =>
    set((state) => {
      const updated = [...state.tasks, task];
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  updateTask: (updatedTask) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  toggleTask: (id) =>
    set((state) => {
      const updated = state.tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      );
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),

  deleteTask: (id) =>
    set((state) => {
      const updated = state.tasks.filter((t) => t.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updated));
      return { tasks: updated };
    }),
}));
