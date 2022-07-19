import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Loader from "./Loader/Loader";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../containers/Home/Home";
import Welcome from "../containers/Welcome/Welcome";
import Footer from "./Footer/Footer";
import { CookiesProvider } from 'react-cookie';


const AppRouter = () => {
    const {initialized} = useKeycloak();
    const [returnLoader, setReturnLoader] = useState(true);
    useEffect(() => { 
        setReturnLoader(!initialized);
    }, [initialized]);
    
    return (
        <>
        { returnLoader ? <Loader/> :
            <CookiesProvider>
                <BrowserRouter>
                    <div className="container">
                        <Routes>
                            <Route exact path='/' 
                            element={<PrivateRoute>
                                <Home/>
                            </PrivateRoute>}/>
                            <Route path="/" component={Welcome}/>
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer></Footer>
            </CookiesProvider>
        }
        </>
      );
}

export default AppRouter;
