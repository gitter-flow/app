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
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import CreateTeam from "./CreateTeam";
import TeamList from "./TeamList";
import Publication from '../Publication/Publication';
import Menu from "../../containers/Menu/Menu";
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom'
import Loader from "../Loader/Loader";
import useFetch from "../../services/UseFetch";



const ProfileUser = () => {
  const [cookies] = useCookies(['user']);
  let [loading, setLoading] = React.useState(true);
  let { userId } = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [dataUser, setdataUser] = React.useState({
    "id": userId,
    "username": "",
    "numberOfFollowers": 0,
    "numberOfFollows": 0,
    "teams": [],
    "ownedTeams": []
  });

  const [dataPublication, setDataPublication] = React.useState( [
    {
      "author": "",
      "content": "",
      "typeCode": "",
      "userId": "example",
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
  ]);
  let [userWhoFollows, setUserWhoFollows] = React.useState([]);
  let [userWhoFollowsUpdate, setuserWhoFollowsUpdate] = React.useState(false);
  let [selectedImage, setSelectedImage] = React.useState(null);
  const fetch = useFetch();

  function getUserDetails() {
    fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`,{
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json()
      }).then(data => {
          setdataUser(data);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })

    fetch(`${process.env.REACT_APP_API_URL}/user/follows/${userId}?page=0&size=100`, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json()
      })
      .then((data) => {
        if (data.length > 0) {
          let userIds = data.map((data) => data["userId"]);
          setUserWhoFollows(userIds);
        } else {
          setUserWhoFollows([]);
        }
        setuserWhoFollowsUpdate(!userWhoFollowsUpdate);
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


  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "image",
      selectedImage,
      selectedImage.name
    );

    fetch(`${process.env.REACT_APP_API_URL}/user/picture/${userId}`, {
      "headers": {
        "authorization": `Bearer ${cookies["keycloaktoken"]}`,
      },
      "body": formData,
      "method": "POST"
    });

    getPicture(userId);

  };

  function getCodeFromPublication(codeId) {
    return  axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/code/${codeId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .catch(err => {
        console.log("erreur : " + err);
      })
  }

  function getPubliFromUser() {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/publication/user/${userId}?page=0&size=10`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then(async (value) => {
        for (let publication of value.data) {
          if (publication.codeId != null)
            await getCodeFromPublication(publication.codeId).then(res => {
              if(res) {
                publication.code = res.data;
              }
            });

          if (publication.parentPublicationId) {

            var filteredObj = value.data.find(function(item, i){
              if(publication.parentPublicationId === item.parentPublicationId){
                return item;
              }
            });
            publication.parentPublicationUserName = filteredObj.username;
          }
        }
        console.log("data");
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
    getUserDetails()
    getPicture(userId);
    getPubliFromUser();
    setLoading(false);
  }, [loading]);

  if(loading) {
    return (
      <div>
        <Loader/>
      </div>
    );
  }

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
                {userId != cookies["userId"] &&
                  <li><FollowUser key={userWhoFollowsUpdate} publisherUserId={userId} followersId={userWhoFollows}></FollowUser></li>
                }
              </ul>
            </div>
          </Grid>
          {
            userId == cookies["userId"] &&
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
            <CreateTeam teams={dataUser.teams}></CreateTeam>
          </Grid>
          {
            (dataUser.teams.length != 0 || dataUser.ownedTeams.length != 0) &&
          <Grid item xs={12}>
            <TeamList key={dataUser.teams} userTeams={dataUser.teams} ownedTeam={dataUser.ownedTeams} mailUser={dataUser.username} profilUserId={userId}/>
          </Grid>
          }
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

