import AddTodo from "./components/AddTask";
import AllTasks from "./components/AllTasks";

const App = () => {
  return (
    <div className="bg-blue-300 min-h-screen px-2 py-4">
      <div className="w-full flex justify-center">
        <div className="w-full flex items-center justify-center flex-col max-w-7xl">
          <AddTodo />
          <AllTasks />
        </div>
      </div>
    </div>
  );
};

export default App;
