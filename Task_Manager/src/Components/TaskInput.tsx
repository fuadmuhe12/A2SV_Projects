import { MouseEvent, useContext } from "react";
import Button from "./Button";
import { MyContext } from "../App";

export function TaskInput() {
  const context = useContext(MyContext);
  console.log();
  const HandleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setTaskText(e.target.value);
  };

  const HandleTaskAdd = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (context.taskText != "") {
      context.setTasks([...context.tasks, context.taskText]);
      context.setTaskText("");
    } else {
      alert("Nothing to Add");
    }
  };

  return (
    <form>
      <label htmlFor="inputField"></label>
      <input
        type="text"
        id="inputField"
        value={context.taskText}
        onChange={HandleTaskInputChange}
      />
      <Button value="Add" onClick={HandleTaskAdd} />
    </form>
  );
}
