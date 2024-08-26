import { ReactNode, useEffect, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { AddTask, DeleteTask, EditTask, SetStatus, Task } from "../types";

const taskContext = createContext<{
  tasks: Task[];
  addTask: AddTask;
  editTask: EditTask;
  deleteTask: DeleteTask;
  setStatus: SetStatus;
  editTaskId: number | null;
  setEditTaskId: React.Dispatch<React.SetStateAction<number | null>>;
} | null>(null);

const TaskContextProvider = ({ children }: { children: ReactNode }) => {
  const storedTasks = localStorage.getItem("tasks");
  const [tasks, setTasks] = useState<Task[]>(
    storedTasks ? JSON.parse(storedTasks) : []
  );
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const addTask: AddTask = (task) => {
    setTasks((prev) => [
      { id: (prev[prev.length - 1]?.id || 0) + 1, ...task },
      ...prev,
    ]);
  };

  const editTask: EditTask = (id, { date, status, title, tags }) => {
    setTasks((prev) => {
      const copy = [...prev];
      const findTask = copy.find(({ id: taskId }) => taskId === id);
      if (findTask) {
        findTask.title = title;
        findTask.status = status;
        findTask.date = date;
        findTask.tags = tags;
      }

      return copy;
    });
  };

  const deleteTask: DeleteTask = (id) => {
    setTasks((prev) => {
      const copy = [...prev].filter(({ id: taskId }) => taskId !== id);
      return copy;
    });
  };

  const setStatus: SetStatus = (id, status) => {
    setTasks((prev) => {
      const copy = [...prev];
      const targetTask = copy.find(({ id: taskId }) => id === taskId);
      if (targetTask) {
        targetTask.status = status;
        targetTask.date = new Date();
      }
      return copy;
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <taskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        editTask,
        setStatus,
        setEditTaskId,
        editTaskId,
      }}
    >
      {children}
    </taskContext.Provider>
  );
};

export default TaskContextProvider;

export const useTaskContext = () =>
  useContextSelector(taskContext, (states) => states);
