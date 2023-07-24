import { useContext } from "react"
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav"
import NewPostForm from "../components/Post/NewPostForm";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/pages/creer.css"
import "../styles/components/leftnav.css"


function Create() {

    const uid = useContext(UidContext)

    return(
        <div>
            <LeftNav></LeftNav>
            {uid ? (<NewPostForm></NewPostForm>) : (
                    <div className="connection-needed">
                        <p>Veuillez-vous connecter pour créer et partager vos posts au monde entier</p>
                        <FontAwesomeIcon icon={faRightToBracket} size="2xl" />                    
                    </div>
                )}
        </div>
    )
}

export default Create