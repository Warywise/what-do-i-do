import React, { useContext, useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import MenuIcon from '@mui/icons-material/Dehaze';
import ColorIcon from '@mui/icons-material/PaletteTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteForever';

import { TasksContext } from '../../lib/context';
import { deleteBoard } from '../../lib/utils';
import ConfirmModal from '../ConfirmModal';

const TasksBoardActions: React.FC<{ category: string }> = ({ category }) => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isBoardConcluded = () => tasks[category].every((task) => task.concludedAt);

  const handleDelete = async () => {
    const responseData = await deleteBoard(category);
    setTasks(responseData);
  };

  const confirmDelete = () => {
    if (isBoardConcluded()) {
      handleDelete();
    } else {
      setShowConfirmModal(true);
    }
  };

  const actions = [
    { icon: <ColorIcon />, name: 'Color', onClick: () => console.log('Edit Board') },
    { icon: <DeleteIcon />, name: 'Delete', onClick: confirmDelete },
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
        ariaLabel="tasks-board-actions"
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
      <ConfirmModal
        open={showConfirmModal}
        setOpen={setShowConfirmModal}
        actionCallback={handleDelete}
        section="board"
        sectionTitle={category}
      />
    </Box>
  );
}

export default TasksBoardActions;
