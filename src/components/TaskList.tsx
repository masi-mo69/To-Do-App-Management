import { useTasks } from "../store/useTasks";
import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export default function TaskList({ onEdit }: TaskListProps) {
  const { tasks } = useTasks();
  const categories = ["Personal", "Work"];

  return (
    <div>
      {/*Group tasks by category */}
      {categories.map((cat) => (
        <div key={cat} className="mb-4">
          <h2 className="font-bold text-lg mb-2">
            {cat === "Personal" ? "Personal" : "Work"}
          </h2>
          {tasks.filter((t) => t.category === cat).length === 0 ? (
            <p className="text-sm text-gray-400">No tasks available.</p>
          ) : (
            tasks
              .filter((t) => t.category === cat)
              .map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEdit} />
              ))
          )}
        </div>
      ))}
    </div>
  );
}
