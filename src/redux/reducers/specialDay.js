import { GET_SPECIAL_DAY, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SPECIAL_DAY: {
      return action.payload;
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
