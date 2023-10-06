import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { Colors } from "@blueprintjs/core";
import TaskCard from "../components/TaskCard";
import { useTheme } from "../context/ThemeContext";

function TasksPage() {
  const { getTasks, tasks } = useTasks();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0)
    return (
      <div>
        <h1>No tasks!</h1>
      </div>
    );

  return (
    <div
      className="flex flex-col justify-center items-center pt-16 pb-6 space-y-2 h-[calc(100vh)]"
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
    >
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
