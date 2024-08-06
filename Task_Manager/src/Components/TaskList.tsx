import Button from "./Button";
import { MyContext } from "../App";
import { useContext } from "react";

interface TaskListProps {
  taskvalue: string;
  indexNum: number;
}
export function TaskList(props: TaskListProps) {
  const context = useContext(MyContext);
  const HandleDelete = () => {
    console.log("clieded", props.indexNum);
    context.setTasks(context.tasks.filter((_, i) => i != props.indexNum));
  };
  const HandleEdit = () => {
    context.setTaskText(context.tasks[props.indexNum]);
    context.setTasks(context.tasks.filter((_, i) => i != props.indexNum));
  };
  return (
    <li>
      <p>{props.taskvalue}</p>
      <div className="wrapper">
        <Button value="Edit" color="secondary" onClick={HandleEdit} />
        <Button value="Delete" color="danger" onClick={HandleDelete} />
      </div>
    </li>
  );
}
