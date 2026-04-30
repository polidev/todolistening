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

const STORAGE_KEYS = {
  taskList: "defaultTaskList",
  buyList: "defaultBuyList",
} as const;

const DEFAULT_TASK_LIST: TaskList = {
  id: "default",
  title: "Task List",
  tasks: [
    {
      id: "default-task",
      title: "Drink water",
      completed: false,
    },
  ],
};

const DEFAULT_BUY_LIST: TaskList = {
  id: "buy",
  title: "Buy List",
  tasks: [
    {
      id: "buy-task",
      quantity: 1,
      title: "Buy milk",
      completed: false,
    },
  ],
};

function parseTaskList(data: unknown): TaskList | null {
  if (data === null || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  if (typeof obj.id !== "string") return null;
  if (typeof obj.title !== "string") return null;
  if (!Array.isArray(obj.tasks)) return null;
  return obj as TaskList;
}

function createTask(title: string, quantity?: number): Task {
  return {
    id: useId(),
    title,
    quantity,
    completed: false,
  };
}

export default function useTaskLists() {
  const [taskList, setTaskList] = useState<TaskList>(DEFAULT_TASK_LIST);
  const [buyList, setBuyList] = useState<TaskList>(DEFAULT_BUY_LIST);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    function loadLocalStorage() {
      try {
        setLoading(true);
        setError(null);

        const storedTaskList = localStorage.getItem(STORAGE_KEYS.taskList);
        const storedBuyList = localStorage.getItem(STORAGE_KEYS.buyList);

        const parsedTaskList = storedTaskList ? JSON.parse(storedTaskList) : null;
        const parsedBuyList = storedBuyList ? JSON.parse(storedBuyList) : null;

        const validatedTaskList = parseTaskList(parsedTaskList);
        const validatedBuyList = parseTaskList(parsedBuyList);

        if (!validatedTaskList) {
          localStorage.setItem(STORAGE_KEYS.taskList, JSON.stringify(DEFAULT_TASK_LIST));
          setTaskList(DEFAULT_TASK_LIST);
        } else {
          setTaskList(validatedTaskList);
        }

        if (!validatedBuyList) {
          localStorage.setItem(STORAGE_KEYS.buyList, JSON.stringify(DEFAULT_BUY_LIST));
          setBuyList(DEFAULT_BUY_LIST);
        } else {
          setBuyList(validatedBuyList);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    }

    loadLocalStorage();
  }, []);

  const persist = useCallback((key: string, list: TaskList) => {
    localStorage.setItem(key, JSON.stringify(list));
  }, []);

  const addTask = useCallback((listKey: string, title: string, quantity?: number) => {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;
    const storageKey = listKey;

    const newTask = createTask(title, quantity);
    const updatedList: TaskList = { ...list, tasks: [...list.tasks, newTask] };

    setList(updatedList);
    persist(storageKey, updatedList);
  }, [taskList, buyList, persist]);

  const removeTask = useCallback((listKey: string, taskId: string) => {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;
    const storageKey = listKey;

    const updatedList: TaskList = {
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId),
    };

    setList(updatedList);
    persist(storageKey, updatedList);
  }, [taskList, buyList, persist]);

  const toggleTask = useCallback((listKey: string, taskId: string) => {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;
    const storageKey = listKey;

    const updatedList: TaskList = {
      ...list,
      tasks: list.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };

    setList(updatedList);
    persist(storageKey, updatedList);
  }, [taskList, buyList, persist]);

  return {
    taskList,
    buyList,
    loading,
    error,
    addTask,
    removeTask,
    toggleTask,
  };
}