import { useState } from "react";
import Logout from "./Log/Logout";

function PopUp() {
    const [popUp, setPopUp] = useState(false);

    const handleButton = () => {
        setPopUp(!popUp);
    }

    return(
        <div className="plus-wrapper">
            <button onClick={handleButton}>
                <div className="plus">
                    <img src="./img/icons/menu_FILL0_wght400_GRAD0_opsz48.svg" alt="plus"></img>
                    <p>Plus</p>
                </div>
                </button>
            {popUp && (
                <Logout></Logout>
            )}
        </div>
    )
}

export default PopUp