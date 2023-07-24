import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AddPost, GetPosts } from "../../redux/actions/post.actions";
import { TimestampParser } from "../Utils";

function NewPostForm() {

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState("");
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.user);
    const error = useSelector((state) => state.error.postErrors);
    const dispatch = useDispatch();


    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo("");
    }

    const handlePost = async () => {
        if (message || postPicture || video) {
            const data = new FormData();
            data.append("posterId", userData._id);
            data.append("message", message);
            if (file) {
                data.append("file", file);
            };
            data.append("video", video);

            await dispatch(AddPost(data));
            dispatch(GetPosts());
            cancelPost();


        }else {
            alert("Veuillez entrer un message")
        }
    }

    const cancelPost = () => {
        setMessage("");
        setPostPicture(null);
        setVideo("");
        setFile("");
    }

    useEffect(() => {
        if (userData) {
            setIsLoading(false);
        }
        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
              if (
                findLink[i].includes("https://www.yout") ||
                findLink[i].includes("https://yout")
              ) {
                let embed = findLink[i].replace("watch?v=", "embed/");
                setVideo(embed.split("&")[0]);
                findLink.splice(i, 1);
                setMessage(findLink.join(" "));
                setPostPicture('');
              }
            }
          };
        handleVideo();
    }, [userData, message, video])//à chaque fois que tu as les données passées ici tu relances le useEffect

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        {/* {userData.following.length > 1 ? <p><span>{userData.following.length}</span> Abonnements</p> :
                            <p><span>{userData.following.length}</span> Abonnement</p>}
                        {userData.followers.length > 1 ? <p><span>{userData.followers.length}</span> Abonnés</p> :
                            <p><span>{userData.followers.length}</span> Abonné</p>} */}
                        <p>
                            <span>{userData.following ? userData.following.length : 0}</span> Abonnement{userData.following && userData.following.length > 1 ? "s" : null}
                        </p>
                        <p>
                            <span>{userData.followers ? userData.followers.length : 0}</span> Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <NavLink to="/profil">
                        <div className="user-info">
                            <img src={userData.picture} alt="user-img"></img>
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea name="message" id="message" placeholder="Créer vos posts ici ! Vous pouvez partager du texte, des photos et des liens YouTube" onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={userData.picture} alt="user-pic"></img>
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>{TimestampParser(Date.now())}</span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt=""></img>
                                        {video !== ""&& (
                                            <iframe src={video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen title={video}></iframe> 
                                        )}
                                    </div>
                                </div>
                            </li>
                        ) : (null)}
                        <div className="footer-form">
                            <div className="icon">
                                {video === "" && (
                                    <div>
                                        <img src="./img/icons/image-regular.svg" alt="img"></img>
                                        <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => handlePicture(e)}></input>
                                    </div>
                                )}
                                {video !== "" && (
                                    <button onClick={() => setVideo("")}>Supprimer video</button>
                                )}
                                {error.format && <p>{error.format}</p>}
                                {error.maxSize && <p>{error.maxSize}</p>}
                            </div>
                            <div className="btn-send">
                                {message !== "" || postPicture !== null || video.length > 20 ? (
                                <button className="cancel" onClick={cancelPost}>Annuler la publication</button>
                                ) : (null)
                                }
                                <button className="send" onClick={handlePost}>Publier</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}

export default NewPostForm