import { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-dom";


function SignUpForm() {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [controlpassword, setControlPassword] = useState("");
    const Navigate = useNavigate();

    const HandleRegister = (e) => {
        e.preventDefault(); //empêche la page de se recharger
        const terms = document.getElementById("terms");
        const pseudoError = document.querySelector(".pseudo-error");
        const emailError = document.querySelector(".email-error");
        const passwordError = document.querySelector(".password-error");
        const controlPasswordError = document.querySelector(".controlpassword-error");
        const termsError = document.querySelector(".terms-error");
        // const termsError = useRef(null);

        termsError.textContent = "";
        controlPasswordError.textContent = "";

        if (password !== controlpassword) {
            controlPasswordError.textContent = "Les mots de passe ne correspondent pas";
        }

        if (!terms.ariaChecked) {
            termsError.textContent = "Veuillez valider les conditions générales d'utilisation";
        } else {
            termsError.textContent = "";
        }
        axios({
            method: "post",
            data: {
                pseudo,
                email,
                password
            },
            url: `https://delagram-app-api.onrender.com/api/user/register`
        }).then((res) => {
            console.log(res)
            if (res.data.errors) {
                pseudoError.textContent = res.data.errors.pseudo;
                emailError.textContent = res.data.errors.email;
                passwordError.textContent = res.data.errors.password;
            } else {
                setFormSubmit(true);
                Navigate("/connexion")//redirige sur la page connexion lorsque j'appuie sur le bouton
            }
        }).catch((err) => {
            console.log(err);
        })


    }


    return (
        <div>
            {formSubmit ? (
                <>
                    <SignInForm></SignInForm>
                    <h4 className="succes">Enregistrement réussi, veuillez-vous connecter</h4>
                </>
            ) : (
                <article className="registration_page">
                    {/* <div className="left-side">
                        <img src="" alt="phone-pic"></img>
                    </div> */}
                    <div className="registration-right-side">
                        <div className="registration-form-div">
                            <div className="registration-logo-container">
                                <div className="registration-logo">
                                    <i>Delagram</i>
                                </div>
                            </div>
                            <div className="registration-form-container">
                                <form action="" onSubmit={HandleRegister} id="sign-up-form">
                                    <h2>Inscrivez-vous pour voir les photos et les vidéos de vos amis.</h2>
                                    <input type="text" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="e-mail">
                                    </input>
                                    <div className="email-error"></div>
                                    <input type="text" name="pseudo" id="pseudo" onChange={(e) => { setPseudo(e.target.value) }} value={pseudo} placeholder="Pseudo">
                                    </input>
                                    <div className="pseudo-error"></div>
                                    <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="mot de passe"></input>
                                    <div className="password-error"></div>
                                    <input type="password" name="control-password" id="control-password" onChange={(e) => { setControlPassword(e.target.value) }} value={controlpassword} placeholder="confirmer votre mot de passe">
                                    </input>
                                    <div className="controlpassword-error"></div>
                                    <input type="checkbox" id="terms"></input>
                                    <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions générales</a></label>
                                    <div className="terms-error"></div>
                                    <input type="submit" value="S'inscrire"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </article>
            )}
        </div>
    )
}

export default SignUpForm
