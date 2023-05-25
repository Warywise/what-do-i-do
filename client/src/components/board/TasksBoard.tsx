import React, { useState } from 'react';
import { Collapse, Fab, Paper } from '@mui/material';
import CreateIcon from '@mui/icons-material/AddTask';

import { TaskObject } from '../../lib/interfaces';
import TaskField from '../task/TaskField';
import TasksBoardActions from './TasksBoardActions';
import TaskInput from '../task/TaskInput';

const TasksBoard: React.FC<{ tasks: TaskObject[], category: string }> = ({ tasks, category }) => {

  const [expanded, setExpanded] = useState('');
  const [collapseIn, setCollapseIn] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);

  const handleExpand = (taskId: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? taskId : '');
  };

  return (
    <Collapse
      in={collapseIn}
      collapsedSize={132}
      className={`tasks-board-collapse${collapseIn ? '' : ' collapsed'}`}
      sx={{ boxShadow: collapseIn ? 'none' : '' }}
    >
      <Paper
        className="tasks-board"
        elevation={2}
        sx={{ backgroundColor: category === 'general' ? '#efe5e5' : '#aef5f5' }}
      >
        <Paper
          className="tasks-board-header"
          elevation={0}
          sx={{ backgroundColor: category === 'general' ? '#efe5e5' : '#aef5f5' }}
          onClick={() => setCollapseIn(!collapseIn)}
        >
          <h2>{category}</h2>
        </Paper>
        <TasksBoardActions />
        {!!tasks.length && tasks.map((task) => {
          return (
            <TaskField
              key={task.id}
              expanded={expanded === task.id}
              onChange={handleExpand}
              category={category}
              {...task}
            />
          );
        })}
        {showTaskInput
          ? <TaskInput
            expand={showTaskInput}
            setExpand={setShowTaskInput}
            category={category}
          />
        : <Fab
            title="New task"
            variant="extended"
            color='success'
            className='new-task'
            onClick={() => setShowTaskInput(true)}
          >
            <CreateIcon sx={{ m: 1 }} />
            New task
          </Fab>}
      </Paper>
    </Collapse>
  );
};

export default TasksBoard;
