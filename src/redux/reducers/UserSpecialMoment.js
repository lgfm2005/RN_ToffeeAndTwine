import { USERSPECIALMOMENT } from "../types";

const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case USERSPECIALMOMENT: {
      return action.payload;
    }

    // case LOGOUT: {
    //   return initialState;
    // }

    default:
      return state;
  }
};
