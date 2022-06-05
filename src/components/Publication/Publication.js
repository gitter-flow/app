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
import Commentary from "../Commentary/Commentary";
import AddCommentary from "../Commentary/AddCommentary";



const Publication = (props) => {
    const [open, setOpen] = React.useState(true);
    const [like, setLike] = React.useState(true);
    const [fork, setFork] = React.useState(true);
    const [userId, setUserId] = React.useState("2");
    const [publicationId, setPublicationId] = React.useState("");
    const [version, setVersion] = React.useState(["version1","version2","version3"]);
    const [contentMarkdown, setContentMarkdown] = React.useState('')

    const handleClick = () => {
        setOpen(!open);
    };
    const FavHandleClick = () => {
        setLike(!like)
      console.log(userId)
      console.log(publicationId)
    };
    const ForkHandleClick = () => {
      setFork(!fork)
    };
    const ShareHandleClick = () => {
      console.log(userId)
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
                 {like ? <FavoriteIcon  onClick={FavHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavHandleClick} />}
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




        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>

            <EditorComponent
                height={400}
                defaultLanguage={props.typeCode}
                userId={userId}
                defaultValue=""
                theme='vs-dark'
                onChange={(value) => setContentMarkdown(value)}

            />

            </List>
          <Commentary label={"username"} id={"1"}/>
          <AddCommentary buttonVisibility={fork} publicationId={"publicationId"} userId={"userId"}  />
        </Collapse>
    </>
    );
}

export default Publication;
