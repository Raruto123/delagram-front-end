import { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import userReducer from "../redux/reducers/user.reducer";
import { UidContext } from "./AppContext";
import Logout from "./Log/Logout";



function Navbar() {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.user.pseudo);

    return(
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className="logo">
                            <img src="" alt="icon"></img>
                            <h3>Delagram</h3>
                        </div>
                    </NavLink>
                </div>
            </div>
            {uid ? (
                <ul>
                    <li></li>
                    <li className="welcome">
                        <NavLink to="/profil">
                            <h5>Bienvenue {userData}</h5>
                        </NavLink>
                    </li>
                    <Logout></Logout>
                </ul>
            ) : (
                <ul>
                    <li></li>
                    <li>
                        <NavLink to="/profil">
                            <img src ="" alt = "login"></img>
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    )
}

export default Navbar