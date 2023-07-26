import React, { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import { Colors } from "@blueprintjs/core";
import TaskCard from "../components/TaskCard";

function TasksPage() {
  const { getTasks, tasks } = useTasks();

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
      className="flex flex-col justify-center items-center h-[calc(100vh-100px)] space-y-2"
      style={{ background: Colors.DARK_GRAY1 }}
    >
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksPage;
