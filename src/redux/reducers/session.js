import { LOGIN, SIGNUP, GET_SPECIAL_DAY, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const {
        token,
        userId,
        userProfileImage,
        userIsActive,
        userFname,
        userLname,
        userOtp,
      } = action.payload;
      return {
        token,
        userId,
        userProfileImage,
        userIsActive,
        userFname,
        userLname,
        userOtp,
      };
    }
    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
