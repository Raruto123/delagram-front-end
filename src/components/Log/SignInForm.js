import axios from "axios";
import { useState } from "react";


function SignInForm() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const Navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector(".email-error");
        const passwordError = document.querySelector(".password-error");

        axios({
            method: "post",
            url: `https://delagram-app-api.onrender.com/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password
            }
        }).then((res) => {
            console.log(res);
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else {
                window.location = "/accueil";//redirige aussi sur accueil

            }
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <article className="login_page">
            <div className="login-left-side">
                <img src="./img/phone-pic.png" alt="phone-pic"></img>
            </div>
            <div className="login-right-side">
                <div className="login-form-div">
                    <div className="login-logo-container">
                        <div className="login-logo">
                            <i>Delagram</i>
                        </div>
                    </div>
                </div>
                <div className="login-form-container">
                    <form action="" onSubmit={handleLogin} id="sign-in-form">
                        <input type="text" name="email" id="email" onChange={(e) => { setEmail(e.target.value) }} value={email} placeholder="e-mail">
                        </input>
                        <div className="email-error"></div>
                        <input type="password" name="password" id="password" onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder="mot de passe"></input>
                        <div className="password-error"></div>
                        <input type="submit" value="Se connecter"></input>
                    </form>
                </div>
                <div className="already-registered">
                    <span>
                        <p>
                            pas encore de compte ? <a href="/">Inscrivez-vous</a>
                        </p>
                    </span>
                </div>
            </div>
        </article>
    )
}

export default SignInForm