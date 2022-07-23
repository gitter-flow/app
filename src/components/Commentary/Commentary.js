import * as React from 'react';
import {Button, TextField} from "@mui/material";
import List from '@mui/material/List';
import DeleteCommentary from "./DeleteCommentary";
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditCommentary from "./EditCommentary";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const Commentary = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [selectedImage, setSelectedImage] = React.useState(null);
  let navigate = useNavigate();

  const [content, setContent] = React.useState("");
  // const isOwner = props.id === "userId" // replace with cookie value
  // const buttonVisibility = isOwner ? "visible" : "hidden"
  const [edit, setEdit] = React.useState(false);

  const [like, setLike] = React.useState(true);

  function getPicture(userId) {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/picture/${userId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none": "none"}
    })
      .then((data) => {
        setSelectedImage(data.data);
      })
      .catch(err => {
        console.log("erreur : " + err);
        setSelectedImage("");
      })
  }

  useEffect(() => {
    getPicture(props.publisherUserId);
  }, []);

  const FavHandleClick = () => {
    setLike(!like)
    // console.log(props.id)
    // console.log(props.commentaryId)
    // console.log(buttonVisibility)
    // console.log(isOwner)
  };

  const EditThisCommentary = () => {
    setEdit(!edit)
    // console.log(props.commentaryId)
    console.log(props.content)
    // console.log(buttonVisibility)
  };
  const editHidden = () => {
    setEdit(!edit)
  };
  return(
    <List sx={{ bgcolor: 'rgba(232,232,232,0.34)' }}>
      {/*{edit ? <EditCommentary publicationId={"userId"} content={props.content} commentaryId={props.commentaryId} userId={"userId"}/> : null}*/}
      <ListItem alignItems="flex-start">
        <ListItemAvatar onClick={() => navigate(`/profile`, {state:{userId: props.publisherUserId}})} style={{"cursor": "pointer"}}>
          {
            selectedImage == "" &&
            <Avatar alt={props.author} src="/static/images/avatar/1.jpg" />
          }
          {
            selectedImage != "" &&
            <img key={selectedImage} src={`data:image/png;base64,${selectedImage}`} alt="image de profil" className="publication-photo"/>
          }
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              {props.author }
              <br/>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              > {props.content} &nbsp;

              </Typography>
            </React.Fragment>

          }
        />
        {props.publisherUserId == cookies["userId"] &&
          <DeleteCommentary commentId={props.commentId}></DeleteCommentary>
        }
        {/*<Button  style={{visibility:buttonVisibility}} onClick={EditThisCommentary}>Edit</Button>{ like ? <FavoriteIcon  onClick={FavHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavHandleClick} />}{like ? props.like :props.like+1}*/}
      </ListItem>
      {/*<Divider variant="inset" component="li" />*/}


    </List>
  );
}

export default Commentary;
