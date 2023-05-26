import React, { SyntheticEvent, useContext } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { TasksContext } from '../lib/context';

const InfoBar: React.FC = () => {
  const { error, setError } = useContext(TasksContext);

  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason !== 'clickaway') {
      return setError(null);
    }
  };

  const action = (
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </div>
  );
};

export default InfoBar;
