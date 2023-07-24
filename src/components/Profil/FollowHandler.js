import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FollowUser, UnfollowUser } from "../../redux/actions/user.actions";
import { IsEmpty } from "../Utils";

function FollowHandler({idToFollow, type}) {
    const userData = useSelector((state) => state.user);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = () => {
        dispatch(FollowUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnfollow = () => {
        dispatch(UnfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    useEffect(() => {
        if (!IsEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            }else {
                setIsFollowed(false);
            }
        } 
        // if (userData.following) {
        //     setIsFollowed(true);
        // } else {
        //     setIsFollowed(false)
        // }

    }, [userData, idToFollow]);

    return (
        <>
            {isFollowed && userData && (
                <span onClick={handleUnfollow}>
                    {type === "suggestion" && <button className="unfollow-btn">Abonné</button>}
                    {type === "card" && <img src="./img/icons/check_circle_FILL1_wght400_GRAD0_opsz48.svg" alt="followed"></img>}
                </span>
            )}
            {isFollowed === false && userData && (
                <span onClick={handleFollow}>
                    {type === "suggestion" && <button className="follow-btn">Suivre</button>}
                    {type === "card" && <img src="./img/icons/check_circle_FILL0_wght400_GRAD0_opsz48.svg" alt="followed"></img>}
                </span>
            )}
        </>
    )


}

export default FollowHandler;

/* {isFollowed && !IsEmpty(userData) &&(
                    <span>
                        <button className="unfollow-btn">Abonné</button>
                    </span>
        )}

        {isFollowed === false && !IsEmpty(userData) &&(
                    <span>
                        <button className="follow-btn">Suivre</button>
                    </span>
        )} */