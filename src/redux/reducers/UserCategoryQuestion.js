import { USERCATEGORYQUESTION } from "../types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case USERCATEGORYQUESTION: {
      return action.payload;
    }

    default:
      return state;
  }
};
