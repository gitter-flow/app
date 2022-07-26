import * as React from 'react';
import {Button, TextField} from "@mui/material";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

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

const AddCommentary = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userId = props.userId  // replace with cookie value
  const publicationId = props.publicationId

  const AddThisCommentary = () => {
    fetch(`${process.env.REACT_APP_API_URL}/comment`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"content\":\"" + content.replaceAll("\n","\\n") + "\",\"publicationId\":\"" + props.publicationId + "\"}",
      "method": "POST"
    }).then(response => {response.json();navigate(0);}).catch(error => {});
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
            <label>Nouveau commentaire : </label>
          </div>
          <div>
            <textarea label="Enter your message" onChange={(e) => setContent(e.target.value)} style={{"min-width":"-webkit-fill-available","max-width":"-webkit-fill-available", "min-height":"4em", "max-height":"7em"}}/>
          </div>
          <Button variant="contained" onClick={handleClose}>Annuler</Button>
          <Button variant="contained" onClick={AddThisCommentary}>Valider</Button>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>Commenter</Button>
    </>
  );
}

export default AddCommentary;
