import { CreateTaskPayload, DeleteTaskPayload, TasksData, UpdateTaskPayload } from "./interfaces";

export const TASKS_URL = 'http://localhost:5000/tasks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetcher = async (URL: string, method: string, payload: { [key: string]: any }): Promise<TasksData> => {
  const response = await fetch(URL, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  return data;
}

export const createTask = async (task: CreateTaskPayload): Promise<TasksData> => {
  return await fetcher(TASKS_URL, 'POST', task);
}

export const updateTask = async (task: UpdateTaskPayload): Promise<TasksData> => {
  return await fetcher(TASKS_URL, 'PATCH', task);
}

export const deleteTask = async (task: DeleteTaskPayload): Promise<TasksData> => {
  return await fetcher(TASKS_URL, 'DELETE', task);
}

// - - - //

export const CATEGORY_URL = 'http://localhost:5000/category';

export const createBoard = async (category: string): Promise<TasksData> => {
  return await fetcher(CATEGORY_URL, 'POST', { category });
}

export const deleteBoard = async (category: string): Promise<TasksData> => {
  return await fetcher(CATEGORY_URL, 'DELETE', { category });
}
