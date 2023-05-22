import React, {
  createContext, Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { TasksData } from '../interfaces';

const TASKS_URL = 'http://localhost:5000/tasks';

type InitialContext = {
  tasks: TasksData,
};

export const TasksContext = createContext({} as InitialContext);

const TasksProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  const [tasks, setTasks] = useState<TasksData>({});

  const fetchTasks = async () => {
    const tasksData = await fetch(TASKS_URL)
      .then((res) => res.json()).then((data) => data);
    setTasks(tasksData);
  };

  useEffect(() => { fetchTasks() }, []);

  const value = {
    tasks,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
