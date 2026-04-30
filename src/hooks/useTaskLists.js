const STORAGE_KEYS = {
  taskList: "defaultTaskList",
  buyList: "defaultBuyList",
};

const DEFAULT_TASK_LIST = {
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

const DEFAULT_BUY_LIST = {
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

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function parseTaskList(data) {
  if (data === null || typeof data !== "object") return null;
  if (typeof data.id !== "string") return null;
  if (typeof data.title !== "string") return null;
  if (!Array.isArray(data.tasks)) return null;
  return data;
}

function createTask(title, quantity) {
  return {
    id: generateId(),
    title,
    quantity,
    completed: false,
  };
}

function useTaskLists() {
  let taskList = DEFAULT_TASK_LIST;
  let buyList = DEFAULT_BUY_LIST;
  let loading = true;
  let error = null;
  const listeners = [];

  function setTaskList(value) {
    taskList = value;
    notify();
  }

  function setBuyList(value) {
    buyList = value;
    notify();
  }

  function setLoading(value) {
    loading = value;
    notify();
  }

  function setError(value) {
    error = value;
    notify();
  }

  function notify() {
    listeners.forEach((fn) => fn());
  }

  function subscribe(fn) {
    listeners.push(fn);
    return () => {
      const index = listeners.indexOf(fn);
      if (index > -1) listeners.splice(index, 1);
    };
  }

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

  function persist(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  function addTask(listKey, title, quantity) {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;

    const newTask = createTask(title, quantity);
    const updatedList = { ...list, tasks: [...list.tasks, newTask] };

    setList(updatedList);
    persist(listKey, updatedList);
  }

  function removeTask(listKey, taskId) {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;

    const updatedList = {
      ...list,
      tasks: list.tasks.filter((task) => task.id !== taskId),
    };

    setList(updatedList);
    persist(listKey, updatedList);
  }

  function toggleTask(listKey, taskId) {
    const isBuyList = listKey === STORAGE_KEYS.buyList;
    const list = isBuyList ? buyList : taskList;
    const setList = isBuyList ? setBuyList : setTaskList;

    const updatedList = {
      ...list,
      tasks: list.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };

    setList(updatedList);
    persist(listKey, updatedList);
  }

  function getState() {
    return {
      taskList,
      buyList,
      loading,
      error,
    };
  }

  return {
    getState,
    subscribe,
    loadLocalStorage,
    addTask,
    removeTask,
    toggleTask,
  };
}