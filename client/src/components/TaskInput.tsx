import React, { ChangeEvent, Dispatch, MutableRefObject, SetStateAction, useContext, useRef, useState } from 'react';
import { Box, CircularProgress, Fab, Grow, Paper, TextField, Typography } from '@mui/material';
import CreateIcon from '@mui/icons-material/AddTask';
import CancelIcon from '@mui/icons-material/Cancel';

import { TasksContext } from '../lib/context';
import { createTask, updateTask } from '../lib/utils';

type TaskInputProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  category: string;
  previousTitle?: string;
  previousDescription?: string;
  taskId?: string,
};

const TaskInput: React.FC<TaskInputProps> = ({
  expand,
  setExpand,
  category,
  previousTitle = '',
  previousDescription = '',
  taskId,
}) => {
  const { setTasks } = useContext(TasksContext);

  const [title, setTitle] = useState(previousTitle);
  const [description, setDescription] = useState(previousDescription);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef<HTMLInputElement & { focused: boolean }>() as MutableRefObject<HTMLInputElement & { focused: boolean }>;

  const isFocused = () => (titleRef.current.focused = true);

  const wasFocused = () => titleRef.current?.focused;

  const titleIsValid = () => !!title && !!title.length;

  const handleChange = (setState: Dispatch<SetStateAction<string>>) =>
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setState(target.value);
    };

  const handleCreateTask = async () => {
    setLoading(true);
    console.log(title, description);

    if (titleIsValid()) {
      const responseData = taskId
        ? await updateTask({ id: taskId, title, description, category })
        : await createTask({ title, description, category });

      setTasks(responseData);
      setExpand(false);
    }
    setLoading(false);
  };

  return (
    <Grow in={expand} mountOnEnter unmountOnExit>
      <Paper elevation={3} sx={{ borderRadius: 4, mt: 1, mb: taskId && 1 }}>
        <Typography color="green" display="inline" textAlign="center" variant="overline">
          {taskId ? 'Upadte Task:' : 'New Task:'}
        </Typography>
        <Box display="inline-flex" justifyContent="center" gap="1em" margin="1em">
          <TextField
            label="Title"
            ref={titleRef}
            onBlur={isFocused}
            error={!titleIsValid() && wasFocused()}
            onError={() => titleRef.current.focus()}
            onChange={handleChange(setTitle)}
            helperText={!titleIsValid() && wasFocused() ? 'Title is required' : ''}
            value={title}
            required
          />
          <TextField
            label="Description"
            onChange={handleChange(setDescription)}
            value={description}
          />
        </Box>
        <Box
          display="inline-flex"
          justifyContent="center"
          alignItems="center"
          gap="1em"
          marginX="1em"
        >
          <Fab
            title="Create task"
            variant="extended"
            color="success"
            onClick={handleCreateTask}
            disabled={!titleIsValid() || loading}
          >
            {loading
              ? <CircularProgress size="1em" color="success" />
              : <CreateIcon sx={{ m: 1 }} />}
          </Fab>
          <Fab
            title="Cancel"
            variant="extended"
            color="error"
            onClick={() => setExpand(false)}
          >
            <CancelIcon sx={{ m: 1 }} />
          </Fab>
        </Box>
      </Paper>
    </Grow>
  );
};

export default TaskInput;
