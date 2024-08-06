import { createContext, useState } from "react";
import { TaskInput } from "./Components/TaskInput";
import TaskListsView from "./Components/TaskListsView";

interface contextData {
  tasks: string[];
  setTasks: React.Dispatch<React.SetStateAction<string[]>>;
  taskText: string;
  setTaskText: React.Dispatch<React.SetStateAction<string>>;
}
export const MyContext = createContext({} as contextData);

function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskText, setTaskText] = useState<string>("");

  return (
    <MyContext.Provider value={{ tasks, setTasks, taskText, setTaskText }}>
      <TaskInput />
      <TaskListsView />
    </MyContext.Provider>
  );
}

export default App;
