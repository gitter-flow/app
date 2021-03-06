import * as React from 'react';
import AddCommentary from "../Commentary/AddCommentary";
import List from '@mui/material/List';
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import Editor from "@monaco-editor/react";
import { useCookies } from 'react-cookie';
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';


const EditorComponent = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const [contentCode, setContentCode] = React.useState(props.content);
  const [content, setContent] = React.useState();
  const isOwner = props.userId === cookies["userId"] // replace with cookie value
  const addPublication = props.addPublication ? "none" : "visible"
  const readOnly = (addPublication==="none" || isOwner)
  const executionPublication = props.addPublication? "visible" : "none"
  const CommentButtonVisibility = props.addPublication? "none" : "visible"
  const [typeCode, setTypeCode] = React.useState(["c","shell","python"]);
  const [selectedTypeCode, setSelectedTypeCode] = React.useState(props.selectedTypeCode);

  const [resultCode, setResultCode] = React.useState(props.content);

  const update = () => {
    let codeFormated = contentCode.replaceAll("\"", "\\\"");
    fetch(`${process.env.REACT_APP_API_URL}/code/save`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"publicationId\":\"" + props.publicationId + "\",\"codeType\":\"" + selectedTypeCode + "\",\"code\":\"" + codeFormated + "\"}",
      "method": "POST"
    }).then(response=>response.json())
      .then(data=>{
        console.log(`code id :`);
        console.log(data);
        console.log(`publication content : ${content}`);
        setResultCode(data.output);
      });
  }

  const publish = async ()=>{
    let codeFormated = contentCode.replaceAll("\"", "\\\"");
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

        fetch(`${process.env.REACT_APP_API_URL}/code/save`, {
          "headers": {
            "accept": "application/json",
            "authorization": `Bearer ${cookies["keycloaktoken"]}`,
            "content-type": "application/json",
          },
          "body": "{\"publicationId\":\"" + publicationId + "\",\"codeType\":\"" + selectedTypeCode + "\",\"code\":\"" + codeFormated + "\"}",
          "method": "POST"
        }).then(response=>response.json())
          .then(data=>{
            console.log(`code id :`);
            console.log(data);
            console.log(`publication content : ${content}`);
            setResultCode(data.output);
          });
          navigate(0);
      });
  };

  const fork = async () => {
    let publicationId;
    await fetch(`${process.env.REACT_APP_API_URL}/publication`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": `{\"userId\":\"${cookies["userId"]}\",\"content\":\"` + props.contentMessageAdd + `\",\"parentPublicationId\": \"${props.parentPublicationId}\"}`,
      "method": "POST"
    }).then(response=>response.json())
      .then(data => {
        publicationId = data.id;
        let codeFormated = contentCode.replaceAll("\"", "\\\"");
        fetch(`${process.env.REACT_APP_API_URL}/code/save`, {
          "headers": {
            "accept": "application/json",
            "authorization": `Bearer ${cookies["keycloaktoken"]}`,
            "content-type": "application/json",
          },
          "body": "{\"publicationId\":\"" + publicationId + "\",\"codeType\":\"" + selectedTypeCode + "\",\"code\":\"" + codeFormated + "\"}",
          "method": "POST"
        }).then(response=>response.json())
          .then(data=>{
            console.log(data.output); // OUTPUT
            setResultCode(data.output);
          });
      });
      navigate(0);
  };

  const Execute = () => {

    let codeFormated = contentCode.replaceAll("\"", "\\\"");

    fetch(`${process.env.REACT_APP_API_URL}/code/run`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": `{\"codeType\":\"${selectedTypeCode}\",\"code\":\"` + codeFormated + "\"}",
      "method": "POST"
    }).then(response=>{
      if (response.status == 400) {
        setResultCode("Erreur");
      }
      return response.json();
    })
      .then(data => {
        setResultCode(data.output);
      });

  }

  const typeCodeHanlder = (event) => {
    setSelectedTypeCode(event.target.value);
  }

  useEffect(() => {
    if (props.content && props.content != '' ) {
      let codeFormated = props.content.replaceAll("\"", "\\\"");
      fetch(`${process.env.REACT_APP_API_URL}/code/run`, {
        "headers": {
          "accept": "application/json",
          "authorization": `Bearer ${cookies["keycloaktoken"]}`,
          "content-type": "application/json",
        },
        "body": `{\"codeType\":\"${props.selectedTypeCode}\",\"code\":\"` + codeFormated + "\"}",
        "method": "POST"
      }).then(response=>response.json())
        .then(data => {
          setResultCode(data.output);
        })
    }

  }, []);

  return(
    <List sx={{ width: '100%', bgcolor: 'rgba(246,246,246,0.34)' }}>
      <Grid container justifyContent="center">
        <Grid item xs={6} md={6}>
          <h3>Editeur</h3>
          <Editor
            height={400}
            width={"-webkit-fill-available;"}
            defaultLanguage={selectedTypeCode}
            defaultValue={contentCode}
            theme={props.theme}
            onChange={(value) => setContentCode(value)}
            options={{readOnly: false}}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <h3>R??sultat</h3>
          <p>{resultCode}</p>
        </Grid>
      </Grid>
      <Grid container spacing={1} style={{"paddingTop":"1em"}} alignItems="flex-center" justifyContent="center">
        { props.addPublication != "true" &&
          <Grid item xs={3}>
            <AddCommentary publicationId={props.publicationId}></AddCommentary>
          </Grid>
        }
        <Grid item xs={2}>
          <Button variant="contained" onClick={Execute}>??xecuter</Button>
        </Grid>
        {
          props.addPublication == "true" &&
          <Grid item xs={2}>
            <Button variant="contained" onClick={publish}>Publier</Button>
          </Grid>
        }
        {
          props.isRepublish == "true" &&
          <Grid item xs={2}>
            <Button variant="contained" onClick={publish}>Republier</Button>
          </Grid>
        }
        {
          (props.addPublication != "true" && (props.isRepublish == undefined || props.isRepublish == "false")) &&
          <Grid item xs={3}>
            <Button variant="contained" onClick={update}>Enregistrer</Button>
          </Grid>
        }
        <Grid item xs={2}>
            <select onChange={typeCodeHanlder} value={selectedTypeCode}>
              {typeCode.map((currElement, index) => <option key={currElement} value={currElement}>{currElement}</option>)}
            </select>
        </Grid>
      </Grid>
    </List>
  );
}

export default EditorComponent;
