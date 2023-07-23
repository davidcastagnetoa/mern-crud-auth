import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/task";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  //create Task
  const createTask = async (task) => {
    const response = await createTaskRequest(task);
    console.log(response);
  };

  //Read Task
  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      console.log(response);
      setTasks(response.data);
      console.log(tasks)
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
