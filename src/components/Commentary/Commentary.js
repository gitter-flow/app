import * as React from 'react';
import {Button, TextField} from "@mui/material";

const Commentary = (props) => {
  const [content, setContent] = React.useState("");
  const isOwner = props.id === "1" // replace with cookie value
  const buttonVisibility = isOwner ? "visible" : "hidden"

  const UpdateCommentary = () => {
    console.log(props.id)
    console.log(content)
    console.log(buttonVisibility)
  };
  return(
    <>
      <br/>
      <br/>
      <br/>
      <TextField  disabled={!isOwner} label={props.label}   onChange={(e) => setContent(e.target.value)} />
      <br/>
      <Button style={{visibility: buttonVisibility}}  onClick={UpdateCommentary}>Update</Button>
      <br/>
      <br/>
    </>
  );
}

export default Commentary;
