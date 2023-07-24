import LogIndex from "../components/Log";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import UpdateProfil from "../components/Profil/UpdateProfil";
import LeftNav from "../components/LeftNav";
import "../styles/pages/profil.css"
import "../styles/components/leftnav.css"



function Profil() {
    const Uid = useContext(UidContext);

    return(
        <div className="profil-page">
            <LeftNav></LeftNav>
            {Uid ? (
                <UpdateProfil></UpdateProfil>
            ) : (
            <div className="log-container">
                <LogIndex></LogIndex>
            </div>
            )}            
        </div>
    )
}

export default Profil