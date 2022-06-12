import * as React from 'react';
import {Button, TextField} from "@mui/material";

const EditCommentary = (props) => {
  const [content, setContent] = React.useState(props.content);
  const userId = props.userId === "userId" // replace with cookie value
  const publicationId = props.publicationId

  const EditThisCommentary = () => {
    if(userId){
      console.log(publicationId)
      console.log(content)
    }else {
      console.log("ce n'est pas ton commentaire")
    }
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
        <Button  onClick={EditThisCommentary} >Edit Commentary</Button>
        </div>
      </form>
    </>
  );
}

export default EditCommentary;
