import * as React from 'react';
import {Button} from "@mui/material";
import Editor from "@monaco-editor/react";
import Grid from '@mui/material/Grid';
import { useCookies } from 'react-cookie';


const EditorComponent = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [contentCode, setContentCode] = React.useState("");
  const [content, setContent] = React.useState();
  const isOwner = props.userId === cookies["userId"] // replace with cookie value
  const addPublication = props.addPublication? "none" : "visible"
  const readOnly = (addPublication==="none" || isOwner)
  const executionPublication = props.addPublication? "visible" : "none"
  const CommentButtonVisibility = props.addPublication? "none" : "visible"
  const [typeCode, setTypeCode] = React.useState(["c","sh","python"]);
  const [typeCodeSelected, setTypeCodeSelected] = React.useState(["c","c#","java"]);

  const publish=()=>{
    console.log(props.contentMessageAdd)
    console.log(contentCode)
    console.log(typeCode[contentCode])

    // fetch("http://api.gitter.localhost/publication", {
    //   "headers": {
    //     "accept": "application/json",
    //     "authorization": `Bearer ${document.cookie}`,
    //     "content-type": "application/json",
    //   },
    //   "body": "{\"userId\":\"ee70149e-64c3-4772-942e-9017c32a8477\",\"content\":\"" + props.contentMessageAdd + "\"}",
    //   "method": "POST"
    // });

  };
  const Execute=()=>{
    console.log(typeCodeSelected)

    fetch("http://api.gitter.localhost/publication", {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"content\":\"" + props.contentMessageAdd + "\"}",
      "method": "POST"
    });
  }
  return(
    <>
      <Editor
        height={400}
        width={"-webkit-fill-available;"}
        defaultLanguage={props.typeCode}
        defaultValue={props.defaultValue}
        theme={props.theme}
        onChange={(value) => setContentCode(value)}
        options={{readOnly: !readOnly}}
      />

      <Grid container spacing={1} style={{"padding-top":"1em"}} alignItems="flex-center" justifyContent="flex-end">
        <Grid item xs={2} style={{display:CommentButtonVisibility}}>
          <Button variant="contained" onClick={Execute} >Commenter</Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={Execute} >Éxecuter</Button>
        </Grid>
        <Grid item xs={2} style={{display:executionPublication}}>
          <Button variant="contained"  onClick={publish}>Publier</Button>
        </Grid>
        <Grid item xs={2}>
          <select name="typeCode">
            {/*} {typeCode.map((currElement, index) => <option onChange={e => setContentCode(index)} key={currElement} value={typeCode[index]}>{typeCode[index]}</option>)}
            {*/}
            {typeCode.map((currElement, index) => <option onChange={e => console.log(e)} key={currElement} value={typeCode[index]}>{typeCode[index]}</option>)}
          </select>
        </Grid>
      </Grid>


    </>
  );
}

export default EditorComponent;
