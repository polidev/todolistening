import useCheckLocalStorage from "../../../hooks/useCheckLocalStorage.tsx";
import TodoList from "../todoList/todoList.tsx";
import "./listsSection.css";

export default function ListsSection() {
  const { taskList, buyList, loading, error } = useCheckLocalStorage();

  return (
    <section className="lists-section">
      <header>
        <h2>My lists</h2>
        <p>Motivational quotes will appear here.</p>
      </header>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && taskList && (
        <TodoList
          key={taskList.id}
          id={taskList.id}
          title={taskList.title}
          tasks={taskList.tasks}
        />
      )}
    </section>
  );
}
