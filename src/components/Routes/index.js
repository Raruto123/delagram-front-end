import React from "react";
// import { Navbar } from "react-bootstrap";
import { Navigate, Route} from "react-router-dom";
import { Routes } from "react-router-dom";
import Accueil from "../../pages/Accueil";
import Login from "../../pages/connexion";
import Create from "../../pages/Creer";
import Decouvrir from "../../pages/Decouvrir";
import Registration from "../../pages/inscription";
import Profil from "../../pages/Profil";
// import LeftNav from "../LeftNav";
// import Logout from "../Log/Logout";
// import Navbar from "../Navbar";

function Index() {

    return(
        <>
        {/* <Navbar></Navbar> */}
        {/* <LeftNav></LeftNav> */}
        <Routes>
            <Route path="/creer" element = {<Create></Create>}></Route>
            <Route path="/connexion" element= {<Login></Login>}></Route>
            <Route path="/" element = {<Registration></Registration>}></Route>
            <Route path="/accueil" element = {<Accueil></Accueil>}></Route>
            <Route path="/profil" element = {<Profil></Profil>}></Route>
            <Route path="/decouvrir" element = {<Decouvrir></Decouvrir>}></Route>
            {/* //si tu mets localhost:3000/n'importe quoi ça te ramène à accueil */}
            <Route path="*" element = {<Navigate to={"/"} replace></Navigate>}></Route> 
        </Routes>
        </>
    )
} 

export default Index