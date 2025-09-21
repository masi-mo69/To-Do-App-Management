export interface Task {
  id: string;
  text: string;
  category: "Personal" | "Work";
  completed: boolean;
}
