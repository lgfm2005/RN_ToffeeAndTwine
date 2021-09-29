import { LOGIN, SIGNUP, GET_SPECIAL_DAY, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const {
        token,
        userId,
        userIsActive,
        userFname,
        userLname,
        userOtp,
        userProfileImage,
        defaultSpecialMoment,
        isAutoLogin,
      } = action.payload;
      return {
        token,
        userId,
        userIsActive,
        userFname,
        userLname,
        userOtp,
        userProfileImage,
        defaultSpecialMoment,
        isAutoLogin,
      };
    }
    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
