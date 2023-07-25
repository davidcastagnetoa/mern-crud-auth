import React from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import Navbar from "../components/Navbar";

function TaskFormPage() {
  const { createTask } = useTasks();

  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createTask(data);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md space-y-2">
        <form onSubmit={onSubmit} className="space-y-2.5">
          <input
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          <button>Save</button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
