import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import TaskContextProvider from "./context/TaskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <TaskContextProvider>
    <App />
  </TaskContextProvider>
);
