import React, { MouseEvent, SyntheticEvent, useContext, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, Typography, Divider } from '@mui/material';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import ConcludedIcon from '@mui/icons-material/TaskAltRounded';

import { TaskObject } from '../../lib/interfaces';
import { deleteTask, updateTask } from '../../lib/utils';
import { TasksContext } from '../../lib/context';
import TaskInput from './TaskInput';
import ConfirmModal from '../ConfirmModal';

type TaskFieldProps = {
  category: string;
  expanded: boolean;
  onChange: (id: string) => (ev: SyntheticEvent, expanded: boolean) => void;
} & TaskObject;

const TaskField: React.FC<TaskFieldProps> = (props) => {
  const { setTasks, setError } = useContext(TasksContext);
  const { category, id, title, description, createdAt, concludedAt, expanded, onChange } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteTask = async () => {
    const responseData = await deleteTask({ id, category });
    if (responseData.error) {
      setError(responseData.error as string);
    } else {
      setTasks(responseData);
    }
  }

  const confirmDeleteTask = async () => {
    if (concludedAt) {
      await handleDeleteTask();
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleConcludeTask = async (ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    ev.stopPropagation();
    const responseData = await updateTask({ id, category, concluded: !concludedAt });
    if (responseData.error) {
      setError(responseData.error as string);
    } else {
      setTasks(responseData);
    }
  };

  const TaskActions = () => {
    return (
      <Typography className="task-field-actions">
        <Fab
          color="success"
          variant="extended"
          size="small"
          sx={{ boxShadow: 'none' }}
          title="Edit task"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="error"
          variant="extended"
          size="small"
          sx={{ boxShadow: 'none' }}
          title="Delete task"
          onClick={confirmDeleteTask}
        >
          <DeleteIcon />
        </Fab>
      </Typography>
    );
  };

  return (
    <Accordion
      expanded={expanded || isEditing}
      onChange={onChange(id)}
      className="task-field"
    >
      <AccordionSummary expandIcon={<ExpandIcon className="expand-icon" />}>
        <Fab
          className="task-field-status"
          size="small"
          color={concludedAt ? 'success' : 'default'}
          onClick={handleConcludeTask}
          title={concludedAt ? 'Task concluded' : 'Conclude task'}
        >
          <ConcludedIcon className="concluded-icon" />
        </Fab>
        <Typography className="task-field-title" minWidth="40%" textAlign="start" variant="button" color="success">
          {concludedAt ? <s>{title}</s> : title}
        </Typography>
        {!expanded && <Typography color="GrayText" className="task-field-description">
          {description
            ? (description.length > 60 ? `${description.slice(0, 60)}...` : description)
            : 'No description'}
        </Typography>}
        <TaskActions />
      </AccordionSummary>
      <TaskInput
        category={category}
        previousTitle={title}
        previousDescription={description as string}
        expand={isEditing}
        setExpand={setIsEditing}
        taskId={id}
      />
      <AccordionDetails className="task-expand-details" sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography textAlign="start" color="InfoText" maxWidth="75%">
          {description || 'No description'}
        </Typography>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{ ml: 1, mr: 1.5 }}
          flexItem
        />
        <Box>
          <Typography textAlign="center" color="InfoText" mb="1em">
            Created at: {new Date(createdAt).toLocaleDateString()}
          </Typography>
          <Typography textAlign="start" color="InfoText">
            {concludedAt
              ? `Concluded at: ${new Date(concludedAt).toLocaleDateString()}`
              : 'Not concluded'}
          </Typography>
        </Box>
      </AccordionDetails>
      {showConfirmModal && <ConfirmModal
        open={showConfirmModal}
        setOpen={setShowConfirmModal}
        actionCallback={handleDeleteTask}
        sectionTitle={title}
        section='task'
      />}
    </Accordion >
  );
};

export default TaskField;
