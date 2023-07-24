import { useContext } from "react"
// import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext"
import LeftNav from "../components/LeftNav";
// import Card from "../components/Post/Card";
// import FriendsHint from "../components/Profil/FriendsHint";
import Thread from "../components/Thread";
// import Trends from "../components/Trends";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/pages/decouvrir.css"
import "../styles/components/leftnav.css"


function Decouvrir() {
    const uid = useContext(UidContext);
    // const trendingList = useSelector((state) => state.trending);

    return (
        <div className="trending-page">
            <LeftNav></LeftNav>
            {/* <div className="main">
                <ul>
                    {trendingList[0] && trendingList.map((post) => <Card post={post} key={post._id}></Card>
                    )}
                </ul>
            </div> */}
            <div className="right-side">
                <div className="right-side-container">
                    {uid ? (<Thread></Thread>) : (
                        <div className="connection-needed">
                            <p>Veuillez-vous connecter pour découvrir les dernières tendances du moment</p>
                            <FontAwesomeIcon icon={faRightToBracket} size="2xl" />                    
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default Decouvrir

