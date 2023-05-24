import React from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import MenuIcon from '@mui/icons-material/Dehaze';
import PlusIcon from '@mui/icons-material/Add';

import EditIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const TaskActions: React.FC = () => {

  const actions = [
    { icon: <EditIcon />, name: 'Edit', onClick: () => console.log('Edit Board') },
    { icon: <DeleteIcon />, name: 'Delete', onClick: () => console.log('Delete Board') },
  ];

  return (
    <Box sx={{
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 8,
    }}>
      <SpeedDial
        ariaLabel="tasks-actions"
        title='Board Options'
        icon={
          <SpeedDialIcon
            icon={<MenuIcon />}
            openIcon={<MenuIcon style={{ transform: 'rotate(90deg)' }} />}
          />}
        direction="left"
      >
        {actions.map(({ name, icon, onClick }) => (
          <SpeedDialAction
            key={name}
            icon={<>{icon}{name}</>}
            FabProps={{ variant: 'extended' }}
            onClick={onClick}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default TaskActions;
