import { NOTIFICATION_TAB_EVENT, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TAB_EVENT: {
      const { isGiftTab } = action.payload;
      return { isGiftTab };
    }

    // case LOGOUT: {
    //   return initialState;
    // }

    default:
      return state;
  }
};
