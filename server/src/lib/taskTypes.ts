export type TaskObject = {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  concludedAt: Date | null;
};

export type TaskFile = {
  [key: string]: Array<TaskObject>;
};
