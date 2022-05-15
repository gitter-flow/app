import { Routes, Route } from "react-router-dom";
import Profile from "../../components/Profile";
import PublicationForm from "../../components/PublicationForm";
import News from "../../components/News";
import Menu from "../Menu/Menu";
import NoMatch from "../../components/NoMatch";


const Home = () => (
  <>
    <Menu/>
        <Routes>
          <Route exact path="/" element={<News/>}/>
          <Route exact path="/publication/new" element={<PublicationForm/>}/>
          <Route path="/profile/:userId" element={<Profile bookId="1"/>}/>
          <Route path="*" element={<NoMatch/>}/>
      </Routes>
  </>
)

export default Home;
