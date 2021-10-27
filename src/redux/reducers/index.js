import { combineReducers } from "redux";
import session from "./session";
import updateProfile from "./updateProfile";
import categories from "./categories";
import UserCategoryQuestion from "./UserCategoryQuestion";
import specialMoment from "./specialMoment";
import UserSpecialMoment from "./UserSpecialMoment";
import notifactionTabEvent from "./notifactionTabEvent";
import navigationFollow from "./navigationFollow";

export default combineReducers({
  session,
  updateProfile,
  categories,
  UserCategoryQuestion,
  specialMoment,
  UserSpecialMoment,
  notifactionTabEvent,
  navigationFollow,
});
