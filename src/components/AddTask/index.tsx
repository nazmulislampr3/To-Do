import { useEffect, useRef, useState } from "react";
import { TaskToAdd } from "../../types";
import { useTaskContext } from "../../context/TaskContext";
import cn from "../../lib/utils/cn";

const AddTodo = () => {
  const {
    editTaskId,
    tasks,
    addTask,
    editTask: updateTask,
    setEditTaskId,
  } = useTaskContext()!;
  const editTask = editTaskId
    ? tasks.find(({ id: taskId }) => taskId === editTaskId)
    : null;

  const taskInit: TaskToAdd = {
    title: "",
    status: 0,
    tags: [],
    date: new Date(0),
  };
  const [task, setTask] = useState<TaskToAdd>(
    editTask
      ? {
          ...editTask,
        }
      : taskInit
  );

  const tags = [
    "HTML",
    "CSS",
    "JS",
    "React",
    "ExpressJS",
    "NodeJS",
    "NextJS",
    "ThreeJS",
  ];
  const inputRef = useRef<any>(null);

  useEffect(() => {
    if (!editTaskId) {
      setTask(taskInit);
    } else {
      const edit = editTaskId
        ? tasks.find(({ id: taskId }) => taskId === editTaskId)
        : null;

      if (edit) {
        setTask(edit);
        inputRef.current.focus();
      } else {
        setTask(taskInit);
      }
    }
  }, [editTaskId, tasks]);

  const handleChange = ({ target: { name, value } }: any) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="w-full max-w-2xl flex flex-col gap-1 items-center">
      <div className="flex w-full jusity-center items-center flex-col">
        <input
          ref={inputRef}
          className="w-full border-2 outline-0 border-slate-300 rounded-md px-2 py-1 lg:px-3 lg:py-2 text-lg lg:text-2xl font-semibold"
          placeholder="Enter your task"
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {tags.map((tag) => (
          <button
            className={cn(
              "px-3 lg:px-4 py-1.5 bg-slate-500 font-semibold text-slate-200 border-4 text-xs lg:text-sm border-transparent rounded-sm",
              {
                "border-green-500": task.tags.includes(tag),
              }
            )}
            onClick={() =>
              setTask((prev) => {
                let tags = [...prev.tags];
                if (tags.includes(tag)) {
                  tags = tags.filter((item) => item !== tag);
                } else {
                  tags = [...prev.tags, tag];
                }
                return { ...prev, tags };
              })
            }
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-3">
        <div>
          <select
            value={task.status | 0}
            className="px-3 py-2 font-bold text-sm cursor-pointer bg-slate-500 text-slate-200 outline-0"
            name="status"
            onChange={(e) =>
              handleChange({
                target: { name: "status", value: Number(e.target.value) },
              })
            }
          >
            <option value={0}>To do</option>
            <option value={1}>Doing</option>
            <option value={2}>Completed</option>
          </select>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-6">
        <button className="btn1 bg-slate-500" onClick={() => setTask(taskInit)}>
          Cancel
        </button>
        {!editTaskId ? (
          <button
            className="btn1 bg-green-500"
            onClick={() => {
              addTask({ ...task, date: new Date() });
              setEditTaskId(null);
            }}
          >
            Add
          </button>
        ) : (
          <button
            className="btn1 bg-green-500"
            onClick={() => {
              updateTask(editTaskId, task);
              setEditTaskId(null);
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
