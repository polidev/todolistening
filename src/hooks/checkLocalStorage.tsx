import { useState, useEffect, useId, useRef } from "react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskList {
  id: string;
  title: string;
  tasks: Task[];
}

export default function CheckLocalStorage() {
  const listId = useId();
  const taskId = useId();

  const defaultTaskList = useRef<TaskList>({
    id: listId,
    title: "My First Task List",
    tasks: [
      {
        id: taskId,
        title: "Drink water",
        completed: false,
      },
    ],
  });

  const [taskList, setTaskList] = useState(defaultTaskList);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLocalStorage() {
      try {
        setLoading(true);
        setError(null);

        const initialTaskList = localStorage.getItem("defaultTaskList");

        if (!initialTaskList) {
          localStorage.setItem(
            "defaultTaskList",
            JSON.stringify(defaultTaskList.current),
          );
          localStorage.setItem(
            "defaultTaskList2",
            JSON.stringify(defaultTaskList.current),
          );
          localStorage.setItem(
            "defaultTaskList3",
            JSON.stringify(defaultTaskList.current),
          );
          localStorage.setItem(
            "defaultTaskList4",
            JSON.stringify(defaultTaskList.current),
          );
        } else {
          localStorage.setItem(
            "defaultTaskList2",
            JSON.stringify(defaultTaskList.current),
          );
          localStorage.setItem(
            "defaultTaskList3",
            JSON.stringify(defaultTaskList.current),
          );
          const localStorageData: Record<string, unknown> = {};
          const keys = Object.keys(localStorage);

          keys.forEach((key) => {
            const value = localStorage.getItem(key);
            try {
              localStorageData[key] = JSON.parse(value!);
            } catch {
              localStorageData[key] = value;
            }
          });

          setTaskList(localStorageData["defaultTaskList"]);

          console.log("Data recuperado de localStorage:", localStorageData);
        }

        // console.log(localStorage);
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

  return { taskList, setTaskList, loading, error };
}
