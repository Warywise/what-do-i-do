import React, { SyntheticEvent } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Fab, Typography } from '@mui/material';
import { TaskObject } from '../lib/interfaces';

import ExpandIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/DeleteForever';

type TaskFieldProps = {
  category: string;
  expanded: boolean;
  onChange: (id: string) => (ev: SyntheticEvent, expanded: boolean) => void;
} & TaskObject;

const TaskField: React.FC<TaskFieldProps> = (props) => {
  const { category, id, title, description, createdAt, concludedAt, expanded, onChange } = props;

  const TaskActions = () => {
    return (
      <Typography className="task-field-actions">
        <Fab
          color="success"
          variant="extended"
          size='medium'
          sx={{ boxShadow: 'none' }}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="warning"
          variant="extended"
          size='medium'
          sx={{ boxShadow: 'none' }}
        >
          <DeleteIcon />
        </Fab>
      </Typography>
    );
  };

  return (
    <Accordion
      expanded={expanded}
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
    </Accordion >
  );
};

export default TaskField;
