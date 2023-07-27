import React from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";

import { Colors } from "@blueprintjs/core";

function TaskFormPage() {
  const { createTask } = useTasks();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    createTask(data);
    navigate("/tasks");
  });

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh)]"
      style={{ background: Colors.DARK_GRAY1 }}
    >
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="bp5-dark max-w-2xl w-full p-10 rounded-md space-y-2"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5">
          <div className="bp5-input-group">
            <span className="bp5-icon bp5-icon-edit" />
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              autoFocus
              className="bp5-input bp5-fill outline-none"
            />
          </div>
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="bp5-input bp5-fill min-h-[30rem] outline-none"
          />
          <Button type="submit" icon="floppy-disk" intent="success">
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
