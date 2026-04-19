import "./todoItem.css";

export default function TodoItem() {
  return (
    <div className="todo-item">
      <input type="checkbox" id="task1" name="task1" />
      <label htmlFor="task1">Lorem ipsum dolor sit</label>
    </div>
  );
}
