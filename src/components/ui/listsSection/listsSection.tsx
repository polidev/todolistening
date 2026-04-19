import "./listsSection.css";
import TodoList from "../todoList/todoList.tsx";

export default function ListsSection() {
  return (
    <section className="lists-section">
      <header>
        <h2>My lists</h2>
        <p>Motivational quotes will appear here.</p>
      </header>

      <TodoList />
    </section>
  );
}
