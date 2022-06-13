import * as React from 'react';
import {Button, TextField} from "@mui/material";
const AddCommentary = (props) => {
  const [content, setContent] = React.useState("");
  const userId = props.userId  // replace with cookie value
  const publicationId = props.publicationId

  const AddThisCommentary = () => {
    console.log(publicationId)
    console.log(userId)
    console.log(content)
  };
  return(  <>
      <form>
        <div>
          <label> message : </label>
        </div>
        <div>
          <textarea label="Enter your message" id="fullWidth"  onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          <Button  onClick={AddThisCommentary}>Create Commentary</Button>
        </div>
      </form>
    </>
  );
}

export default AddCommentary;
