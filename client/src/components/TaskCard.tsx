import React from "react";
import { TaskObject } from "../lib/interfaces";
import { Paper } from "@mui/material";

const TaskCard: React.FC<{ tasks: TaskObject[] }> = ({ tasks }) => {

  return (
    <Paper className="task-card" elevation={2}>
      {!!tasks.length && tasks.map((task) => {
        const { id, title, description } = task;
        return (
          <div key={id}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        );
      })}
    </Paper>
  );
};

export default TaskCard;
