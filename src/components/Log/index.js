import { useState } from "react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
// import { ListGroup } from "react-bootstrap";

function LogIndex(props) {

    const [signUpModal, setsignUpModal]= useState(props.signup);
    const [signInModal, setsignInModal] = useState(props.signin);

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setsignUpModal(true);
            setsignInModal(false);
        } else if (e.target.id === "login") {
            setsignUpModal(false);
            setsignInModal(true);
        }
    }

    return(
        <div>
            <div className="connection-form">
                <div className="form-container">
                    <ul className="list-group">
                        <li className="list-group-item" onClick={handleModals} id="register">S'inscrire</li>
                        <li className="list-group-item" onClick={handleModals} id= "login">Se connecter</li>
                        {signUpModal && <SignUpForm></SignUpForm>}
                        {signInModal && <SignInForm></SignInForm>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LogIndex