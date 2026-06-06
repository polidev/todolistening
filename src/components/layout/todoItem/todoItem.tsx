import "./todoItem.css";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export default function TodoItem({ id, title, completed, onToggle }: TodoItemProps) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        id={id}
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <label htmlFor={id} className={completed ? "completed" : ""}>
        {title}
      </label>
    </div>
  );
}
