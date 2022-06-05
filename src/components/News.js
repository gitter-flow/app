import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Publication from './Publication/Publication';
import AddPublication from "./Publication/AddPublication";

export default function News() {

  return (
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>

      <Publication height={400} author="Filobedo" content="J'ai fais ce super code les gars !" typeCode="c" userId="1"/>

      <Divider variant="inset" component="li" />
    </List>
  );
}
