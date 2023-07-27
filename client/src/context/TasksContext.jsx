import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from "../api/task";

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
    try {
      const response = await createTaskRequest(task);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Read Task
  const getTasks = async () => {
    try {
      const response = await getTasksRequest();
      console.log(response);
      setTasks(response.data);
      console.log(tasks);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Task
  const deleteTask = async (id) => {
    try {
      const response = await deleteTaskRequest(id);
      console.log("Response status:", response.status);
      console.log("Deleting task with ID:", id);
      if (response.status === 204) {
        setTasks((prevTasks) => {
          console.log("Current tasks:", prevTasks);
          const newTasks = prevTasks.filter((task) => task._id !== id);
          console.log("Tasks after deletion:", newTasks);
          return newTasks;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}
