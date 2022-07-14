import {Button} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';
import Tooltip from '@mui/material/Tooltip';
import {useEffect} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import React from "react";


const FollowUser = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [follow, setFollow] = React.useState(true);


  const followAddHandleClick = () => {
    setFollow(true);
    fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"userToFollowId\":\""+ props.publisherUserId +"\"}",
      "method": "PUT"
    });
  };

  const followRemoveHandleClick = () => {
    setFollow(false);
    fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"userToUnfollowId\":\""+ props.publisherUserId +"\"}",
      "method": "PUT"
    });
  };

  useEffect(() => {
    setFollow(props.followersId.indexOf(props.publisherUserId) != -1);
  }, []);

  return (
    <>
      {props.publisherUserId != cookies["userId"] &&
        <Tooltip title="Suivre">
          {follow ? <ReplyIcon onClick={followRemoveHandleClick} style={{color: 'blue' }}/> : <ReplyIcon onClick={followAddHandleClick}/>}
        </Tooltip>
      }
    </>
  )
}

export default FollowUser;
