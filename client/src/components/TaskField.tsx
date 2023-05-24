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
      <Typography
        display="flex"
        gap="32px"
        position="absolute"
        right="10%"
        top="12px"
        zIndex="9"
        visibility="visible"
      >
        <Fab color="success" variant="extended" size="medium" sx={{ boxShadow: 'none' }}>
          <EditIcon />
        </Fab>
        <Fab color="warning" variant="extended" size="medium" sx={{ boxShadow: 'none' }}>
          <DeleteIcon />
        </Fab>
      </Typography>
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange(id)}
      sx={{ backgroundColor: '#f9f9f9', position: 'relative', padding: 1 }}
    >
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography width="33%" textAlign="start" variant="button">
          {title}
        </Typography>
        <Typography
          width="calc(43% - 10vmin)"
          className='task-expand-description'
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          color="GrayText"
          textAlign="left"
        >
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
