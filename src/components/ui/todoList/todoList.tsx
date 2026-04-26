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
}

export default function TodoList({ title, tasks }: TaskList) {
  return (
    <>
      <section className="todo-list">
        <aside className="todo-header">
          <span>{title.slice(0, 1).toUpperCase()}</span>

          <div>
            <h4>{title}</h4>
            <p>tasks left: {tasks.length}</p>
          </div>

          <button>+</button>
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
