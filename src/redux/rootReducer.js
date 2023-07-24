import { combineReducers } from "redux";
import { allPostsReducer } from "./reducers/allPosts.reducer";
import errorReducer from "./reducers/error.reducer";
import postReducer from "./reducers/post.reducer";
import { trendingReducer } from "./reducers/trending.reducer";
import userReducer from "./reducers/user.reducer";
import usersReducer from "./reducers/users.reducer";


export const rootReducer = combineReducers({
    user : userReducer,
    users : usersReducer,
    posts : postReducer,
    error : errorReducer,
    allPosts : allPostsReducer,
    trending : trendingReducer
})