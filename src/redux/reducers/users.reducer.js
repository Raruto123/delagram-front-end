import { GET_USERS } from "../actions/users.actions";

const initialState = {
    users : []
};

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users : action.payload
            }
        default:
            return state;
    }
}