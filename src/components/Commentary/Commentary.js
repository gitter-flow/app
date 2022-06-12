import * as React from 'react';
import {Button, TextField} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditCommentary from "./EditCommentary";

const Commentary = (props) => {
  const [content, setContent] = React.useState("");
  const isOwner = props.id === "userId" // replace with cookie value
  const buttonVisibility = isOwner ? "visible" : "hidden"
  const [edit, setEdit] = React.useState(false);

  const [like, setLike] = React.useState(true);

  const FavHandleClick = () => {
    setLike(!like)
    console.log(props.id)
    console.log(props.commentaryId)
    console.log(buttonVisibility)
    console.log(isOwner)
  };

  const EditThisCommentary = () => {
    setEdit(!edit)
    console.log(props.commentaryId)
    console.log(props.content)
    console.log(buttonVisibility)
  };
  const editHidden = () => {
    setEdit(!edit)
  };
  return(
    <>
      {edit ? <EditCommentary publicationId={"userId"} content={props.content} commentaryId={props.commentaryId} userId={"userId"}/> : null}
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={props.img} />
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              > {props.content} &nbsp;

              </Typography>
              <br/>
              {props.author }
            </React.Fragment>

          }
        />
        <Button  style={{visibility:buttonVisibility}} onClick={EditThisCommentary}>Edit</Button>{ like ? <FavoriteIcon  onClick={FavHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavHandleClick} />}{like ? props.like :props.like+1}
      </ListItem>
      <Divider variant="inset" component="li" />


    </>
  );
}

export default Commentary;
