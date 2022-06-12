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
            <div className="col-md-9 p-t-2">
              <h2 className="profile-name">{profileName}        {follow ? <Button variant="contained" onClick={FollowHandleClick} >Follow</Button>:
                                                                          <Button variant="outlined" onClick={FollowHandleClick} >Unfollow</Button> }
              </h2>
              <p>{description}</p>
              <ul className="flex-menu">
                <li><strong>{posts}</strong> posts</li>
                <li><strong>{followers}</strong> followers</li>
                <li><strong>{following}</strong> following</li>
              </ul>
            </div>
          </div>
        </div>
    </>
  );
}

export default ProfileUser;
