import * as React from "react";
import axios from "axios";
import './ProfileUser.css';
import {Button} from "@mui/material";
import {useEffect} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { useCookies } from 'react-cookie';

const ProfileUser = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [follow, setFollow] = React.useState(true);
  const profileImg = props.profileImg
  const profileName = props.profileName
  const description = props.description
  const posts = props.posts
  const followers = props.followers
  const following = props.following

  const [dataUser, setdataUser] = React.useState({
    "id": "ee70149e-64c3-4772-942e-9017c32a8477",
    "username": "f@gmail.com",
    "numberOfFollowers": 0,
    "numberOfFollows": 0
  });

  const FollowHandleClick = () => {
    setFollow(!follow);
    console.log(props.userId)
    console.log(props.userToFollowId)
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/${props.userId}`,
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

  }, []);

  return (
    <List>
      <Grid container spacing={1}>
          <grid item xs={8}>
            <div>
              <img src={"https://i.imgur.com/u2AiVqu.jpeg"} alt="" className="profile-photo"/>
            </div>
          </grid>
          <grid item xs={4}>
            <div>
              <h2>Mail : {dataUser.username}</h2>
              <p>Mail : {dataUser.username}</p>
              {props.userId != cookies["userId"] &&
                <div>
                  {true ? <Button variant="contained" onClick={FollowHandleClick} >Follow</Button> : <Button variant="outlined" onClick={FollowHandleClick} >Unfollow</Button>}
                </div>
              }
              <ul className="flex-menu">
                <li><strong>{dataUser.numberOfFollowers}</strong> followers</li>
                <li><strong>{dataUser.numberOfFollows}</strong> following</li>
              </ul>
            </div>
          </grid>
      </Grid>
    </List>
  );
}

export default ProfileUser;

