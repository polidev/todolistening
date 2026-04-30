import { useState, useEffect, useId, useCallback } from "react";

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

export default function useTaskList(listId: string) {
  const generateId = useId();

  const [list, setList] = useState<TaskList | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadList() {
      try {
        setLoading(true);
        setError(null);

        const storedList = localStorage.getItem(listId);

        if (storedList) {
          setList(JSON.parse(storedList));
        } else {
          const newList: TaskList = {
            id: listId,
            title: "Task List",
            tasks: [],
          };
          localStorage.setItem(listId, JSON.stringify(newList));
          setList(newList);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadList();
  }, [listId]);

  const persist = useCallback((updatedList: TaskList) => {
    localStorage.setItem(listId, JSON.stringify(updatedList));
    setList(updatedList);
  }, [listId]);

  const addTask = useCallback((title: string, quantity?: number) => {
    if (!list) return;

    const newTask: Task = {
      id: generateId,
      title,
      quantity,
      completed: false,
    };

    const updatedList: TaskList = {
      ...list,
      tasks: [...list.tasks, newTask],
    };

    persist(updatedList);
  }, [list, persist, generateId]);

  const removeTask = useCallback((taskId: string) => {
    if (!list) return;

    const updatedList: TaskList = {
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId),
    };

    persist(updatedList);
  }, [list, persist]);

  const toggleTask = useCallback((taskId: string) => {
    if (!list) return;

    const updatedList: TaskList = {
      ...list,
      tasks: list.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };

    persist(updatedList);
  }, [list, persist]);

  return { addTask, removeTask, toggleTask, list, loading, error };
}