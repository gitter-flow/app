import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Publication from './Publication/Publication';
import AddPublication from "./Publication/AddPublication";

export default function News() {

  return (
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
      <Publication author="Filobedo" content="J'ai fais ce super code les gars !" addPublication={false} typeCode="c" userId="2"/>
      <AddPublication  height="400" typeCode="c" userId="2" addPublication={true}/>


      <Divider variant="inset" component="li" />
    </List>
  );
}
