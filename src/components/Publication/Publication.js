import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


const Publication = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
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
        <ListItemButton onClick={handleClick}>
            <ListItemIcon onClick={handleClick}>
            </ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <h1> Show code</h1>
            </List>
        </Collapse>
    </>
    );
}

export default Publication;