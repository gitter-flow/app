import UserService from "../../services/UserService";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const Footer = () => (
  <List className="footer" style={{color: "#f0f0f0"}, {"backgroundColor": "#FBFEF9"}}>
    <Grid container direction="column" alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        <p>Condition d'utilisation</p>
      </Grid>
    </Grid>
  </List>
)

export default Footer


