import { CATEGORIES } from "../types";

const initialState = [{}];

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES: {
      return action.payload;
    }
    default:
      return state;
  }
};
