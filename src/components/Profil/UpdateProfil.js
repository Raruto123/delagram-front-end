import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UpdateBio } from "../../redux/actions/user.actions";
import UploadImg from "./UploadImg";
import { DateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
// import { IsEmpty } from "../Utils";


function UpdateProfil() {
    
    const dispatch = useDispatch();
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopUp, setFollowingPopUp] = useState(false);
    const [followersPopUp, setFollowersPopUp] = useState(false);
    const userPseudo = useSelector((state) => state.user.pseudo);
    const userPicture = useSelector((state) => state.user.picture);
    const userData = useSelector((state) => state.user);
    const usersData = useSelector((state) => state.users.users);
    const error = useSelector((state) => state.error.userErrors);
    

    const handleUpdate = () => {
        dispatch(UpdateBio(userData._id, bio));
        setUpdateForm(false)

    }

    
    return(
        <div className="profil-container">
            <div className="update-container">
                <div className="left-part">
                    <h3>{userPseudo}</h3>
                    <img src={userPicture} alt="user-pic"></img>
                    <UploadImg></UploadImg>
                    <p>{error.maxSize}</p>
                    <p>{error.format}</p>
                </div>
                <div className="right-part">
                <h4>Membre depuis le {DateParser(userData.createdAt)}</h4>
                    <div className="fame">
                        <h5 onClick={() => setFollowingPopUp(true)}>Abonnements : {userData.following ? userData.following.length : ""}</h5>
                        <h5 onClick={() => setFollowersPopUp(true)}>Abonnés : {userData.followers ? userData.followers.length : ""}</h5>
                    </div>
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false && (
                            <>
                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                            <button onClick={() => setUpdateForm(!updateForm)}>
                                Modifier bio
                            </button>
                            </>
                        )}
                        {updateForm && (
                            <>
                            <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {followingPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span className="cross" onClick={() => setFollowingPopUp(false)}>&#10005;</span>
                        <ul>
                            {usersData.users.map((user) => {
                                for (let i = 0; i < userData.following.length; i++) {
                                    if (user._id === userData.following[i]) {
                                        return(
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic"></img>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow = {user._id} type="suggestion"></FollowHandler>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                                return null
                            })}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopUp && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span className="cross" onClick={() => setFollowersPopUp(false)}>&#10005;</span>
                        <ul>
                            {usersData.users.map((user) => {
                                for (let i = 0; i < userData.followers.length; i++) {
                                    if (user._id === userData.followers[i]) {
                                        return(
                                            <li key={user._id}>
                                                <img src={user.picture} alt="user-pic"></img>
                                                <h4>{user.pseudo}</h4>
                                                <div className="follow-handler">
                                                    <FollowHandler idToFollow = {user._id} type="suggestion"></FollowHandler>
                                                </div>
                                            </li>
                                        )
                                    }
                                }
                                return null
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateProfil