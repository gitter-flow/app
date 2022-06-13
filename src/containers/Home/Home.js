import { Routes, Route } from "react-router-dom";
import PublicationForm from "../../components/PublicationForm";
import News from "../../components/News";
import Menu from "../Menu/Menu";
import NoMatch from "../../components/NoMatch";
import ProfileUser from "../../components/Profile/ProfileUser";


const Home = () => (
  <>
    <Menu/>
        <Routes>
          <Route exact path="/" element={<News/>}/>
          <Route exact path="/publication/new" element={<PublicationForm/>}/>
          <Route path="/profile/:userId" element={<ProfileUser posts={10} followers={45} following={60} description="Développeur Sénior J2EE" userId="1" userToFollowId="2" profileImg="https://mdbootstrap.com/images/avatars/img%20(1).jpg" profileName="User"/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
  </>
)

export default Home;
