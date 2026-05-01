import { useRef, useState } from "react";
import TodoItem from "../../layout/todoItem/todoItem.tsx";
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
  addTask: (text: string) => void;
}

export default function TodoList({ title, tasks, addTask }: TaskList) {
  const [dialogText, setDialogText] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleAddTask = () => {
    addTask(dialogText);
    dialogRef.current!.close();
  };

  return (
    <>
      <dialog ref={dialogRef} closedby="any" className="taskDialog">
        <textarea
          name="task"
          id="taskInput"
          value={dialogText}
          onChange={(e) => setDialogText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTask();
            }
          }}
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
