import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AddComment, GetPosts } from "../../redux/actions/post.actions";
import FollowHandler from "../Profil/FollowHandler";
import { TimestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

function CardComment({post}) {
    const usersData = useSelector((state) => state.users.users.users);
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    const HandleComment = (e) => {
        e.preventDefault();

        if (text) {
            dispatch(AddComment(post._id, userData._id, userData.pseudo, text)).then(() => dispatch(GetPosts())).then(() => setText(""));//ça doit être dans l'ordre de ton model et du postman aussi params puis ensuite les req.body
        }
    }



    return(
        <div className="comments-container">
            {post.comments.map((comment) => {
                return(
                    <div className={comment.commenterId === userData._id ? "comment-container client" : "comment-container"} key={comment._id}>
                        <div className="left-part-comment">
                            {usersData.map((user) => {
                                if (user._id === comment.commenterId) {
                                    return(
                                        <img src={user.picture} alt="comment-pic"></img>
                                    )
                                }
                                return null
                            })}
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{comment.commenterPseudo}</h3>
                                    {comment.commenterId !== userData._id &&(//strange comportement à revoir quand tu follow one ça follow toutes les personnes de la liste de commentaire
                                        <FollowHandler idToFollow={comment.commenterId} type={"card"}></FollowHandler>
                                    )}
                                </div>
                                <span>{TimestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id}></EditDeleteComment>
                        </div>
                    </div>
                )
            })}
            {userData._id && (
                <form action="" onSubmit={HandleComment} className="comment-form">
                    <input type="text" name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Ajouter un commentaire..."></input>
                    <input type="submit" value="Publier"></input>
                </form>
            )}
        </div>
    )
    
}

export default CardComment