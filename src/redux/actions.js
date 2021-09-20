import { LOGIN, GETSPECIALDAY, LOGOUT } from "./types";
import { createAction } from "redux-actions";
import * as API from "./api";
import { showMessage } from "react-native-flash-message";

import { useDispatch, useSelector } from "react-redux";

const loginAction = createAction(LOGIN);
const logoutAction = createAction(LOGOUT);

// const getSpecialDay = createAction(GETSPECIALDAY);

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

    // Logout
    Logout: async () => {
      dispatch(loginValidAction("false"));
      dispatch(logoutAction());
    },

    signUp: async (Email, Password, CPassword) => {
      var data = new FormData();
      data.append("Email", Email);
      data.append("Password", Password);
      data.append("CPassword", CPassword);

      let signUpresponse, signUperror;
      try {
        signUpresponse = await API.Signups.signUp(data);
      } catch (e) {
        signUperror = e;
      }
      return { signUpresponse, signUperror };
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

    updateProfile: async (userFname, userLname) => {
      var data = new FormData();
      data.append("FName", userFname);
      data.append("LName", userLname);
      let response, error;
      try {
        response = await API.UpdateProfile.UpdateProfile(data, sessions);
        if (response.data.StatusCode == "1") {
          dispatch(
            loginAction({
              token: sessions.token,
              userId: sessions.userId,
              userIsActive: sessions.userIsActive,
              userFname: userFname,
              userLname: userLname,
              userOtp: sessions.userOtp,
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

    GetSpecialDay: async () => {
      let response, error;
      try {
        response = await API.GetSpecialDays.get();
        if (response.data.StatusCode == "1") {
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    GetCategoryList: async () => {
      let response, error;
      try {
        response = await API.GetCategories.get();
        if (response.data.StatusCode == "1") {
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    addCategoryspecialDay: async (
      SpecialDayID,
      UserSpecialDayValue,
      IsFirst
    ) => {
      var data = new FormData();
      data.append("SpecialDayID", SpecialDayID);
      data.append("UserSpecialDayValue", UserSpecialDayValue);
      data.append("IsFirst", IsFirst);

      let response, error;
      try {
        response = await API.addCategoryspecialDay.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    addCategoryQuestion: async (
      CategoryID,
      CategoryQuestionID,
      CategoryQuestionValue
    ) => {
      var data = new FormData();
      data.append("CategoryID[]", CategoryID);
      data.append("CategoryQuestionID[]", CategoryQuestionID);
      data.append("CategoryQuestionValue[]", IsFirst);

      let response, error;
      try {
        response = await API.AddCategoryQuestion.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    deleteUserCategorySpecialDay: async (UserSpecialDayID) => {
      var data = new FormData();
      data.append("UserSpecialDayID", UserSpecialDayID);

      let response, error;
      try {
        response = await API.DeleteUserCategorySpecialDay.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    deleteUserCategoryQuestion: async (UserQuestionID) => {
      var data = new FormData();
      data.append("UserQuestionID", UserQuestionID);

      let response, error;
      try {
        response = await API.DeleteUserCategoryQuestion.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    // GetAssets: async (ses, accountId) => {
    //   const session = await refresh();
    //   const response = await API.Assets.get(devAccess, session, accountId);
    //   dispatch(getAssetsAction(response.data.data));
    //   return {response};
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
