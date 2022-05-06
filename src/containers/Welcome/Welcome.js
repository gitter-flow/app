import Button from '@mui/material/Button';
import { useKeycloak } from "@react-keycloak/web";

export default function Welcome() {
    const { keycloak } = useKeycloak();
    return(
        <div>
            <h1>Welcome to Gitter</h1>
            <Button variant='contained' onClick={() => keycloak.login()}> Login </Button>
            <Button variant='outlined' onClick={() => keycloak.register()}> Register </Button> 
        </div>
    )
}