// import { useEffect, useState } from "react"
// import { useSelector } from "react-redux";

// function Card(post) {
//     const [isLoading, setIsLoading] = useState(true);
//     const userData = useSelector((state) => state.user);
//     const usersData = useSelector((state) => state.users.users.users);

//     useEffect(() => {
//         setIsLoading(false);
//     }, [usersData])//à chaque fois que usersData va s'actualiser le UseEffect va s'effectuer pour nous afficher ce qui a été chargé en attendant cela il y a un chargement


//     return (
//         <>
//             {isLoading ? (
//                 <i class="fas fa-spinner fa-spin"></i>
//             ) : (
//                 <>
//                     <div className="card-left">
//                         {/* <img src={usersData.map((user) => {
//                             if (user._id === post.posterId) {
//                                 return user.picture;
//                             }
//                         }).join("")} alt="test"></img>  */}
//                         {usersData.map((user) => {
//                             return (
//                                 <img src={user.picture} alt="test"></img>                            )
//                         })}
//                     </div>
//                 </>
//             )}
//         </>
//     )

// }

// export default Card

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatePost } from "../../redux/actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { DateParser } from "../Utils";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";
import CardComment from "./CardComment";

function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const usersData = useSelector((state) => state.users.users.users);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const UpdateItem = () => {
        if (textUpdate) {
            dispatch(UpdatePost(post._id, textUpdate ));
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [usersData]);

    return (
        <li key={post._id} className="card-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        {usersData.map((user) => {
                            if (user._id === post.posterId) {
                                return (
                                    <img src={user.picture} alt="test" className="pseudo-pic"></img>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                {usersData.map((user) => {
                                    if (user._id === post.posterId) {
                                        return (
                                            <h3>{user.pseudo}</h3>
                                        )
                                    }
                                    return null
                                })}
                                {/* pour eviter de se suivre soi-même */}
                                {post.posterId !== userData._id && (
                                    <FollowHandler idToFollow={post.posterId} type="card" ></FollowHandler>
                                )}
                            </div>
                            <span>{DateParser(post.createdAt)}</span>
                        </div>
                        {isUpdated === false && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)}></textarea>
                                <button className="btn" onClick={UpdateItem}>Valider modification</button>
                            </div>
                        )}
                        {post.picture && <img src={post.picture} alt="card-pic" className="card-pic"></img>}
                        {post.video && (
                            <iframe width="500" height="300" src={post.video} title={post._id} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullscreen></iframe>
                        )}
                        {userData._id === post.posterId && (
                            <div className="button-container">
                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                    <img src="./img/icons/pen-to-square-solid.svg" alt="edit"></img>
                                </div>
                                <DeleteCard id={post._id}></DeleteCard>
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img onClick={() => setShowComment(!showComment)} src="./img/icons/comments-solid.svg" alt="comments"></img>
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post}></LikeButton>
                            <img src="./img/icons/share-solid.svg" alt="share"></img>
                        </div>
                        {showComment && <CardComment post = {post}></CardComment>}
                    </div>
                </>
            )}
        </li>
    );
}

export default Card;

