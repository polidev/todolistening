import CheckLocalStorage from "../../../hooks/checkLocalStorage.tsx";
import TodoList from "../todoList/todoList.tsx";
import "./listsSection.css";

export default function ListsSection() {
  const { taskList, setTaskList, loading, error } = CheckLocalStorage();

  console.log(taskList);

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
