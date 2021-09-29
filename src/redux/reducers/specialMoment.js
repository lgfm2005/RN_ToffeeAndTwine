import { SPECIALMOMENT } from "../types";

const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case SPECIALMOMENT: {
      return action.payload;
    }

    // case LOGOUT: {
    //   return initialState;
    // }

    default:
      return state;
  }
};
