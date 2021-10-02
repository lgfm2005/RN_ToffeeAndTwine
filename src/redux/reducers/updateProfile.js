import { UPDATE_PROFILE, LOGOUT } from "../types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE: {
      const { userFname, userLname } = action.payload;
      return { userFname, userLname };
    }

    // case LOGOUT: {
    //   return initialState;
    // }

    default:
      return state;
  }
};
