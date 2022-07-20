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
    "id": "ee70149e-64c3-4772-942e-9017c32a8477",
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
      "userId": "1",
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
        console.log("res");
        console.log(data.data);
        setSelectedImage(data.data);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })
  }


  const [selectedImage, setSelectedImage] = React.useState(null);
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
          <h2>Profil</h2>
        </Grid>
        <Grid item xs={1} md={3}>
          <div>
            <input type="file" onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}/>
            <button onClick={onFileUpload}>
              Upload!
            </button>
          </div>
          {/*{this.fileData()}*/}
        </Grid>
        <Grid item xs={3} alignItems="right" justifyContent="right">
          {
            !selectedImage &&
            <img src={"https://i.imgur.com/u2AiVqu.jpeg"} alt="" className="profile-photo"/>
          }
          {
            selectedImage &&
            <img key={selectedImage} src={`data:image/png;base64,${selectedImage}`} alt="image de profil" className="profile-photo"/>
          }
        </Grid>
        <Grid item xs={6}>
          <div>
            <p>Mail : {dataUser.username}</p>
            <ul className="flex-menu">
              <li><strong>{dataUser.numberOfFollowers}</strong> followers</li>
              <li><strong>{dataUser.numberOfFollows}</strong> following</li>
              {location.state.userId != cookies["userId"] &&
                <li><FollowUser key={userWhoFollowsUpdate} publisherUserId={location.state.userId} followersId={userWhoFollows}></FollowUser></li>
              }
            </ul>
          </div>
        </Grid>
        <Grid item xs={12}>
          <h2>Equipes</h2>
        </Grid>
        <Grid item xs={12}>
          <TeamList key={dataUser.teams} userTeams={dataUser.teams}/>
          <CreateTeam></CreateTeam>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <h2>les 10 dernières publications de l'utilisateur</h2>
        </Grid>
        <Grid item xs={12}>
          {
            dataPublication.length != 0 &&
            <Item>
              {dataPublication.map((curr, index) => <Publication key={index} publicationId={curr.id} height={400} author={curr.username} selectedCode={curr.code ? curr.code.codeType : ""} code={curr.code ? curr.code.code : ""} versions={curr.code ? curr.code.versions : ""} content={curr.content} publisherUserId={curr.userId} followersId={userWhoFollows} like={curr.likes} parentPublicationId={curr.parentPublicationId} parentPublicationUserName={curr.parentPublicationUserName}/>)}
            </Item>
          }
        </Grid>
      </Grid>
    </List>
    </div>
  );
}

export default ProfileUser;

