import { useState, useEffect, useId, useRef } from "react";

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

        if (!initialTaskList || !initialBuyList) {
          localStorage.setItem(
            "defaultTaskList",
            JSON.stringify(defaultTaskList.current),
          );

          localStorage.setItem(
            "defaultBuyList",
            JSON.stringify(defaultBuyList.current),
          );

          setTaskList(defaultTaskList.current);
          setBuyList(defaultBuyList.current);
        } else {
          setTaskList(JSON.parse(initialTaskList));
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

  return { taskList, setTaskList, buyList, setBuyList, loading, error };
}
