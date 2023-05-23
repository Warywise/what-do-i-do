import React, { useContext } from "react";
import { TasksContext } from "../lib/context";
import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

const TasksBox: React.FC = () => {
  const { tasks } = useContext(TasksContext);
  const tasksKeys = Object.keys(tasks);

    return (
      <Box className="tasks-box">
        {tasksKeys.map((key) => {
          const tasksArray = tasks[key];
          return (
            <TaskCard key={key} tasks={tasksArray} category={key} />
          );
        })}
      </Box>
    );
};

export default TasksBox;
