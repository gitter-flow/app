import * as React from 'react';
import AddCommentary from "../Commentary/AddCommentary";
import List from '@mui/material/List';
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import Editor from "@monaco-editor/react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import {useEffect} from "react";


const EditorComponent = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [contentCode, setContentCode] = React.useState(props.content);
  const [content, setContent] = React.useState();
  const isOwner = props.userId === cookies["userId"] // replace with cookie value
  const addPublication = props.addPublication? "none" : "visible"
  const readOnly = (addPublication==="none" || isOwner)
  const executionPublication = props.addPublication? "visible" : "none"
  const CommentButtonVisibility = props.addPublication? "none" : "visible"
  const [typeCode, setTypeCode] = React.useState(["c","shell","python"]);
  const [selectedTypeCode, setSelectedTypeCode] = React.useState(props.selectedTypeCode);

  const [resultCode, setResultCode] = React.useState(props.content);

  const publish = async ()=>{
    let publicationId;
    await fetch(`${process.env.REACT_APP_API_URL}/publication`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": `{\"userId\":\"${cookies["userId"]}\",\"content\":\"` + props.contentMessageAdd + "\"}",
      "method": "POST"
    }).then(response=>response.json())
      .then(data=>{
        console.log(data.id);
        publicationId = data.id;
      })

    fetch(`${process.env.REACT_APP_API_URL}/code/save`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"publicationId\":\"" + publicationId + "\",\"codeType\":\"" + typeCode[1] + "\",\"code\":\"" + contentCode + "\"}",
      "method": "POST"
    }).then(response=>response.json())
      .then(data=>{
        console.log(data.output); // OUTPUT
        setResultCode(data.output);
      });

  };
  const Execute = () => {

    let codeFormated = contentCode.replaceAll("\"", "\\\"");

    fetch(`${process.env.REACT_APP_API_URL}/code/run`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": `{\"codeType\":\"${typeCode[selectedTypeCode]}\",\"code\":\"` + codeFormated + "\"}", //contentMessage
      "method": "POST"
    }).then(response=>{
      if (response.status == 400) {
        setResultCode("Erreur");
      }
      return response.json();
    })
      .then(data => {
        setResultCode(data.output);
      })
  }

  const typeCodeHanlder = (event) => {
    setSelectedTypeCode(event.target.value);
  }

  useEffect(() => {
    if (props.content && props.content != '' ) {
      fetch(`${process.env.REACT_APP_API_URL}/code/run`, {
        "headers": {
          "accept": "application/json",
          "authorization": `Bearer ${cookies["keycloaktoken"]}`,
          "content-type": "application/json",
        },
        "body": `{\"codeType\":\"${typeCode[selectedTypeCode]}\",\"code\":\"` + props.content + "\"}", //contentMessage
        "method": "POST"
      }).then(response=>response.json())
        .then(data => {
          setResultCode(data.output);
        })
    }

  }, []);

  return(
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Grid container>
        <Grid item xs={6} md={6}>
          <Editor
            height={400}
            width={"-webkit-fill-available;"}
            defaultLanguage={props.typeCode}
            defaultValue={contentCode}
            theme={props.theme}
            onChange={(value) => setContentCode(value)}
            options={{readOnly: false}}
          />
          {/*!readOnly*/}
        </Grid>
        <Grid item xs={6} md={6}>
          <h2>Résultat</h2>
          <p>{resultCode}</p>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{"padding-top":"1em"}} alignItems="flex-center" justifyContent="flex-end">
        <Grid item xs={2} style={{display:CommentButtonVisibility}}>
          <AddCommentary publicationId={props.publicationId}></AddCommentary>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" onClick={Execute}>Éxecuter</Button>
        </Grid>
        <Grid item xs={2} style={{display:executionPublication}}>
          <Button variant="contained" onClick={publish}>Publier</Button>
        </Grid>
        <Grid item xs={2}>
          <select onChange={typeCodeHanlder}>
            {typeCode.map((currElement, index) => <option kCey={currElement} value={index}>{currElement}</option>)}
          </select>
        </Grid>
      </Grid>


    </List>
  );
}

export default EditorComponent;
