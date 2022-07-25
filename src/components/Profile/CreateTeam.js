import * as React from "react";
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';

const CreateTeam = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  function addTeam() {
    handleOpen();
  }

  const creation = async(e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/team`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "credentials": 'include',
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"teamName\":\""+ content +"\"}",
      "method": "POST"
    }).then(response => {
      const resp = response.json();
      console.log("_________________")
      console.log(resp)
      console.log(props.team)
      console.log("_________________")
      // props.team.add()
    
    }).catch(error => {});
    handleClose();
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <u>Créer une équipe</u>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <label>Nom du groupe :</label>
              </Grid>
              <Grid item xs={9}>
                <input type={"text"} onChange={(e) => setContent(e.target.value)} style={{"minWidth":"-webkit-fill-available","maxWidth":"-webkit-fill-available"}}/>
              </Grid>
              <Grid item xs={3}>
                <Button color={"success"} variant="contained" onClick={(e => {creation(e)})} style={{"margin": "1em"}}>Confirmer</Button>
              </Grid>
            </Grid>
          </Typography>
        </Box>
      </Modal>
      <Button variant="outlined" onClick={addTeam}>Créer une équipe</Button>
    </>
  );
}

export default CreateTeam;
