import { useContext } from "react";
import { MyContext } from "../App";
import { TaskList } from "./TaskList";

export default function TaskListsView() {
  const context = useContext(MyContext);
  return (
    <div>
      {context.tasks.map((task: string, index: number) => (
        <TaskList key={index} taskvalue={task} indexNum={index} />
      ))}
    </div>
  );
}
