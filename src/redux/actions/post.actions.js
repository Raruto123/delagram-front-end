import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const GET_TRENDS = "GET_TRENDS";

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const GetPosts = (num) => {
    return (dispatch) => {
        return axios.get("https://delagram-app-api.onrender.com/api/post/").then((res) => {
            const array = res.data.slice(0, num)
            dispatch({type : GET_POSTS, payload : array});
            dispatch({type : GET_ALL_POSTS, payload : res.data});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export const AddPost = (data) => {
    return(dispatch) => {
        return axios.post("https://delagram-app-api.onrender.com/api/post/", data).then((res) => {
            if (res.data.errors) {
                dispatch({type : GET_POST_ERRORS, payload : res.data.errors})
            } else {
                dispatch({type : GET_POST_ERRORS, payload:""});
            }
        })
    }
}

export const LikePost= (postId, userId) => {
    return(dispatch) => {
        return axios({
            method : "patch",
            url : "https://delagram-app-api.onrender.com/api/post/like-post/" + postId,
            data : {idToLike : userId}
        }).then((res) => {
            dispatch({type : LIKE_POST, payload : {postId, userId} });
        }).catch((err) => {
            console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
            console.log((err))
        })
    }
}

export const UnlikePost= (postId, userId) => {
    return(dispatch) => {
        return axios({
            method : "patch",
            url : "https://delagram-app-api.onrender.com/api/post/unlike-post/" + postId,
            data : {idToUnlike : userId}
        }).then((res) => {
            dispatch({type : UNLIKE_POST, payload : {postId, userId} });
        }).catch((err) => {
            console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
            console.log((err))
        })
    }
}

export const UpdatePost = (postId, message) => {
    return(dispatch) => {
        return axios({
            method : "put",
            url : "https://delagram-app-api.onrender.com/api/post/" + postId,
            data : {message}
        }).then((res) => {
            dispatch({type : UPDATE_POST, payload : {message, postId}})
        }).catch((err) => {
            console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
            console.log((err))
        })
    }
}

export const DeletePost = (postId) => {
    return(dispatch) => {
        return axios({
            method : "delete",
            url : "https://delagram-app-api.onrender.com/api/post/" + postId
        }).then((res) => {
            dispatch({type : DELETE_POST, payload : {postId}})
        }).catch((err) => {
            console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
            console.log((err))
        })
    }
}


export const AddComment = (postId, commenterId, commenterPseudo, text) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url:"https://delagram-app-api.onrender.com/api/post/comment-post/" + postId,
            data: {commenterId, commenterPseudo, text}
        }).then((res) => {
            dispatch({type : ADD_COMMENT, payload: {postId}});
        }).catch((err) => {
            console.log((err))
        })
    }
}

// export const EditComment = (postId, commentId, text) => {
//     return(dispatch) => {
//         return axios({
//             method:"patch",
//             url:"http://localhost:3000/api/post/edit-comment-post/" + postId,
//             data: {commentId, text}
//         }).then((res) => {
//             dispatch({type : EDIT_COMMENT, payload: {postId, commentId, text}});//payload = ce que tu veux récupérer de la base de donnée
//         }).catch((err) => {
//             console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
//             console.log(("est-ce toi"))
//         })
//     }
// }


export const EditComment = (postId, commentId, text) => {
    return (dispatch) => {
      return axios
        .patch(`https://delagram-app-api.onrender.com/api/post/edit-comment-post/${postId}`, {
          commentId,
          text,
        })
        .then((res) => {
          dispatch({
            type: EDIT_COMMENT,
            payload: { postId, commentId, text },
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          console.log((err));
        });
    };
  };
  

export const DeleteComment = (postId, commentId) => {
    return(dispatch) => {
        return axios({
            method:"patch",
            url:"https://delagram-app-api.onrender.com/api/post/delete-comment-post/" + postId,
            data: {commentId}
        }).then((res) => {
            dispatch({type : DELETE_COMMENT, payload: {postId, commentId}});//payload = ce que tu veux récupérer de la base de donnée
        }).catch((err) => {
            console.log(err.response.data); // Ajoutez cette ligne pour afficher les erreurs renvoyées par le serveur
            console.log((err))
        })
    }
}

export const GetTrends = (sortedArray) => {
    return(dispatch) => {
        dispatch({type : GET_TRENDS, payload : sortedArray})
    }
}