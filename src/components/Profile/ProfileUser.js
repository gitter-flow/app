import * as React from "react";
import axios from "axios";
import FollowUser from "../Publication/FollowUser";
import './ProfileUser.css';
import {Button} from "@mui/material";
import {useEffect} from "react";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import { useCookies } from 'react-cookie';
import {useLocation} from 'react-router-dom';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CreateTeam from "./CreateTeam";
import TeamList from "./TeamList";
import Publication from '../Publication/Publication';
import Menu from "../../containers/Menu/Menu";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

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


const ProfileUser = ({route}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const location = useLocation();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const [dataUser, setdataUser] = React.useState({
    "id": "example",
    "username": "f@gmail.com",
    "numberOfFollowers": 0,
    "numberOfFollows": 0,
    "teams": []
  });

  const [dataPublication, setDataPublication] = React.useState( [
    {
      "author": "Paul 2",
      "content": "Ici le commentaire d'une publication",
      "typeCode": "c",
      "userId": "example",
      "likes":[],
      "code": {
        "publicationId": "222c44ff-00ad-4734-8797-a456cc459212",
        "codeType": null,
        "code": "shell",
        "versions": [
          {
            "codeVersion": "6829b3d9-5d82-473d-ba61-8972b7e5caeb",
            "outputVersion": "4a05983d-917f-4e71-b605-262ec6caf09f"
          }
        ]
      },
      "parentPublicationId": "",
      "parentPublicationUserName": ""
    },
  ]);

  const [userWhoFollows, setUserWhoFollows] = React.useState([]);
  const [userWhoFollowsUpdate, setuserWhoFollowsUpdate] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  let followModule;

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
      })
  }


  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "image",
      selectedImage,
      selectedImage.name
    );

    fetch(`${process.env.REACT_APP_API_URL}/user/picture/${cookies["userId"]}`, {
      "headers": {
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
      },
      "body": formData,
      "method": "POST"
    });

    getPicture(cookies["userId"]);

    // axios.post(`${process.env.REACT_APP_API_URL}/user/picture/${cookies["userId"]}`, formData);
  };

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

  function getPubliFromUser() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/publication/user/${location.state.userId}?page=0&size=10`,
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
    getPubliFromUser(location.state.userId);
    getPicture(location.state.userId);
    if (location.state) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/user/${location.state.userId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {"none":"none"}
      })
        .then(value => {
          setdataUser(value.data);
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
    } else {
      location.navigate("/");
    }

  }, []);


  return (
    <div>
      <Menu/>
      <List>
        <Grid container spacing={1} alignItems="center" justifyContent="center">

          <Grid item xs={12}>
            <h1 style={{"textAlign":"center"}}>Profil</h1>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={4} alignItems="right" justifyContent="right">
            {
              !selectedImage &&
              <Avatar src="/static/images/avatar/1.jpg" />
            }
            {
              selectedImage &&
              <img key={selectedImage} src={`data:image/png;base64,${selectedImage}`} alt="image de profil" className="profile-photo"/>
            }
          </Grid>
          <Grid item xs={6}>
            <div>
              <p><u>Mail</u> : {dataUser.username}</p>
              <ul className="flex-menu">
                <li><strong>{dataUser.numberOfFollowers}</strong> <u>followers</u></li>
                <li><strong>{dataUser.numberOfFollows}</strong> <u>follow</u></li>
                {location.state.userId != cookies["userId"] &&
                  <li><FollowUser key={userWhoFollowsUpdate} publisherUserId={location.state.userId} followersId={userWhoFollows}></FollowUser></li>
                }
              </ul>
            </div>
          </Grid>
          {
            location.state.userId == cookies["userId"] &&
            <Grid item xs={12} md={12} textAlign="center">
              <div>
                <h3>Changer mon image de profil</h3>
                <input type="file" onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                }}/>
                <Button variant="outlined" color="success" onClick={onFileUpload}>Valider</Button>
              </div>
            </Grid>
          }
          <Grid item xs={12} style={{"marginBottom": "2em", "marginTop": "3em"}}>
            <Divider variant="middle">
              <Chip label="Equipe" />
            </Divider>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <CreateTeam></CreateTeam>
          </Grid>
          <Grid item xs={12}>
            <TeamList key={dataUser.teams} userTeams={dataUser.teams}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} style={{"marginBottom": "2em", "marginTop": "3em"}}>
            <Divider variant="middle">
            <Chip label="Les 10 dernières publications de l'utilisateur"></Chip>
            </Divider>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            {
              dataPublication.length != 0 &&
              dataPublication.map((curr, index) => { return (<Item class={"item-publication"}><Publication style={{"marginBottom": "2em"}} key={index} codeId={curr.codeId} publicationId={curr.id} height={400} author={curr.username} selectedCode={curr.code ? curr.code.codeType : ""} code={curr.code ? curr.code.code : ""} versions={curr.code ? curr.code.versions : ""} content={curr.content} publisherUserId={curr.userId} followersId={userWhoFollows} like={curr.likes} parentPublicationId={curr.parentPublicationId} parentPublicationUserName={curr.parentPublicationUserName}/></Item>)})
            }
          </Grid>
        </Grid>
      </List>
    </div>
  );
}

export default ProfileUser;

