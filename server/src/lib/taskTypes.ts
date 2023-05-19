export type TaskObject = {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  concludedAt: string | null;
};

export type TaskFile = {
  [key: string]: Array<TaskObject>;
};
