import { Routes, Route } from "react-router-dom";
import News from "../../components/News";
import Menu from "../Menu/Menu";
import NoMatch from "../../components/NoMatch";
import ProfileUser from "../../components/Profile/ProfileUser";
import { useCookies } from 'react-cookie';

const Home = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  return (
  <>
    {/* <Menu/> */}
    <Routes>
      <Route exact path="/" element={<News/>}/>
      <Route path="/profile/" element={<ProfileUser userId={cookies["userId"]}/>}/>
      <Route path="*" element={<NoMatch/>}/>
    </Routes>
  </>
  )
}

export default Home;
