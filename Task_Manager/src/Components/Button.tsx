import { MouseEventHandler } from "react";

interface buttonProps {
  value: string;
  color?: "primary" | "secondary" | "danger";
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler;
}

export default function Button({
  value,
  color = "primary",
  type = "submit",
  onClick,
}: buttonProps) {
  return (
    <button type={type} className={"btn btn-" + color} onClick={onClick}>
      {value}
    </button>
  );
}
