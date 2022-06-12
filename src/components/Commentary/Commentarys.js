import * as React from 'react';
import {Button, TextField} from "@mui/material";
import List from '@mui/material/List';
import Commentary from "./Commentary";

const Commentarys = (props) => {

  return(
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Commentary publicationId={props.publicationId}commentaryId={1} id={"userId"} like={50} img={""} author={"Yacine"} content={"je trouve se code super indenté"}/>
      </List>
    </>
  );
}

export default Commentarys;
