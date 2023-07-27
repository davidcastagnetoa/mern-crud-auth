import axios from "./axios";

// Obtener Tareas por usuario
export const getTasksRequest = () => axios.get("/tasks");

// Obtener Tarea por ID
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`, task);

// Crear Tarea
export const createTaskRequest = (task) => axios.post("/tasks", task);

// Actualizar Tarea
export const updateTaskRequest = (task) =>
  axios.put(`/tasks/${task._id}`, task);

// Eliminar Tarea
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
