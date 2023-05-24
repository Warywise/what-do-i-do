import React, { SyntheticEvent } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { TaskObject } from '../lib/interfaces';

type TaskFieldProps = {
  category: string;
  expanded: boolean;
  onChange: (id: string) => (ev: SyntheticEvent, expanded: boolean) => void;
} & TaskObject;

const TaskField: React.FC<TaskFieldProps> = (props) => {
  const { category, id, title, description, createdAt, concludedAt, expanded, onChange } = props;

  return (
    <Accordion expanded={expanded} onChange={onChange(id)}>
      <AccordionSummary expandIcon={<ExpandMore />} >
        <Typography textAlign="start" sx={{ width: '33%', flexShrink: 0 }}>
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {description || 'No description'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
