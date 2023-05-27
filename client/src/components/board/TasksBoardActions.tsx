import React, { Dispatch, SetStateAction, useContext, useRef, useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction, TextField, Fab, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Dehaze';
import ColorIcon from '@mui/icons-material/PaletteTwoTone';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import ConfirmIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { TasksContext } from '../../lib/context';
import { deleteBoard, getBoardsColor, setBoardsColor as storeBoardColor } from '../../lib/utils';
import ConfirmModal from '../ConfirmModal';
import { TaskObject } from '../../lib/interfaces';

type BoardActionsProps = {
  boardColor: string;
  setBoardColor: Dispatch<SetStateAction<string>>;
  category: string;
};

const TasksBoardActions: React.FC<BoardActionsProps> = ({ boardColor, setBoardColor, category }) => {
  const { tasks, setTasks, setError } = useContext(TasksContext);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editingBoard, setEditingBoard] = useState(false);
  const colorRef = useRef<HTMLInputElement>(null);
  const currBoardColor = getBoardsColor(category) as string;

  const isBoardConcluded = () => (tasks[category] as TaskObject[]).every((task) => task.concludedAt);

  const handleDelete = async () => {
    const responseData = await deleteBoard(category);
    if (responseData.error) {
      setError(responseData.error as string);
    } else {
      setTasks(responseData);
    }
  };

  const confirmDelete = () => {
    if (isBoardConcluded()) {
      handleDelete();
    } else {
      setShowConfirmModal(true);
    }
  };

  const handleEdit = ({ target }: any) => {
    target.blur();
    setEditingBoard(true);
  };

  const saveBoardColor = () => {
    const color = colorRef.current?.value || boardColor;
    storeBoardColor(category, color);
    setBoardColor(color);
    setEditingBoard(false)
  }

  const actions = [
    { icon: <ColorIcon />, name: 'Color', onClick: handleEdit },
    { icon: <DeleteIcon />, name: 'Delete', onClick: confirmDelete },
  ];

  const BoardColorEditor = () => {
    return (
      <Slide direction="left" in={editingBoard} mountOnEnter unmountOnExit>
        <Box display="inline-flex" gap="1em" m="1em">
          <TextField
            type="color"
            label="Color"
            defaultValue={currBoardColor}
            InputLabelProps={{ shrink: true }}
            sx={{ width: '4em', zIndex: 8 }}
            size="small"
            variant="filled"
            inputRef={colorRef}
            autoFocus
          />
          <Fab color="success" onClick={saveBoardColor} size="small">
            <ConfirmIcon titleAccess="New Board" />
          </Fab>
          <Fab
            color="error"
            onClick={() => setEditingBoard(false)}
            size="small"
            title="Cancel"
          >
            <CancelIcon />
          </Fab>
        </Box>
      </Slide>
    )
  };

  return (
    <Box sx={{
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 8,
    }}>
      {!editingBoard && <SpeedDial
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
            title={name}
            icon={<>{icon}{name}</>}
            FabProps={{ variant: 'extended' }}
            onClick={onClick}
          />
        ))}
      </SpeedDial>}
      <BoardColorEditor />
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
