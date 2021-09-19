import { LOGIN, LOGOUT } from "./types";
import { createAction } from "redux-actions";
import * as API from "./api";
import { showMessage } from "react-native-flash-message";

import { useDispatch, useSelector } from "react-redux";

const loginAction = createAction(LOGIN);
const logoutAction = createAction(LOGOUT);

export const useActions = () => {
  const dispatch = useDispatch();
  const sessions = useSelector((state) => state.session);

  return {
    /* Login */
    Login: async (email, password) => {
      var data = new FormData();
      data.append("Email", email);
      data.append("Password", password);
      let response, error;
      try {
        response = await API.User.login(data);
        if (response.data.StatusCode == "1") {
          dispatch(
            loginAction({
              token: response.data.Result[0].Token,
              userId: response.data.Result[0].user_id,
              userIsActive: response.data.Result[0].user_is_active,
              userFname: response.data.Result[0].user_fname,
              userLname: response.data.Result[0].user_lname,
              userOtp: response.data.Result[0].user_otp,
            })
          );
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }

      return { response, error };
    },

    Logout: async () => {
      dispatch(loginValidAction("false"));
      dispatch(logoutAction());
    },

    signUp: async (Email, Password, CPassword) => {
      var data = new FormData();
      data.append("Email", Email);
      data.append("Password", Password);
      data.append("CPassword", CPassword);

      let response, error;
      try {
        response = await API.Signups.signUp(data);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    ForgotPasswords: async (email) => {
      var data = new FormData();
      data.append("Email", email);
      let response, error;
      try {
        response = await API.ForgotPassword.password(data);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    ForgotPasswordOTPS: async (email, otp) => {
      var data = new FormData();
      data.append("Email", email);
      data.append("OTP", otp);

      let response, error;
      try {
        response = await API.ForgotPasswordOTP.OTP(data);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    ChangePassword: async (UserID, NewPassword, RePassword) => {
      var data = new FormData();
      data.append("UserID", UserID);
      data.append("NewPassword", NewPassword);
      data.append("RePassword", RePassword);

      let response, error;
      try {
        response = await API.ChangeNewPassword.password(data);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    ResendOTPs: async (email) => {
      var data = new FormData();
      data.append("Email", email);
      let response, error;
      try {
        response = await API.ResendOtp.OTP(data);
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

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
