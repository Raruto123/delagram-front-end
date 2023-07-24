import axios from "axios";
// import { useDispatch } from "react-redux";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const GET_USER_ERRORS = "GET_USER_ERRORS"

export const GetUser = (uid) => {
    // const dispatch = useDispatch()
    return (dispatch) => {
        return axios.get(`https://delagram-app-api.onrender.com/api/user/${uid}`).then((res) => {
            dispatch({type : GET_USER, payload : res.data});
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const UploadPicture = (data, id) => {
    return (dispatch) => {
        return axios.post("https://delagram-app-api.onrender.com/api/user/upload", data).then((res) => {
            if (res.data.errors) {
                dispatch({type : GET_USER_ERRORS, payload : res.data.errors})
            } else {
                dispatch({type : GET_USER_ERRORS, payload : ""});
                return axios.get(`https://delagram-app-api.onrender.com/api/user/${id}`).then((res) => {
                    dispatch({type : UPLOAD_PICTURE, payload : res.data.picture});
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}

export const UpdateBio = (userId, bio) => {
    return(dispatch) => {
        return axios({
            method : "put",
            url: "https://delagram-app-api.onrender.com/api/user/" + userId,
            data : {bio}
        }).then((res) => {
            dispatch({type : UPDATE_BIO, payload: bio});
        }).catch((err) => {
            console.log((err))
        })
    }
}

export const FollowUser = (followerId, idToFollow) => {
    return(dispatch) => {
        return axios({
            method : "patch",
            url : "https://delagram-app-api.onrender.com/api/user/follow/" + followerId,
            data : {idToFollow}
        }).then((res) => {
            dispatch({type : FOLLOW_USER, payload : {idToFollow}})
        }).catch((err) => {
            console.log((err))
        })
    }
}

export const UnfollowUser = (followerId, idToUnfollow) => {
    return(dispatch) => {
        return axios({
            method : "patch",
            url : "https://delagram-app-api.onrender.com/api/user/unfollow/" + followerId,
            data : {idToUnfollow}
        }).then((res) => {
            dispatch({type : UNFOLLOW_USER, payload : {idToUnfollow}})
        }).catch((err) => {
            console.log((err))
        })
    }
}