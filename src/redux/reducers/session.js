import { LOGIN, GET_SPECIAL_DAY, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const { token, userId, userIsActive, userFname, userLname, userOtp } =
        action.payload;
      return { token, userId, userIsActive, userFname, userLname, userOtp };
    }

    case GET_SPECIAL_DAY: {
      debugger;
      return action.payload;
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
