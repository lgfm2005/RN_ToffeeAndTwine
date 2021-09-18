import {LOGIN, LOGOUT} from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      const {token, userId, userIsActive, userFname, userLname, userOtp} = action.payload;
      debugger
      return {token, userId, userIsActive, userFname, userLname, userOtp};
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};