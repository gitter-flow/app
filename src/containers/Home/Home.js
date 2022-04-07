import {Button} from "@mantine/core";
import Navbar from "../../components/Navbar/Navbar";

function Home() {
    return (
    <div>
        <Navbar/>
        <textarea cols="30" rows="15" style={{ width: '800px', height: '407px', resize : 'none'}} ></textarea>

        <Button> Executer</Button>
    </div>
    );
}

export default Home