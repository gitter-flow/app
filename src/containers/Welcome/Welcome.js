import UserService from "../../services/UserService";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import "./Welcome.css";

const Welcome = () => (
  <List className="jumbotron" style={{backgroundImage: `url("https://cdn02.gitter.im/_s/9a6e2f303/images/home/banner.jpg")`}}>
    <Grid container direction="column" alignItems="center" justifyContent="center" className={"welcome"}>
      <Grid offset={2} xs={10}>
        <h1>Bienvenue sur Gitter !</h1>
      </Grid>
      <Grid xs={12} className={"welcome-link"}>
        <a className="button-caribbean signup intro-panel-button" onClick={() => UserService.doLogin()}>Se connecter</a>
        <a className="subdued-button-clouds intro-panel-button" onClick={() => UserService.doRegister()}>S'inscire</a>
      </Grid>
      <Grid xs={12} alignItems="left" justifyContent="left">
        <ul className="mini-features-list">
          <li>
            <h2>Gratuit et illimité</h2>
            <span>Créer gratuitement des communautés publiques et privées avec un nombre de personnes, un historique de messagerie et un nombre d'intégrations illimités.</span>
          </li>

          <li>
            <h2>Création simple</h2>
            <span>Il vous suffit tout simplement de créer votre communauté et de commencer une discussion - vous n'avez aucun service d'invitation à configurer.</span>
          </li>

          <li>
            <h2>Monaco</h2>
            <span>Formattez votre code comme avec vos autres outils de développement.</span>
          </li>
        </ul>
      </Grid>
      <Grid className={"welcome-submenu"} alignItems="center" justifyContent="center" style={{color: "#000000"}, {"backgroundColor": "#fbfbfb"}}>
        <h1>Conçu pour la collaboration entre communautés</h1>
        <p>
          Gitter est conçu pour rendre l'échange de messages, la collaboration et la découverte entre communautés aussi
          fluides et simples que possible. Vous pouvez facilement créer, organiser et faire grandir votre communauté, en
          invitant d'autres utilisateurs, en un seul clic.
        </p>
        <p>
          Nous fournissons également des intégrations pour GitHub, Trello, Jenkins, Travis CI, Heroku, Sentry,
          BitBucket, HuBoard, Logentries, Pagerduty &amp; Sprintly. Nous acceptons les <i>webhooks</i> personnalisés,
          nous avons un dépôt <i>open-source</i> pour les intégrations.
        </p>
      </Grid>
    </Grid>


  </List>
)

export default Welcome


