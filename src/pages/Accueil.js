import { useContext } from "react"
import { UidContext } from "../components/AppContext"
// import NewPostForm from "../components/Post/NewPostForm";
// import Thread from "../components/Thread"
// import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import LeftNav from "../components/LeftNav";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/pages/accueil.css"
import "../styles/components/leftnav.css"


function Accueil() {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <LeftNav></LeftNav>
            <div className="main">
                {uid ? (<FriendsHint></FriendsHint>) : (
                    <div className="connection-needed">
                        <p>Veuillez-vous connecter pour découvrir vos suggestions d'amis</p>
                        <FontAwesomeIcon icon={faRightToBracket} size="2xl" />                    
                    </div>
                )}
            </div>
        </div>
    )

}

export default Accueil