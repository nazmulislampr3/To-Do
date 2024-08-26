import { useTaskContext } from "../../context/TaskContext";
import { Task as TaskType } from "../../types";

const Task = ({ task: { id, tags, title, status } }: { task: TaskType }) => {
  const { deleteTask, setEditTaskId, setStatus } = useTaskContext()!;

  const submitComplete = status === 0;
  const submitDone = submitComplete || status === 1;
  return (
    <div className="px-5 py-4 bg-sky-600 rounded-sm">
      <h3 className="font-bold text-slate-200 text-xl lg:text-2xl">{title}</h3>
      {tags.length >= 1 ? (
        <div className="flex gap-1 mt-2 flex-wrap">
          {tags.map((tag) => (
            <span className="text-xs font-semibold text-white px-3 py-1.5 bg-slate-700">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {submitComplete || submitDone ? (
        <div className="flex gap-3 mt-2">
          {submitComplete ? (
            <button
              className="btn2 bg-pink-700"
              onClick={() => setStatus(id, 1)}
            >
              Doing
            </button>
          ) : null}
          {submitDone ? (
            <button
              className="btn2 bg-pink-700"
              onClick={() => setStatus(id, 2)}
            >
              Done
            </button>
          ) : null}
        </div>
      ) : null}
      <div className="flex gap-3 mt-4">
        <button className="btn2 bg-green-700" onClick={() => setEditTaskId(id)}>
          Edit
        </button>
        <button className="btn2 bg-red-700" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
