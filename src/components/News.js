import * as React from 'react';
import SendIcon from "@mui/icons-material/Send";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Publication from './Publication/Publication';
import AddPublication from "./Publication/AddPublication";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import "./home.css";
import Menu from "../containers/Menu/Menu";



const style_modal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function News() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [open, setOpen] = React.useState(false);
  const [pageNumber, setPageNumber] = React.useState(0);
  const upPageNumber = () => {
    init(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  }
  const downPageNumber = () => {
    init(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  var userWhoFollows = [""];
  const [dataPublication, setDataPublication] = React.useState( Array.from([
    {
      "author": "",
      "content": "",
      "typeCode": "",
      "userId": "",
      "likes":[],
      "code": {
        "publicationId": "",
        "codeType": null,
        "code": "",
        "versions": [
          {
            "codeVersion": "",
            "outputVersion": ""
          }
        ]
      },
      "parentPublicationId": "",
      "parentPublicationUserName": ""
    },
  ]));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  async function getCodeFromPublication(codeId) {
    let res;
    await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/code/${codeId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(value => {
        res = value.data;
      })
      .catch(err => {
        console.log("erreur : " + err);
      })
    return res;
  }

  function init(val) {
    let options = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/publication/all?page=${val}&size=10`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(async (value) => {
        for (let publication of value.data) {
          if (publication.codeId != null)
            await getCodeFromPublication(publication.codeId).then(res => {
              publication.code = res
            });

          if (publication.parentPublicationId) {

            var filteredObj = value.data.find(function(item, i){
              if(publication.parentPublicationId === item.parentPublicationId){
                return i;
              }
            });
            publication.parentPublicationUserName = filteredObj.username;
          }
        }

        setDataPublication(value.data);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })

    //Récup les follower de l'user connecté
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/follows/${cookies["userId"]}?page=0&size=10`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(async (value) => {
        const userIDFollower = await value.data.map((res) => res["userId"]);
        userWhoFollows = userIDFollower;
      })
      .catch(err => {
        console.log("erreur : " + err);
      })
  }

  useEffect(() => {
    init(0);
  }, []);

  return (
    <div>
      <Menu/>
      <List sx={{ width: '100%'}} className="home" style={{"paddingTop":"1em"}}>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style_modal}>
            <h2>Nouvelle publication</h2>
            <AddPublication typeCode="c" addPublication={"true"}/>
          </Box>
        </Modal>
        <Grid container spacing={2}>
          <Grid item xs={2} textAlign="center">
              <Button variant="outlined" onClick={handleOpen} endIcon={<SendIcon />}>Nouvelle publication</Button>
          </Grid>
          <Grid item xs={8}>
            {
              dataPublication.length != 0 &&
                dataPublication.map((curr, index) => { return (<Item class={"item-publication"}><Publication style={{"marginBottom": "2em"}} key={index} codeId={curr.codeId} publicationId={curr.id} height={400} author={curr.username} selectedCode={curr.code ? curr.code.codeType : ""} code={curr.code ? curr.code.code : ""} versions={curr.code ? curr.code.versions.reverse() : ""} content={curr.content} publisherUserId={curr.userId} followersId={userWhoFollows} like={curr.likes} parentPublicationId={curr.parentPublicationId} parentPublicationUserName={curr.parentPublicationUserName}/></Item>)})
            }
          </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={2} style={{"textAlign": "left"}}>
            <Button disabled={pageNumber == 0} onClick={downPageNumber}>Page précédente</Button>
          </Grid>
          <Grid item xs={2}>
            <p style={{"textAlign": "center"}}>Page {pageNumber}</p>
          </Grid>
          <Grid item xs={2} style={{"textAlign": "right"}}>
            <Button disabled={dataPublication.length != 10} onClick={upPageNumber}>Page suivante</Button>
          </Grid>
        </Grid>

      </List>
    </div>
  );
}

// style={{"background-color": "#f1f1f1"}}

