import React from "react";
import "./button.css";

const Button = ({ onClick, title, style = {} }) => {
  return (
    <button style={style} className="post-task-btn" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
