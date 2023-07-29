import axios from "./axios";

// Obtener todas las Tareas por usuario
export const getTasksRequest = () => axios.get("/tasks");

// Obtener Tarea por ID
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);

// Crear Tarea
export const createTaskRequest = (task) => axios.post("/tasks", task);

// Actualizar Tarea
export const updateTaskRequest = (id, task) =>
  axios.put(`/tasks/${id}`, task);

// Eliminar Tarea
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
