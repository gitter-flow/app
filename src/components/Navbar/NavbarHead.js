import NavbarHomeIMG from '../../Pictures/NavbarHomeIMG.png'
import {Navbar} from "@mantine/core";

function NavbarHead(props) {
    return(
    <div>
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!props.opened} width={{ sm: 200, lg: 300 }}>
            <Navbar height={600} p="xs" width={{ base: 300 }}>
                <Navbar.Section><img height="30px"  src={NavbarHomeIMG}/>Home</Navbar.Section>
                <Navbar.Section grow mt="md">Explorer</Navbar.Section>
            </Navbar>
        </Navbar>
    </div>
    )
}


export default NavbarHead