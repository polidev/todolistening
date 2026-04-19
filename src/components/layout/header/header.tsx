import "./header.css";
import profilePicture from "/src/assets/icons8-person.svg";

export default function Header({ text = "ToDoListening" }) {
  return (
    <header className="header">
      <img
        src={profilePicture}
        alt="Profile picture"
        className="profile-picture"
      />
      <h3>{text}</h3>
    </header>
  );
}
