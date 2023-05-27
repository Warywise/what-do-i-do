import React, {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { TasksData } from '../interfaces';
import { TASKS_URL } from '../utils';

type InitialContext = {
  tasks: TasksData,
  setTasks: Dispatch<SetStateAction<TasksData>>,
  error: string | null,
  setError: Dispatch<SetStateAction<string | null>>,
};

export const TasksContext = createContext({} as InitialContext);

const TasksProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [tasks, setTasks] = useState<TasksData>({});
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    const tasksData = await fetch(TASKS_URL)
      .then((res) => res.json()).then((data) => data);
    setTasks(tasksData);
  };

  useEffect(() => { fetchTasks() }, []);

  const value = {
    tasks,
    setTasks,
    error,
    setError,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
