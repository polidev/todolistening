import { useRef, useState } from "react";
import TodoItem from "../../layout/todoItem/todoItem.tsx";
import useTaskLists from "../../../hooks/useTaskLists.tsx";
import "./todoList.css";

interface Task {
  id: string;
  quantity?: number;
  title: string;
  completed: boolean;
}

interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}

export default function TodoList({ title, tasks }: TaskList) {
  const [dialogText, setDialogText] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { addTask } = useTaskLists();

  const handleAddTask = () => {
    addTask("Agregué una nueva tarea");
    console.log(dialogText);
    console.log("dialog ref:", dialogRef.current); // ¿es null?
    dialogRef.current?.close();
  };

  return (
    <>
      <dialog ref={dialogRef} closedby="any" className="taskDialog">
        <textarea
          name="task"
          id="taskInput"
          value={dialogText}
          onChange={(e) => setDialogText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <form method="dialog">
          <button onClick={handleAddTask}>Guardar</button>
        </form>
      </dialog>

      <section className="todo-list">
        <aside className="todo-header">
          <span>{title.slice(0, 1).toUpperCase()}</span>

          <div>
            <h4>{title}</h4>
            <p>tasks left: {tasks.length}</p>
          </div>

          <button onClick={() => dialogRef.current?.showModal()}>+</button>
        </aside>

        <aside className="todo-tasks">
          {tasks.map((task) => (
            <TodoItem key={task.id} id={task.id} title={task.title} />
          ))}
        </aside>
      </section>
    </>
  );
}
