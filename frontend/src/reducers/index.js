import { combineReducers } from 'redux';
import login from "./Login";
import profile from "./Profile";

const TwitterAppReducer = combineReducers({
    login: login,
    profile: profile
});

export default TwitterAppReducer;