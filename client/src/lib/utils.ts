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

export const createBoard = async (name: string): Promise<TasksData> => {
  return await fetcher(CATEGORY_URL, 'POST', { name });
}

export const deleteBoard = async (name: string): Promise<TasksData> => {
  return await fetcher(CATEGORY_URL, 'DELETE', { name });
}

const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

export const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
}

export const getBoardsColor = (category?: string) => {
  const boardsColor = JSON.parse(localStorage.getItem('boardsColor') || '{}') as { [k: string]: string };
  if (category) {
    const color = boardsColor[category];
    return color ?? getRandomColor();
  }

  return boardsColor;
}

export const setBoardsColor = (category: string, color: string): void => {
  const boardsColor = getBoardsColor() as { [k: string]: string };
  boardsColor[category] = color;
  localStorage.setItem('boardsColor', JSON.stringify(boardsColor));
}

// https://stackoverflow.com/questions/12043187/how-to-check-if-hex-color-is-too-black
export const isBoardDark = (boardColor: string): boolean => {
  const hex = boardColor.replace('#', '');
  const rgb = parseInt(hex, 16);  // convert rrggbb to decimal
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return brightness < 85;
}
