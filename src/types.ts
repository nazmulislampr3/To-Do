export type Status = 0 | 1 | 2;
export type TaskToAdd = {
  title: string;
  status: Status;
  date: Date;
  tags: string[];
};
export type Task = {
  id: number;
} & TaskToAdd;

export type Func1 = () => void;
export type DeleteTask = (id: number) => void;
export type EditTask = (id: number, task: TaskToAdd) => void;
export type AddTask = (task: TaskToAdd) => void;
export type SetStatus = (id: number, status: Status) => void;
