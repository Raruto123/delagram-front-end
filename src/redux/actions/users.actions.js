import axios from "axios";

export const GET_USERS = "GET_USERS";

export const GetUsers = () => {
    return(dispatch) => {
        return axios.get("https://delagram-app-api.onrender.com/api/user").then((res) => {
            dispatch({type : GET_USERS, payload : res.data});
        }).catch((err) => {
            console.log((err));
        })
    }
}