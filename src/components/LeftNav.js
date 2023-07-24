import { NavLink } from "react-router-dom";
import PopUp from "./PopUp";

function LeftNav() {

    return(
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to="/accueil">
                        <div className="left-nav-logo-container">
                        <img src="./img/logo.png" alt="delagram-logo"></img>
                        <img src="./img/icons/delagram-icon2.png" alt="delagram-logo-mobile"></img>
                        </div>
                    </NavLink>
                    <NavLink to="/accueil" >
                        <div className="left-nav-accueil-container">
                            <img src="./img/icons/house-solid.svg" alt="home"></img>
                            <p>Accueil</p>
                        </div>
                    </NavLink>
                    <NavLink to="/decouvrir" >
                        <div className="left-nav-decouvrir-container">
                        <img src="./img/icons/compass-solid.svg" alt="decouvrir">
                        </img>
                        <p>Découvrir</p>
                        </div>
                    </NavLink>
                    <NavLink to="/profil" >
                        <div className="left-nav-profil-container">
                            <img src="./img/icons/user-solid.svg" alt="profil">
                            </img>
                            <p>Profil</p>
                        </div>
                    </NavLink>
                    <NavLink to="/creer">
                        <div className="left-nav-creer-container">
                            <img src="./img/icons/plus-solid.svg" alt="creer"></img>
                            <p>Créer</p>
                        </div>
                    </NavLink>
                    <PopUp></PopUp>
                </div>
            </div>
        </div>
    )
    
}

export default LeftNav