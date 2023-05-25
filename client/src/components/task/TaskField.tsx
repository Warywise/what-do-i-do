import React, { SyntheticEvent, useContext, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, Typography } from '@mui/material';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/DeleteForever';

import { TaskObject } from '../../lib/interfaces';
import { deleteTask } from '../../lib/utils';
import { TasksContext } from '../../lib/context';
import TaskInput from './TaskInput';
import ConfirmModal from '../ConfirmModal';

type TaskFieldProps = {
  category: string;
  expanded: boolean;
  onChange: (id: string) => (ev: SyntheticEvent, expanded: boolean) => void;
} & TaskObject;

const TaskField: React.FC<TaskFieldProps> = (props) => {
  const { setTasks } = useContext(TasksContext);
  const { category, id, title, description, createdAt, concludedAt, expanded, onChange } = props;

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleDeleteTask = async () => {
    const responseData = await deleteTask({ id, category });
    setTasks(responseData);
  }

  const confirmDeleteTask = async () => {
    if (concludedAt) {
      await handleDeleteTask();
    } else {
      setShowConfirmModal(true);
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
          color="warning"
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
        <Typography className="task-field-title" minWidth="40%" textAlign="start" variant="button">
          {title}
        </Typography>
        <Typography color="GrayText" className="task-field-description">
          {description
            ? (description.length > 60 ? `${description.slice(0, 60)}...` : description)
            : 'No description'}
        </Typography>
      </AccordionSummary>
      <TaskInput
        category={category}
        previousTitle={title}
        previousDescription={description as string}
        expand={isEditing}
        setExpand={setIsEditing}
        taskId={id}
      />
      <TaskActions />
      <AccordionDetails className="task-expand-details" sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography textAlign="start" sx={{ color: 'text.secondary' }}>
          {description || 'No description'}
        </Typography>
        <Box>
          <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
            Criada em: {new Date(createdAt).toLocaleDateString()}
          </Typography>
          <Typography textAlign="start" sx={{ color: 'text.secondary' }}>
            {concludedAt
              ? `Concluída em: ${new Date(concludedAt).toLocaleDateString()}`
              : 'Não concluída'}
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