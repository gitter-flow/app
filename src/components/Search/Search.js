import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import {Button} from "@mui/material";
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useCookies } from 'react-cookie';
import "../home.css";
import NavBar from '../NavBar/NavBar';
import {useNavigate} from "react-router-dom";
import Loader from '../Loader/Loader';


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

export default function Search() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [loaded, setLoaded] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedImage, setSelectedImage] = React.useState(null);
  let navigate = useNavigate();


  let { username } = useParams();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
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

  useEffect(() => {
    getSearchResults(username);
  }, [username]);
  
  
  function getSearchResults(search) {
    let res;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/user/search/${username}/?page=0&size=50`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {"none":"none"}
    })
      .then((resp) => {
        console.log(resp.data);
        resp.data.forEach(element => {
          getPicture(element.userId);
          
        });
        setUserList(resp.data);
        setLoaded(true);
      })
      .catch(err => {
        console.log("erreur : " + err);
      })
    // return res;
  }

  // if(!loaded) {
  //   return (
  //     <div className='search'>
  //       <NavBar/>
  //       <Loader/>
  //     </div>
  //   );
  // }


  return (
    <div className='search'>
        <NavBar/>
        <List sx={{ width: '100%'}} className="search">
        {/*<Divider variant="inset" component="li" />*/}
        <Grid container spacing={2}>
        <Grid item xs={0} md={2}>
        </Grid>
        { userList.length == 0 &&
          <Grid item xs={6}>
            <div className='search'>
              <h2>Aucun utilisateur ne correspond à la recherche {username} </h2>
            </div>
          </Grid>
        }
        { userList.length != 0 &&
          <Grid item xs={8}>
            {userList.map(u => {
              return (
                <ListItem alignItems="flex-start" onClick={() => navigate(`/profile`, {state:{userId: u.userId}})} style={{"cursor": "pointer"}} className={"image-search"}>
                  <ListItemAvatar>
                  {
                    !selectedImage &&
                    <Avatar src="/static/images/avatar/1.jpg" />
                  }
                  {
                    selectedImage &&
                    <img key={selectedImage} src={`data:image/png;base64,${selectedImage}`} alt="image de profil" className="profile-photo"/>
                  }
                  </ListItemAvatar>
                  <ListItemText
                    primary={u.username}
                  >{u.username}</ListItemText>
                </ListItem>
              );

            })}
            <Item onClick={console.log("click")} style={{"cursor": "pointer"}}/>
          </Grid>
        }
        </Grid>
      </List>
    </div>
    
  );
}

