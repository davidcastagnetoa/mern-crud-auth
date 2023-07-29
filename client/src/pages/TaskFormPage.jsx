import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { DateInput } from "@blueprintjs/datetime";
import { Colors } from "@blueprintjs/core";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

import "react-day-picker/dist/style.css";

function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const [dateValue, setDateValue] = useState(null);

  const dateFnsFormat = "DD-MM-YYYY HH:mm:ss";

  const formatDate = useCallback(
    (date) => dayjs(date).format(dateFnsFormat),
    []
  );

  const parseDate = useCallback(
    (str) => dayjs(str, dateFnsFormat).toDate(),
    []
  );

  const handleChange = useCallback(
    (date) => {
      if (date) {
        console.log("Fecha seleccionada:", date);
        setDateValue(date);
        setValue("date", formatDate(date));
      } else {
        console.log("Fecha borrada");
        setDateValue(null);
        setValue("date", null);
      }
    },
    [setValue, formatDate]
  );

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (params.id) {
      updateTask(params.id, { ...data, date: dateValue });
    } else {
      createTask({ ...data, date: dateValue });
    }
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2.5"
        >
          <div className="space-y-1.5">
            <label htmlFor="title">Title</label>
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
          </div>
          <div className="space-y-1.5">
            <label htmlFor="description">Description</label>
            <textarea
              rows="3"
              placeholder="Description"
              {...register("description")}
              className="bp5-input bp5-fill min-h-[20rem] outline-none"
            />
          </div>
          <div className="flex items-center justify-between flex-row">
            <DateInput
              formatDate={formatDate}
              onChange={handleChange}
              parseDate={parseDate}
              placeholder={dateFnsFormat}
              value={dateValue}
              showActionsBar={true}
              canClearSelection={true}
              clearButtonText="Clear"
              className="w-1/3"
            />
            <Button
              type="submit"
              icon="floppy-disk"
              intent="success"
              className="w-1/4"
            >
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default TaskFormPage;
