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

  return (
    <List>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <div>
            <img src={"https://i.imgur.com/u2AiVqu.jpeg"} alt="" className="profile-photo"/>
          </div>
        </Grid>
        <Grid item xs={10}>
          <div>
            <h2>Mail : {dataUser.username}</h2>
            <p>Mail : {dataUser.username}</p>
            <p>{userWhoFollows.length}</p>
            {location.state.userId != cookies["userId"] &&
              <div>
                <p>{userWhoFollows}</p>
                <FollowUser key={userWhoFollowsUpdate} publisherUserId={location.state.userId} followersId={userWhoFollows}></FollowUser>
              </div>
            }
            <ul className="flex-menu">
              <li><strong>{dataUser.numberOfFollowers}</strong> followers</li>
              <li><strong>{dataUser.numberOfFollows}</strong> following</li>
            </ul>
          </div>
        </Grid>
      </Grid>
    </List>
  );
}

export default ProfileUser;

