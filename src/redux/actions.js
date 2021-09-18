import {
  LOGIN,
  LOGOUT,
} from "./types";
import {createAction} from "redux-actions";
import * as API from "./api";

import {useDispatch, useSelector} from "react-redux";

const loginAction = createAction(LOGIN);
const logoutAction = createAction(LOGOUT);


export const useActions = () => {
  const dispatch = useDispatch();


  return {
    /* Login */
    Login: async (email, password) => {
      var data = new FormData()
      data.append('Email', email)
      data.append('Password', password)
      let response, error;
      try {
        response = await API.User.login(data);
        debugger
       if(response.data.StatusCode == "1"){
        debugger
        dispatch(
          loginAction({
            token: response.data.Result[0].Token,
            userId: response.data.Result[0].user_id,
            userIsActive: response.data.Result[0].user_is_active,
            userFname: response.data.Result[0].user_fname,
            userLname: response.data.Result[0].user_lname,
            userOtp: response.data.Result[0].user_otp,
          }),
        );
       }else{
        error = response.data.Message;
       }
       
      } catch (e) {
        error = e;
      }

      return {response, error};
    },

    Logout: async () => {
      dispatch(loginValidAction("false"));
      dispatch(logoutAction());
    },

    // ForgotPassword: async (email) => {
    //   let response, error;
    //   try {
    //     response = await API.ForgotPassword.password(devAccess, email);
    //   } catch (e) {
    //     error = e;
    //   }
    //   return {response, error};
    // },

    // ChangeNewPassword: async (sessions, resetPassWordToken, newPassword) => {
    //   let response, error;

    //   try {
    //     response = await API.changeNewPassword.get(
    //       devAccess,
    //       session,
    //       resetPassWordToken,
    //       newPassword,
    //     );
    //   } catch (e) {
    //     error = e;
    //   }
    //   return {response, error};
    // },

   
  };
};
