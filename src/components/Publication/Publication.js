import * as React from 'react';
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
import Commentarys from "../Commentary/Commentarys";
import {Button} from "@mui/material";



const Publication = (props) => {
    const [open, setOpen] = React.useState(false);
    const [like, setLike] = React.useState(true);
    const [fork, setFork] = React.useState(true);
    const [publicationId, setPublicationId] = React.useState("");
    const [version, setVersion] = React.useState(["version1","version2","version3"]);
    const [contentMarkdown, setContentMarkdown] = React.useState('')

    const handleClick = () => {
        setOpen(!open);
    };
    const FavHandleClick = () => {
        setLike(!like)
      console.log(props.userId)
      console.log(publicationId)
    };
    const ForkHandleClick = () => {
      setFork(!fork)
    };
    const ShareHandleClick = () => {
      console.log(props.userId)
      console.log(publicationId)
    };
    return (
        <>
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={props.author} src="/static/images/avatar/1.jpg" />
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
            <ListItemIcon >
                 {open ? <ExpandLess onClick={handleClick} /> : <ExpandMore onClick={handleClick} />}
            </ListItemIcon>
            <ListItemIcon >
                 {fork ? <ForkLeftSharpIcon onClick={ForkHandleClick} />: <ForkLeftSharpIcon style={{color: 'blue' }}onClick={ForkHandleClick} />}
            </ListItemIcon>
            <ListItemIcon >
                 {like ? <FavoriteIcon  onClick={FavHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavHandleClick} /> }
                 {like ? props.like :props.like+1}
            </ListItemIcon>
            <ListItemIcon style={{textAlign:''}}>
                 {<ReplyIcon  onClick={ShareHandleClick} />}
            </ListItemIcon>
            <ListItemIcon style={{textAlign:''}}>
                   <select name="version">
                     {version.map((currElement, index) => <option key={currElement} value={version[index]}>{version[index]}</option>)}
                    </select>
            </ListItemIcon>

        </ListItemButton>
     </List>




        <Collapse in={open} timeout="auto"  unmountOnExit>
            <List component="div" disablePadding>

            <EditorComponent
                height={props.height}
                //defaultLanguage={props.typeCode}
                userId={props.userId}
                defaultValue=""
                theme='vs-dark'
                typeCode={props.typeCode}
                content={props.content}
                onChange={(value) => setContentMarkdown(value)}
                addPublication = {props.addPublication}

            />

            </List>
          <Commentarys publicationId={publicationId} label={"username"} id={props.userId}/>
        </Collapse>

    </>
    );
}

export default Publication;
