import { LOGIN, SIGNUP, GET_SPECIAL_DAY, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log("action", action.payload);
      const {
        token,
        userId,
        userIsActive,
        userFname,
        userLname,
        userOtp,
        userProfileImage,
        defaultSpecialMoment,
      } = action.payload;
      debugger;
      return {
        token,
        userId,
        userIsActive,
        userFname,
        userLname,
        userOtp,
        userProfileImage,
        defaultSpecialMoment,
      };
    }
    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
