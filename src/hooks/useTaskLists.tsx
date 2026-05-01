import { useState, useEffect, useId, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

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

export default function useTaskLists() {
  const defaultListId = useId();
  const defaultTaskId = useId();
  const buyListId = useId();
  const buyTaskId = useId();

  const defaultTaskList = useRef<TaskList>({
    id: defaultListId,
    title: "Task List",
    tasks: [
      {
        id: defaultTaskId,
        title: "Drink water",
        completed: false,
      },
    ],
  });

  const defaultBuyList = useRef<TaskList>({
    id: buyListId,
    title: "Buy List",
    tasks: [
      {
        id: buyTaskId,
        quantity: 1,
        title: "Buy milk",
        completed: false,
      },
    ],
  });

  const [taskList, setTaskList] = useState<TaskList | null>(null);
  const [buyList, setBuyList] = useState<TaskList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadLocalStorage() {
      try {
        setLoading(true);
        setError(null);

        const initialTaskList = localStorage.getItem("defaultTaskList");
        const initialBuyList = localStorage.getItem("defaultBuyList");

        if (!initialTaskList) {
          localStorage.setItem(
            "defaultTaskList",
            JSON.stringify(defaultTaskList.current),
          );
          setTaskList(defaultTaskList.current);
        } else {
          setTaskList(JSON.parse(initialTaskList));
        }

        if (!initialBuyList) {
          localStorage.setItem(
            "defaultBuyList",
            JSON.stringify(defaultBuyList.current),
          );
          setBuyList(defaultBuyList.current);
        } else {
          setBuyList(JSON.parse(initialBuyList));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);

          console.log(error);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadLocalStorage();
  }, []);

  function addTask(text: string) {
    if (!taskList || !text.trim()) return;

    console.log("Adding task:", text);

    const newTask: Task = {
      id: uuidv4(),
      title: text.trim(),
      completed: false,
    };

    const updatedTaskList = {
      ...taskList,
      tasks: [...taskList.tasks, newTask],
    };

    setTaskList(updatedTaskList);
    localStorage.setItem("defaultTaskList", JSON.stringify(updatedTaskList));
  }

  return {
    taskList,
    setTaskList,
    buyList,
    setBuyList,
    loading,
    error,
    addTask,
  };
}
