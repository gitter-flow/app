import * as React from 'react';
import {Button, TextField} from "@mui/material";
const AddCommentary = (props) => {
  const [content, setContent] = React.useState("");
  const userId = props.userId  // replace with cookie value
  const publicationId = props.publicationId
  const buttonVisibility = props.buttonVisibility ? "Hidden" : "visible"

  const AddThisCommentary = () => {
    console.log(publicationId)
    console.log(userId)
    console.log(content)
  };
  return(  <>
      <br/>
      <br/>
      <br/>
      <TextField  style={{visibility: buttonVisibility}} label={props.label} id="fullWidth"  onChange={(e) => setContent(e.target.value)} />
      <br/>
      <Button style={{visibility: buttonVisibility}} onClick={AddThisCommentary}>Add Commentary</Button>
      <br/>
      <br/>
    </>
  );
}

export default AddCommentary;
