import * as React from "react";
import './ProfileUser.css';
import {Button} from "@mui/material";
const ProfileUser = (props) => {
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
  return (
    <>
      <div className="container">
        <div className="row m-b-r m-t-3">
          <div className="col-md-2 offset-md-1">
            <img src={profileImg} alt="" className="profile-photo"/>
          </div>
        </div>
        <div className="col-md-9 p-t-2">
          <h2>Mail : {dataUser.username}</h2>
          <p>Mail : {dataUser.username}</p>
          {true ? <Button variant="contained" onClick={FollowHandleClick} >Follow</Button> : <Button variant="outlined" onClick={FollowHandleClick} >Unfollow</Button>}
            <ul className="flex-menu">
              <li><strong>{"non implémenté"}</strong> posts</li>
              <li><strong>{dataUser.numberOfFollowers}</strong> followers</li>
              <li><strong>{dataUser.numberOfFollows}</strong> following</li>
            </ul>
        </div>
      </div>
    </>
);
}

export default ProfileUser;

