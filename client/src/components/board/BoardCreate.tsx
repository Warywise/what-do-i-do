import React, { useContext, useEffect, useState } from 'react';
import { Box, Fab, Grow, Paper, TextField } from '@mui/material';
import CraeteFolderIcon from '@mui/icons-material/CreateNewFolder';
import ConfirmIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

import { createBoard, getRandomColor, setBoardsColor } from '../../lib/utils';
import { TasksContext } from '../../lib/context';

const BoardCreate: React.FC = () => {
  const { setTasks, setError } = useContext(TasksContext);
  const [creatingBoard, setCreatingBoard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const [color, setColor] = useState(getRandomColor());

  const saveBoardColor = () => {
    setBoardsColor(category, color);
  }

  const handleCreateBoard = async () => {
    if (creatingBoard) {
      setLoading(true);

      const responseData = await createBoard(category.toLowerCase());
      if (responseData.error) {
        setError(responseData.error as string);
      } else {
        setTasks(responseData);
        saveBoardColor();
      }

      setLoading(false);
    }

    setCreatingBoard(!creatingBoard);
  }

  useEffect(() => {
    if (!creatingBoard && category.length) {
      setCategory('');
    }
  }, [creatingBoard]);

  return (
    <Paper
      className="tasks-board board-create"
      elevation={2}
      sx={{ backgroundColor: color }}
    >
      <Paper className="tasks-board-header" elevation={0} sx={{ backgroundColor: color }}>
        <h2>{category}</h2>
      </Paper>
      <Grow in={creatingBoard} mountOnEnter unmountOnExit>
        <Box display="inline-flex" gap="1em" m="1em">
          <TextField
            label="Name"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          />
          <TextField
            type="color"
            label="Color"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
            sx={{ width: '4em' }}
          />
        </Box>
      </Grow>
      <Fab
        variant="extended"
        color="success"
        className={creatingBoard ? '' : 'new-board'}
        onClick={handleCreateBoard}
        size={creatingBoard ? 'small' : 'large'}
        disabled={loading || (creatingBoard && !category.length)}
      >
        {creatingBoard
          ? <ConfirmIcon sx={{ m: 1 }} titleAccess="Create Board" />
          : <CraeteFolderIcon sx={{ m: 1 }} titleAccess="New Board" />}
        {!creatingBoard && 'New board'}
      </Fab>
      {creatingBoard && (
        <Fab
          variant="extended"
          color="error"
          onClick={() => setCreatingBoard(false)}
          size="small"
          title="Cancel"
        >
          <CancelIcon sx={{ m: 1 }} />
        </Fab>
      )}
    </Paper>
  );
};

export default BoardCreate;
