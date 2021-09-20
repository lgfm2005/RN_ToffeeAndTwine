import { combineReducers } from "redux";
import session from "./session";
import updateProfile from "./updateProfile";

export default combineReducers({
  session,
  updateProfile,
});
