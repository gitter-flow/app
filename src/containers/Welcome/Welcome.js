import UserService from "../../services/UserService";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import "./Welcome.css";

const Welcome = () => (
  <List className="jumbotron" style={{backgroundImage: `url("https://cdn02.gitter.im/_s/9a6e2f303/images/home/banner.jpg")`}}>
    <Grid container direction="column" alignItems="center" justifyContent="center" className={"welcome"}>
      <Grid item offset={2} xs={10}>
        <h1>Bienvenue sur Gitter !</h1>
      </Grid>
      <Grid item xs={12} className={"welcome-link"}>
        <a className="button-caribbean signup intro-panel-button" onClick={() => UserService.doLogin()}>Se connecter</a>
        <a className="subdued-button-clouds intro-panel-button" onClick={() => UserService.doRegister()}>S'inscire</a>
      </Grid>
      <Grid item xs={12} alignItems="flex-center" justifyContent="center">
        <ul className="mini-features-list">
          <li>
            <h2>Gratuit et illimité</h2>
            <p>Communiquer avec un grand nombre de personnes à travers le monde avec un historique et un nombre d'intégrations illimités.</p>
          </li>

          <li>
            <h2>Création simple</h2>
            <p>Il vous suffit tout simplement de créer votre compte et de commencer une discussion.</p>
          </li>

          <li>
            <h2>Faites valider votre code !</h2>
            <p>Formattez votre code comme avec votre IDE pour demander de l'aide à la communauté.</p>
          </li>
        </ul>
      </Grid>
      <Grid item className={"welcome-submenu mini-features-list"} alignItems="center" justifyContent="center" style={{color: "#ededed"}, {"backgroundColor": "#fbfbfb", "margin-bottom": "1em;"}}>
        <h1>Conçu pour la collaboration entre communautés</h1>
        <p>
          Gitter est conçu pour rendre l'échange de messages, la collaboration et la découverte entre communautés aussi
          fluides et simples que possible.
        </p>
        <p>
          Site réalisé par des étudiants de l'ESGI par Paul BARRIE et Frédéric FLACELIERE.
        </p>
      </Grid>
    </Grid>


  </List>
)

export default Welcome


