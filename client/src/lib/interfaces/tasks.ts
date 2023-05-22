export type TaskObject = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  concludedAt: string | null;
};

export type TasksData = {
  [key: string]: Array<TaskObject>;
};
