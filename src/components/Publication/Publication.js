import * as React from 'react';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReplyIcon from '@mui/icons-material/Reply';
import ForkLeftSharpIcon from '@mui/icons-material/ForkLeftSharp';
import EditorComponent from "../Editor/EditorComponent";
import Commentary from "../Commentary/Commentary";
import FollowUser from "./FollowUser";
import DeletePublication from "./DeletePublication";
import {Button} from "@mui/material";
import {useEffect} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';


const Publication = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [dataCommentary, setDataCommentary] = React.useState( [
    {
      "username": "f@gmail.com",
      "userId": "ee70149e-64c3-4772-942e-9017c32a8477",
      "content": "Je commente",
      "likes": []
    }
  ]);

  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(true);
  const [numberLike, setnumberLike] = React.useState("0");
  const [fork, setFork] = React.useState(true);
  const [version, setVersion] = React.useState(["version1","version2","version3"]);
  const [contentMarkdown, setContentMarkdown] = React.useState('')

  const handleClick = () => {
    setOpen(!open);
  };
  const FavAddHandleClick = () => {
    setLike(!like)
    setnumberLike((parseInt(numberLike) + 1).toString());

    fetch(`${process.env.REACT_APP_API_URL}/publication/like`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"publicationId\":\""+ props.publicationId +"\"}",
      "method": "POST"
    });


  };
  const FavRemoveHandleClick = () => {
    setLike(!like)
    setnumberLike((parseInt(numberLike) - 1).toString());
    fetch(`${process.env.REACT_APP_API_URL}/publication/unlike`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"publicationId\":\""+ props.publicationId +"\"}",
      "method": "POST"
    });
  };
  const ForkHandleClick = () => {
    setFork(!fork)
  };

  useEffect(() => {
    if (props.publicationId)
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/publication/${props.publicationId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none":"none"}
      })
        .then(value => {
          setnumberLike(value.data.likes.length.toString());
          if(value.data.likes.indexOf(cookies["userId"]) != -1) {
            setLike(!like)
          }
        })
        .catch(err => {
          console.log("erreur : " + err);
        })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/comment/${props.publicationId}?page=0&size=10`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(value => {
        setDataCommentary(value.data);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })

  }, []);

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={props.author} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={props.author}
          secondary={
            <React.Fragment>
              {props.content}
            </React.Fragment>
          }
        />
      </ListItem>
      <List>
        <ListItemButton style={{transitionDuration: '0s',alignItems:'center'}} >
          <ListItemIcon >
            <Tooltip title="Code">
              {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
            </Tooltip>
          </ListItemIcon>
          {/*<ListItemIcon >*/}
          {/*  {fork ? <ForkLeftSharpIcon onClick={ForkHandleClick} />: <ForkLeftSharpIcon style={{color: 'blue' }}onClick={ForkHandleClick} />}*/}
          {/*</ListItemIcon>*/}
          <ListItemIcon >
            <Tooltip title="J'aime">
              {like ? <FavoriteIcon onClick={FavAddHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavRemoveHandleClick} /> }
            </Tooltip>
            {numberLike}
          </ListItemIcon>
          {props.publisherUserId == cookies["userId"] &&
            <DeletePublication publicationId={props.publicationId}/>
          }
          <ListItemIcon style={{textAlign:''}}>
              <FollowUser publisherUserId={props.publisherUserId} followersId={props.followersId}></FollowUser>
          </ListItemIcon>
          <ListItemIcon style={{textAlign:''}}>
            <select name="version">
              {version.map((currElement, index) => <option key={currElement} value={version[index]}>{version[index]}</option>)}
            </select>
          </ListItemIcon>

        </ListItemButton>
      </List>


      <Collapse in={open} timeout="auto"  unmountOnExit>
        <List component="div" disablePadding>
          <EditorComponent
            height='400'
            //defaultLanguage={props.typeCode}
            defaultValue=""
            theme='vs-dark'
            typeCode={props.typeCode}
            content={props.content}
            onChange={(value) => setContentMarkdown(value)}
            addPublication = {props.addPublication}
            publicationId={props.publicationId}
          />

        </List>
        {/*<Commentaries publicationId={props.publicationId} label={"username"} id={props.userId}/>*/}
        <div>
          {dataCommentary.map((curr, index) => <Commentary key={index} commentId={curr.id} publisherUserId={curr.userId} like={curr.likes.length.toString()} img={""} author={curr.username} content={curr.content}/>)}
        </div>
      </Collapse>
      <Divider variant="inset" component="li" />
    </>
  );
}

export default Publication;
