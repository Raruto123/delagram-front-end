import { useContext, useEffect, useState } from "react"
import { UidContext } from "../AppContext";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from "react-redux";
import { LikePost, UnlikePost } from "../../redux/actions/post.actions";

function LikeButton({post}) {
    const [liked, setLiked] =useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const Like = () => {
        // dispatch(LikePost(post._id, uid));
        // setLiked(true);
            dispatch(LikePost(post._id, uid));
            setLiked(true);
         }

    const Unlike = () => {
            dispatch(UnlikePost(post._id, uid));
            setLiked(false);
        }
    

    useEffect(() => {
        if (post.likers.includes(uid)) {
            setLiked(true)
        }else {
            setLiked(false)
        }
    }, [uid, post.likers, liked])

    return(
        <div className="like-container">
            {uid === null && (
                <Popup trigger={<img src="./img/icons/heart-solid.svg" alt="like"></img>} position={["bottom center", "bottom right", "bottom left"]} closeOnDocumentClick>
                    <div>Connectez-vous pour aimer un post</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img src="./img/icons/heart-regular.svg" alt="like" onClick={Like}></img>
            )}
            {uid && liked === true && (
                <img src="./img/icons/icons8-heart-suit-48.png" alt="unlike" onClick={Unlike}></img>
            )}
            <span>{post.likers.length}</span>
        </div>
    )
    
}

export default LikeButton