import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionCallback: () => Promise<void>;
  section: string;
  sectionTitle: string;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, setOpen, actionCallback, section, sectionTitle }) => {
  const [confirm, setConfirm] = useState(false);

  const modalTitle = `The ${section} will be permanently deleted. Are you sure?`;
  const modalDescription = `You haven't yet concluded the "${sectionTitle}" ${section}!`;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function handleCallback() {
      await actionCallback();
    }

    if (confirm) {
      handleCallback();
      setConfirm(false);
      handleClose()
    }
  }, [confirm]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {modalDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button startIcon onClick={handleClose}>Disagree</Button>
          <Button startIcon onClick={() => setConfirm(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmModal;
