import * as React from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Publication from './Publication/Publication';
import AddPublication from "./Publication/AddPublication";
import {Button} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';



export default function News() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
     <Divider variant="inset" component="li" />


      <Grid container spacing={3}>
        <Grid item xs>
          <Item>
            <Button onClick={AddPublication}> Add Publication</Button>
            <AddPublication  height={400} typeCode="c" userId="2" addPublication={true}/>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
      <Publication height={400} author="Filobedo" content="J'ai fais ce super code les gars !" typeCode="c" userId="15" like={50}/>
      <Publication height={400} author="Filobedo" content="J'ai fais ce super code les gars !" typeCode="c" userId="15" like={50}/>
      <Publication height={400} author="Filobedo" content="J'ai fais ce super code les gars !" typeCode="c" userId="15" like={50}/>
    </Item>
</Grid>
  <Grid item xs>
  </Grid>
</Grid>


    </List>
  );
}
