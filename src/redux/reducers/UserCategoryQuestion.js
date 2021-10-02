import { USERCATEGORYQUESTION, LOGOUT } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USERCATEGORYQUESTION: {
      return action.payload;
    }
    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
