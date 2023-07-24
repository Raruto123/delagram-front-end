import cookie from "js-cookie";
import axios from "axios";

function Logout() {
    const removeCookies = (key) => {
        if (window !== undefined) {
            cookie.remove(key, {expires : 1});
        }
    }


    const logout = async() => {
        await axios({
            method:"get",
            url:"https://delagram-app-api.onrender.com/api/user/logout",
            withCredentials:true
        }).then(() => {
            removeCookies("jwtoken");
        }).catch((err) => {
            console.log(err);
        })

        window.location="/"
    }




    return(
        <li onClick={logout}>
            <div className="logout-container">
            <img src="./img/icons/logout_FILL0_wght400_GRAD0_opsz48.svg" alt="logout"></img>
            <p>Deconnexion</p>
            </div>
        </li>
    )
}

export default Logout