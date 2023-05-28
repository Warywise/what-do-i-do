import React, { useContext } from 'react';
import { Box } from '@mui/material';

import { TasksContext } from '../../lib/context';
import { TaskObject } from '../../lib/interfaces';
import TasksBoard from './TasksBoard';
import BoardCreate from './BoardCreate';

const BoardsBox: React.FC = () => {
  const { tasks } = useContext(TasksContext);
  const tasksKeys = Object.keys(tasks);

    return (
      <Box className="boards-box">
        {!!tasksKeys.length && tasksKeys.map((key) => {
          const tasksArray = tasks[key];
          return (
            <TasksBoard
              key={key}
              tasks={tasksArray as TaskObject[]}
              category={key}
            />
          );
        })}
        <BoardCreate />
      </Box>
    );
};

export default BoardsBox;
