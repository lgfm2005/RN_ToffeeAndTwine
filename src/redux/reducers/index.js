import { combineReducers } from "redux";
import session from "./session";
import updateProfile from "./updateProfile";
import categories from "./categories";

export default combineReducers({
  session,
  updateProfile,
  categories,
});
