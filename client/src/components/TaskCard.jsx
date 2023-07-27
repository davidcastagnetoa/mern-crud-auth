import { Alert, Button, ButtonGroup, Card, Elevation, Intent, Toaster } from "@blueprintjs/core";
import { useEffect, useState } from "react";

const toaster = Toaster.create();

function TaskCard({ task }) {
  const [handleDeleteOpen, setHandleDeleteOpen] = useState(false);
  const [toastId, setToastId] = useState(null);

  const deleteTask = () => {
    //Remove task function
    console.log(`Task: ${task.title}, id: ${task._id}, deleted! `);
    setHandleDeleteOpen(false); // Oculta Alerta
    const id = toaster.show({
      message: "Tarea Eliminada!",
      intent: Intent.SUCCESS,
      icon: "tick",
    });
    setToastId(id);
  };

  useEffect(() => {
    if (toastId != null) {
      setTimeout(() => toaster.dismiss(toastId), 1000);
    }
  }, [toastId]);

  return (
    <Card
      interactive={true}
      elevation={Elevation.TWO}
      className="bp5-card bp5-dark w-4/6 bp5-vertical space-y-3.5"
    >
      <div className="flex flex-row items-center justify-between">
        <h5 className="bp5-heading">{task.title}</h5>
        <p className="text-xs font-extralight">{new Date(task.date).toLocaleDateString()}</p>
      </div>
      <div className="bp5-divider" />
      <p>{task.description}</p>
      <div className="bp5-divider" />
      <ButtonGroup className="space-x-2">
        <Button intent="warning" className="bp5-button outline-none">
          Editar
        </Button>
        <Button
          intent="danger"
          className="bp5-button outline-none"
          onClick={() => {
            setHandleDeleteOpen(!handleDeleteOpen);
          }}
        >
          Eliminar
        </Button>
        <Alert
          isOpen={handleDeleteOpen}
          intent={Intent.DANGER}
          cancelButtonText="Cancel"
          onCancel={() => {
            setHandleDeleteOpen(false);
          }}
          confirmButtonText="Move to Trash"
          onConfirm={deleteTask}
          className="bp5-dialog bp5-alert bp5-dark outline-none"
          icon="trash"
        >
          <p>Desea eliminar esta tarea?</p>
        </Alert>
      </ButtonGroup>
    </Card>
  );
}

export default TaskCard;
