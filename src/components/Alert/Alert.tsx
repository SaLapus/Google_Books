import React from "react";
import "./Alert.sass";

interface IAlertProps {
  message: string;
}
function Alert({ message }: IAlertProps) {
  return (
    <div className="Alert">
      <span>{message}</span>
    </div>
  );
}

export default Alert;
