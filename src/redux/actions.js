import { LOGIN, GETSPECIALDAY, CATEGORIES, LOGOUT } from "./types";
import { createAction } from "redux-actions";
import * as API from "./api";
import { showMessage } from "react-native-flash-message";

import { useDispatch, useSelector } from "react-redux";

const loginAction = createAction(LOGIN);
const logoutAction = createAction(LOGOUT);
const categoriesAction = createAction(CATEGORIES);

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
        if (signUpresponse.data.StatusCode == "1") {
          dispatch(
            loginAction({
              token: response.data.Result[0].Token,
              userId: "1",
              userIsActive: "1",
              userFname: "",
              userLname: "",
              userOtp: "",
            })
          );
        }
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

    updateProfile: async (userFname, userLname, tokens) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      var data = new FormData();
      data.append("FName", userFname);
      data.append("LName", userLname);
      let response, error;
      try {
        response = await API.UpdateProfile.UpdateProfile(data, session);
        if (response.data.StatusCode == "1") {
          dispatch(
            loginAction({
              token: session.token,
              userId: tokens ? "1" : sessions.userId,
              userIsActive: tokens ? false : sessions.userIsActive,
              userFname: userFname,
              userLname: userLname,
              userOtp: tokens ? "43223423" : sessions.userOtp,
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
    CategoryList: async (LimitRecord, tokens) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      let GetCategoryListresponse, GetCategoryListerror;
      var data = new FormData();
      data.append("LimitRecord", LimitRecord);
      try {
        GetCategoryListresponse = await API.GetCategories.categories(
          data,
          session
        );
        if (GetCategoryListresponse.data.StatusCode == "1") {
          dispatch(categoriesAction(GetCategoryListresponse.data.Result));
        }
      } catch (e) {
        GetCategoryListerror = e;
      }
      return { GetCategoryListresponse, GetCategoryListerror };
    },

    GetSpecialDay: async (session) => {
      let response, error;
      try {
        response = await API.GetSpecialDays.get(session);
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
      IsFirst,
      tokens
    ) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      var data = new FormData();
      data.append("SpecialMomentID", SpecialDayID);
      data.append("UserSpecialMomentValue", UserSpecialDayValue);
      data.append("IsFirst", IsFirst);

      let addCategoryspecialDayResponse, addCategoryspecialDayError;
      try {
        addCategoryspecialDayResponse = await API.AdddCategorySpecialDays.get(
          session,
          data
        );
        if (addCategoryspecialDayResponse.data.StatusCode == "1") {
        } else {
          addCategoryspecialDayError =
            addCategoryspecialDayResponse.data.Message;
        }
      } catch (e) {
        addCategoryspecialDayError = e;
      }
      return { addCategoryspecialDayResponse, addCategoryspecialDayError };
    },

    addCategoryQuestion: async (tokens, data) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      console.log("Data", data);
      console.log("tokens", tokens);
      // var data = new FormData();
      // data.append("CategoryID[]", CategoryID);
      // data.append("CategoryQuestionID[]", CategoryQuestionID);
      // data.append("CategoryQuestionValue[]", CategoryQuestionValue);

      let addCategoryQuestionResponse, addCategoryQuestionError;
      try {
        addCategoryQuestionResponse = await API.AddCategoryQuestion.get(
          sessions,
          data
        );
        if (addCategoryQuestionResponse.data.StatusCode == "1") {
        } else {
          addCategoryQuestionError = addCategoryQuestionResponse.data.Message;
        }
      } catch (e) {
        addCategoryQuestionError = e;
      }
      return { addCategoryQuestionResponse, addCategoryQuestionError };
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

    updateCategoryQuestion: async (
      UserCategoryQuestionID,
      CategoryQuestionValue
    ) => {
      var data = new FormData();
      data.append("UserCategoryQuestionID[]", UserCategoryQuestionID);
      data.append("CategoryQuestionValue[]", CategoryQuestionValue);

      let response, error;
      try {
        response = await API.UpdateCategoryQuestion.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    getUserCategorySpecialMoment: async () => {
      let response, error;
      try {
        response = await API.GetUserCategorySpecialMoment.get(sessions);
        if (response.data.StatusCode == "1") {
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    getUserCategoryQuestion: async () => {
      let response, error;
      try {
        response = await API.GetUserCategoryQuestion.get(sessions);
        if (response.data.StatusCode == "1") {
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    updateCategorySpecialMoment: async (
      UserSpecialMomentID,
      UserSpecialMomentValue
    ) => {
      var data = new FormData();
      data.append("UserSpecialMomentID", UserSpecialMomentID);
      data.append("UserSpecialMomentValue", UserSpecialMomentValue);

      let response, error;
      try {
        response = await API.UpdateCategorySpecialMoment.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },
  };
};
