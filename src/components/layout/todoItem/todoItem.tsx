import "./todoItem.css";

export default function TodoItem({ id, title }: { id: string; title: string }) {
  return (
    console.log(title),
    (
      <div className="todo-item">
        <input type="checkbox" id={id} name="task1" />
        <label htmlFor={id}>{title}</label>
      </div>
    )
  );
}
