import * as React from "react";
import axios from "axios";
import FollowUser from "../Publication/FollowUser";
import './ProfileUser.css';
import {Button} from "@mui/material";
import {useEffect} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { useCookies } from 'react-cookie';
import {useLocation} from 'react-router-dom';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreateTeam from "./CreateTeam";
import TeamList from "./TeamList";




const ProfileUser = ({route}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const location = useLocation();
  const [dataUser, setdataUser] = React.useState({
    "id": "ee70149e-64c3-4772-942e-9017c32a8477",
    "username": "f@gmail.com",
    "numberOfFollowers": 0,
    "numberOfFollows": 0
  });

  const [userWhoFollows, setUserWhoFollows] = React.useState([]);
  const [userWhoFollowsUpdate, setuserWhoFollowsUpdate] = React.useState(false);
  let followModule;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (location.state) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/user/${location.state.userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none":"none"}
      })
        .then(value => {
          setdataUser(value.data);
        })
        .catch(err => {
          console.log("erreur : " + err);
        })

      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/user/follows/${cookies["userId"]}?page=0&size=100`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none":"none"}
      })
        .then((value) => {
          if (value.data.length > 0) {
            let userIds = value.data.map((data) => data["userId"]);
            setUserWhoFollows(userIds);
          } else {
            setUserWhoFollows([]);
          }
          setuserWhoFollowsUpdate(!userWhoFollowsUpdate);
        })
        .catch(err => {
          console.log("erreur : " + err);
        })
    } else {
      location.navigate("/");
    }

  }, []);


  function addTeam() {
    handleOpen();
  }
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
  return (
    <List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <u>Creer une equipe</u>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CreateTeam userId= {cookies["userId"]}/>
          </Typography>
        </Box>
      </Modal>
      <Grid container spacing={1} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <h2>Profil</h2>
        </Grid>
        <Grid item xs={1} md={3}>
        </Grid>
        <Grid item xs={3} alignItems="right" justifyContent="right">
            <img src={"https://i.imgur.com/u2AiVqu.jpeg"} alt="" className="profile-photo"/>
        </Grid>
        <Grid item xs={6}>
          <div>
            <p>Mail : {dataUser.username}</p>
            <ul className="flex-menu">
              <li><strong>{dataUser.numberOfFollowers}</strong> followers</li>
              <li><strong>{dataUser.numberOfFollows}</strong> following</li>
              <div>
                <TeamList userId = {cookies["userId"]}/>
                <Button variant="outlined" onClick={addTeam}>Creer une Equipe</Button>
              </div>
              {location.state.userId != cookies["userId"] &&
                <li><FollowUser key={userWhoFollowsUpdate} publisherUserId={location.state.userId} followersId={userWhoFollows}></FollowUser></li>
              }
            </ul>
          </div>
        </Grid>
      </Grid>
    </List>
  );
}

export default ProfileUser;

