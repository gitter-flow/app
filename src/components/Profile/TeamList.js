import * as React from 'react';
import axios from "axios";
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import Grid from '@mui/material/Grid';
import { useCookies } from 'react-cookie';
import {useEffect} from "react";


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
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  let userTeams = props.userTeams;
  const [isMemberOfTheTeam, setIsMemberOfTheTeam] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamId, setTeamId] = React.useState("");
  // const [memberOfTeam, setMemberOfTeam] = React.useState([{
  //   "id": "ee70149e-64c3-4772-942e-9017c32a8477",
  //   "username": "f@gmail.com",
  //   "numberOfFollowers": 0,
  //   "numberOfFollows": 0,
  //   "teams": []
  // }]);
  const [memberOfTeam, setMemberOfTeam] = React.useState([]);

  const teamHanlder = (event) => {
    setTeamId(event.target.value);
    getTeam();
  }

  useEffect(() => {
    if (props.userTeams.length != 0) {
      setTeamId(props.userTeams[0].teamId);
      getTeam();
    }

  }, []);

  function deleteTeam() {
    fetch(`${process.env.REACT_APP_API_URL}/team/leave`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"teamId\":\"" + teamId + "\"}",
      "method": "PUT"
    });
    setIsMemberOfTheTeam(false);
  }


  function getTeam() {
    setMemberOfTeam([]);
    let tempMembers = [];
    if (teamId.length == 0) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/team/${userTeams[0].teamId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none": "none"}
      })
        .then((value) => {
          if (value.data.memberId.indexOf(cookies["userId"]) != -1) {
            setIsMemberOfTheTeam(true);
          } else {
            setIsMemberOfTheTeam(false);
          }
          for (const userId of value.data.memberId) {
            axios({
              method: "GET",
              url: `${process.env.REACT_APP_API_URL}/user/${userId}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {"none": "none"}
            })
              .then((value) => {
                console.log("here data");
                tempMembers.push(value.data.username);
                console.log(tempMembers);
                setMemberOfTeam(tempMembers);
              })
              .catch(err => {
                console.log("erreur : " + err);
              })
          }


        })
        .catch(err => {
          console.log("erreur : " + err);
        })

    } else {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/team/${teamId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none": "none"}
      })
        .then((value) => {
          if (value.data.memberId.indexOf(cookies["userId"]) != -1) {
            setIsMemberOfTheTeam(true);
          } else {
            setIsMemberOfTheTeam(false);
          }

          for (const userId of value.data.memberId) {
            axios({
              method: "GET",
              url: `${process.env.REACT_APP_API_URL}/user/${userId}`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {"none": "none"}
            })
              .then((value) => {
                console.log("here data");
                tempMembers.push(value.data.username);
                console.log(tempMembers);
                setMemberOfTeam(tempMembers);
              })
              .catch(err => {
                console.log("erreur : " + err);
              })
          }

    })
  .catch(err => {
      console.log("erreur : " + err);
    })
  }
}

function joinThisTeam() {
  if (teamId.length == 0) {
    setTeamId(userTeams[0].teamId);
    fetch(`${process.env.REACT_APP_API_URL}/team/join`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"teamId\":\"" + userTeams[0].teamId + "\"}",
      "method": "PUT"
    });
  } else {
    fetch(`${process.env.REACT_APP_API_URL}/team/join`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"teamId\":\"" + teamId + "\"}",
      "method": "PUT"
    });
  }
  setIsMemberOfTheTeam(true);
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
          <u>Rejoindre l'équipe</u>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>
            <label> Voulez vous vraiment rejoindre cette équipe ? </label>
          </div>
          <div>
            <Button color="primary" variant="contained" onClick={joinThisTeam}>Oui</Button>
            <Button color="error" variant="contained" onClick={handleClose}>Non</Button>
          </div>
        </Typography>
      </Box>
    </Modal>
    <Grid container>
      <Grid item xs={6}>
        <h2>Liste des équipes</h2>
      </Grid>
      <Grid item xs={6}>
        <h2>Liste des membres</h2>
      </Grid>
      <Grid item xs={3}>
        <ListItem>
          <select onChange={teamHanlder} value={teamId} style={{"minWidth": "16em"}}>
            { userTeams.map((curr,index) => <option   key = {index} value={curr.teamId}>{curr.teamName}</option> ) }
          </select>
        </ListItem>
      </Grid>
      <Grid item={7}>
        { isMemberOfTheTeam &&
          <Button color="error" variant="contained" onClick={deleteTeam}>Quitter l'équipe</Button>
        }
        { !isMemberOfTheTeam &&
          <Button color="primary" variant="contained" onClick={handleOpen}>Rejoindre l'équipe</Button>
        }
        <Button color="error" variant="contained" onClick={deleteTeam}>Supprimer l'équipe</Button>
      </Grid>
      <Grid item xs={12} md={1}>
      </Grid>
      <Grid item xs={4}>
        {memberOfTeam.map((curr, index) => <p>{curr}</p>)}
      </Grid>
    </Grid>
  </>
);
}
export default TeamList;

