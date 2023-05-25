type TaskInfos = {
  title: string;
  description?: string | null;
};

type TaskBase = {
  id: string;
} & TaskInfos;

export interface CreateTaskPayload extends TaskInfos {
  category: string;
}

export interface UpdateTaskPayload extends TaskBase {
  concluded?: boolean;
  category: string;
}

export interface DeleteTaskPayload {
  id: string;
  category: string;
}

export interface TaskObject extends TaskBase {
  createdAt: string;
  concludedAt: string | null;
}

export type TasksData = {
  [key: string]: Array<TaskObject>;
};
