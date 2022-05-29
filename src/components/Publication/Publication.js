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

import Editor from "@monaco-editor/react";
import { Button } from '@mui/material';



const Publication = (props) => {
    const [open, setOpen] = React.useState(true);
    const [like, setLike] = React.useState(true);
    const [fork, setFork] = React.useState(true);
    const [version, setVersion] = React.useState(["version", "orange", "cherry"]);
    const [contentMarkdown, setContentMarkdown] = React.useState('') 
    const handleClick = () => {
        setOpen(!open);
    };
    const FavHandleClick = () => {
        setLike(!like);
    };
    const ForkHandleClick = () => {
       
    };
    const ShareHandleClick = () => {
       
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
                 {fork ? <ForkLeftSharpIcon onClick={FavHandleClick} /> : <ForkLeftSharpIcon  onClick={ForkHandleClick} />}
            </ListItemIcon>
            <ListItemIcon >
                 {like ? <FavoriteIcon onClick={FavHandleClick} /> : <FavoriteIcon style={{color: 'red' }} onClick={FavHandleClick} />}
            </ListItemIcon>
            <ListItemIcon style={{textAlign:''}}>
                 {<ReplyIcon  onClick={ShareHandleClick} />}
            </ListItemIcon>
            <ListItemIcon style={{textAlign:''}}>
                   <select name="version">
                            <option value="">version</option>
                            
                    </select>               
            </ListItemIcon>
            
        </ListItemButton>
     </List>
      
      
        
        
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                
            <Editor
                height={400}
                defaultLanguage="javascript"
                defaultValue=""
                theme='vs-dark'
                onChange={(value) => setContentMarkdown(value)}
               
            />
           <Button variant="contained" >
                Sauvegarder
            </Button>
            <Button variant="contained" style={{alignContent:'center'}}>
                Execution
            </Button>



            </List>
        </Collapse>
    </>
    );
}

export default Publication;