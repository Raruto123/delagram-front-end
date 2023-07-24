import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

//dev tools
import {composeWithDevTools} from "@redux-devtools/extension";
// import logger from "redux-logger";
import { GetUsers} from "./actions/users.actions";
import { GetPosts } from "./actions/post.actions";

export const store = createStore(rootReducer,   composeWithDevTools(applyMiddleware(thunk))
)
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)))


store.dispatch(GetUsers());//pour récupérer les informations sur tous les utilisateurs dès l'arrivée sur le site
store.dispatch((GetPosts()));
