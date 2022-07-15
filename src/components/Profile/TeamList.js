import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import JoinTeam from "./JoinTeam";

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

const TeamList = (props) => {
  const [secondary, setSecondary] = React.useState(false);
  const teams = ["la bande a toto", "autre team","team3"];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userId, setUserId] = React.useState(false);
  const [teamId, setTeamId] = React.useState("");
  const teamHanlder = (event) => {
    setUserId(props.userId)
    setTeamId(event.target.value);
    handleOpen();
  }

  return (
    <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style_modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <u>Rejoindre l'équipe</u>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <JoinTeam userId = {userId} teamName = {teamId} />
        </Typography>
      </Box>
    </Modal>


    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <ListItem>
      <select onChange={teamHanlder}>
        { teams.map((curr,index) => <option   key = {index} value={curr}>{curr}</option> ) }
      </select>
      </ListItem>
    </Box>
 </div>
  );
}
export default TeamList;
