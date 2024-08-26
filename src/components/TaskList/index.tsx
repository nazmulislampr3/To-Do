import { Task as TaskType } from "../../types";
import Task from "../Task";

const TaskList = ({ tasks, title }: { tasks: TaskType[]; title: string }) => {
  return (
    <div className="">
      <h2 className="font-bold text-4xl text-slate-700">{title}</h2>
      <div className="flex flex-col gap-1.5 mt-4">
        {tasks.map((item) => (
          <Task task={item} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
