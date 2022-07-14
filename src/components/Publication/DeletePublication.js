import * as React from 'react';
import {Button, TextField} from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useCookies } from 'react-cookie';

const style_modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const DeletePublication = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = props.userId  // replace with cookie value
  const publicationId = props.publicationId

  const AddThisCommentary = () => {
    fetch(`${process.env.REACT_APP_API_URL}/publication`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"id\":\"" + props.publicationId + "\"}",
      "method": "DELETE"
    });
    handleClose();
  };
  return(
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_modal}>
          <div>
            <label>Confirmer la suppression ?</label>
          </div>
          <Button variant="contained" onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={AddThisCommentary}>Valider</Button>
        </Box>
      </Modal>
      <ListItemIcon style={{textAlign:'', "cursor": "pointer"}}>
        <Tooltip title="Supprimer">
          <DeleteIcon onClick={handleOpen} />
        </Tooltip>
      </ListItemIcon>
    </>
  );
}

export default DeletePublication;