import { useContext } from "react";
import { UidContext } from "../components/AppContext";
import SignUpForm from "../components/Log/SignUpForm";
import "../styles/pages/inscription.css"


function Registration() {

    const uid = useContext(UidContext)

    return(
        <div>
            <div className="registration-form">
                <div className="registration-form-container">
                    {uid ? (window.location = "/accueil") : (<SignUpForm></SignUpForm>)}
                    <div className="already-connected">
                            <p>
                                Vous avez déjà un compte ? <a href="/connexion">Connectez-vous</a>
                            </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration