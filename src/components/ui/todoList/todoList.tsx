import TodoItem from "../../layout/todoItem/todoItem.tsx";
import "./todoList.css";

import workIcon from "/src/assets/icons8-briefcase.svg";

export default function TodoList() {
  return (
    <>
      <section className="todo-list">
        <aside className="todo-header">
          <img src={workIcon} alt="Work icon" />

          <div>
            <h4>Work</h4>
            <p>tasks left: 5</p>
          </div>

          <button>+</button>
        </aside>

        <aside className="todo-tasks">
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </aside>
      </section>
    </>
  );
}
