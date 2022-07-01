import { Routes, Route } from "react-router-dom";
import News from "../../components/News";
import Menu from "../Menu/Menu";
import NoMatch from "../../components/NoMatch";
import ProfileUser from "../../components/Profile/ProfileUser";


const Home = () => (
  <>
    <Menu/>
        <Routes>
          <Route exact path="/" element={<News/>}/>
          <Route path="/myprofile/" element={<ProfileUser/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
  </>
)

export default Home;
