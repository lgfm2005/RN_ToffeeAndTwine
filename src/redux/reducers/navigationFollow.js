import { NAVIGATIONIS, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATIONIS: {
      return action.payload;
    }

    case LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
};
