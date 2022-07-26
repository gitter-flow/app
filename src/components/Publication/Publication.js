import * as React from 'react';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ReplyIcon from '@mui/icons-material/Reply';
import ForkLeftSharpIcon from '@mui/icons-material/ForkLeftSharp';
import EditorComponent from "../Editor/EditorComponent";
import Commentary from "../Commentary/Commentary";
import FollowUser from "./FollowUser";
import DeletePublication from "./DeletePublication";
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import AddPublication from "../Publication/AddPublication";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {useEffect} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import {useNavigate} from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Publication = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  let navigate = useNavigate();
  const handleOpen = () => setOpenRepublish(true);
  const handleClose = () => setOpenRepublish(false);
  const [dataCommentary, setDataCommentary] = React.useState( [
    {
      "username": "",
      "userId": "",
      "content": "",
      "likes": []
    }
  ]);

  const [openRepublish, setOpenRepublish] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState(null);
  const [selectedVersion, setSelectedVersion] = React.useState(props.versions[props.versions.length - 1]);
  const [updateKey, setUpdateKey] = React.useState(0);
  const [like, setLike] = React.useState(true);
  const [numberLike, setnumberLike] = React.useState("0");
  const [fork, setFork] = React.useState(true);
  const [userWhoFollows, setUserWhoFollows] = React.useState([]);
  const [userWhoFollowsUpdate, setuserWhoFollowsUpdate] = React.useState(false);
  const [contentMarkdown, setContentMarkdown] = React.useState('');
  const [selectedImage, setSelectedImage] = React.useState(null);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickRepublish = () => {
    setOpenRepublish(!openRepublish);
  };

  const FavAddHandleClick = () => {
    setLike(!like)
    setnumberLike((parseInt(numberLike) + 1).toString());

    fetch(`${process.env.REACT_APP_API_URL}/publication/like`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"publicationId\":\""+ props.publicationId +"\"}",
      "method": "POST"
    }).then(response => {response.json()}).catch(error => {});


  };
  const FavRemoveHandleClick = () => {
    setLike(!like)
    setnumberLike((parseInt(numberLike) - 1).toString());
    fetch(`${process.env.REACT_APP_API_URL}/publication/unlike`, {
      "headers": {
        "accept": "application/json",
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
        "content-type": "application/json",
      },
      "body": "{\"userId\":\"" + cookies["userId"] + "\",\"publicationId\":\""+ props.publicationId +"\"}",
      "method": "POST"
    }).then(response => {response.json()}).catch(error => {});
  };
  const ForkHandleClick = () => {
    setFork(!fork)
  };

  const changeVersion = (event) => {
    setSelectedVersion(event.target.value);
    console.log(`code id : ${props.codeId}`)
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/code/version?codeId=${props.codeId}&versionId=${event.target.value}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(async (value) => {
        setCode(value.data);
        setUpdateKey(updateKey+1);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })
  }

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
    if (props.publicationId)
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/publication/${props.publicationId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none":"none"}
      })
        .then(value => {
          setnumberLike(value.data.likes.length.toString());
          if(value.data.likes.indexOf(cookies["userId"]) != -1) {
            setLike(!like)
          }
        })
        .catch(err => {
          console.log("erreur : " + err);
        })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/comment/${props.publicationId}?page=0&size=100`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(value => {
        setDataCommentary(value.data);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })

    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/follows/${cookies["userId"]}?page=0&size=100`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then((value) => {
        if (value.data.length > 0) {
          let userIds = value.data.map((data) => data["userId"]);
          setUserWhoFollows(userIds);
        } else {
          setUserWhoFollows([]);
        }
        setuserWhoFollowsUpdate(!userWhoFollowsUpdate);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })

  }, []);

  return (
    <>
      <Modal
        open={openRepublish}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style_modal}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <u>Reprendre une publication</u>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <AddPublication typeCode={props.selectedCode} addPublication={true} contentMessage={props.code} parentPublicationId={props.publicationId} isRepublish={"true"}/>
          </Typography>
        </Box>
      </Modal>
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
          primary={props.author}
          secondary={
            <React.Fragment>
              {props.content}
            </React.Fragment>
          }
        />
      </ListItem>
      <List>
        <ListItemButton style={{transitionDuration: '0s',alignItems:'center'}} >
          <ListItemIcon>
            <Tooltip title="Code">
              {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
            </Tooltip>
          </ListItemIcon>
          <ListItemIcon>
            <Tooltip title="Récupérer">
              <ForkLeftSharpIcon onClick={handleClickRepublish} />
            </Tooltip>
          </ListItemIcon>
          <ListItemIcon >
            <Tooltip title="J'aime">
              {like ? <FavoriteIcon onClick={FavAddHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavRemoveHandleClick} /> }
            </Tooltip>
            {numberLike}
          </ListItemIcon>
          {props.publisherUserId == cookies["userId"] &&
            <DeletePublication publicationId={props.publicationId}/>
          }
          {/* <ListItemIcon style={{textAlign:''}}>
            <FollowUser key={userWhoFollowsUpdate} publisherUserId={props.publisherUserId} followersId={userWhoFollows}></FollowUser>
          </ListItemIcon> */}
          <ListItemIcon style={{textAlign:''}}>
            {props.versions != "" &&
              <select value={selectedVersion} onChange={changeVersion}>
                {props.versions.map((currElement, index) => <option key={index} value={currElement.codeVersion}>Version {props.versions.length - index}</option>)}
              </select>
            }
          </ListItemIcon>
          {props.parentPublicationId &&
            <ListItemIcon>
              <p>Publication venant d'un fork de {props.parentPublicationUserName}</p>
            </ListItemIcon>
          }
        </ListItemButton>
      </List>


      <Collapse in={open} timeout="auto"  unmountOnExit>
        <List disablePadding>
          <EditorComponent
            height='400'
            key={updateKey}
            //defaultLanguage={props.typeCode}
            publisherUserId={props.publisherUserId}
            defaultValue=""
            theme='vs-dark'
            selectedTypeCode={props.selectedCode}
            content={code ? code : props.code}
            onChange={(value) => setContentMarkdown(value)}
            addPublication = {"false"}
            publicationId={props.publicationId}
          />
        </List>
        {
          dataCommentary.length !== 0 &&
            <div>
              {dataCommentary.map((curr, index) => {return (<Item class={"item-commentary"}><Commentary key={curr} commentId={curr.id} publisherUserId={curr.userId} like={curr.likes.length.toString()} img={""} author={curr.username} content={curr.content}/></Item>)})}
            </div>
        }
      </Collapse>
    </>
  );
}

export default Publication;
