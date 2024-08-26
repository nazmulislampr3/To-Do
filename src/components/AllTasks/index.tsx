import { useTaskContext } from "../../context/TaskContext";
import TaskList from "../TaskList";

const AllTasks = () => {
  const { tasks } = useTaskContext()!;
  const todoTasks = tasks.filter(({ status }) => status === 0);
  const doingTasks = tasks
    .filter(({ status }) => status === 1)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  const completedTasks = tasks
    .filter(({ status }) => status === 2)
    .sort((a, b) => b.date.getTime() - a.date.getTime());
  return (
    <div className="w-full mt-6 grid grid-cols-3 gap-2">
      <TaskList tasks={todoTasks} title="To do" />
      <TaskList tasks={doingTasks} title="Doing" />
      <TaskList tasks={completedTasks} title="Completed" />
    </div>
  );
};

export default AllTasks;
