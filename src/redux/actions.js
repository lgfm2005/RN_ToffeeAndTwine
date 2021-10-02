import {
  LOGIN,
  USERCATEGORYQUESTION,
  GETSPECIALDAY,
  SPECIALMOMENT,
  USERSPECIALMOMENT,
  CATEGORIES,
  LOGOUT,
} from "./types";
import { createAction } from "redux-actions";
import * as API from "./api";
import { showMessage } from "react-native-flash-message";

import { useDispatch, useSelector } from "react-redux";

const loginAction = createAction(LOGIN);
const logoutAction = createAction(LOGOUT);
const categoriesAction = createAction(CATEGORIES);
const userCategoryQuestion = createAction(USERCATEGORYQUESTION);
const SpecialMoment = createAction(SPECIALMOMENT);
const userSpecialMoment = createAction(USERSPECIALMOMENT);

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
              userProfileImage: response.data.Result[0].user_profile_image,
              userIsActive: response.data.Result[0].user_is_active,
              userFname: response.data.Result[0].user_fname,
              userLname: response.data.Result[0].user_lname,
              defaultSpecialMoment:
                response.data.Result[0].default_special_moment,
              userOtp: response.data.Result[0].user_otp,
              isAutoLogin: true,
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
              userProfileImage: "",
              defaultSpecialMoment: "",
              isAutoLogin: true,
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

    updateProfile: async (
      userFname,
      userLname,
      ImageUrl,
      DefaultSpecialMoment,
      tokens
    ) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }

      var urlImage = "";
      if (!ImageUrl.length == 0) {
        urlImage =
          "data:" +
          JSON.parse(ImageUrl).mime +
          ";base64," +
          JSON.parse(ImageUrl).data;
      } else {
        urlImage = sessions.userProfileImage;
      }
      var data = new FormData();
      data.append("FName", userFname);
      data.append("LName", userLname);
      data.append("Image", ImageUrl);
      data.append("DefaultSpecialMoment", DefaultSpecialMoment);
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
              userProfileImage: urlImage,
              defaultSpecialMoment: DefaultSpecialMoment,
              isAutoLogin: true,
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
          var categoryData = GetCategoryListresponse.data.Result;
          dispatch(categoriesAction(categoryData));
        }
      } catch (e) {
        GetCategoryListerror = e;
      }
      return { GetCategoryListresponse, GetCategoryListerror };
    },

    GetSpecialMoment: async (tokens) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      let specialMomentResponse, specialMomentError;
      try {
        specialMomentResponse = await API.GetSpecialMoment.get(session);
        if (specialMomentResponse.data.StatusCode == "1") {
          dispatch(SpecialMoment(specialMomentResponse.data.Result));
        }
      } catch (e) {
        specialMomentError = e;
      }
      return { specialMomentResponse, specialMomentError };
    },

    addCategoryspecialDay: async (
      SpecialMomentID,
      UserSpecialMomentTitle,
      UserSpecialMomentValue,
      UserSpecialMomentLink,
      UserSpecialMomentInfo,
      Image,
      IsFirst,
      tokens
    ) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      var data = new FormData();
      data.append("SpecialMomentID", SpecialMomentID);
      data.append("UserSpecialMomentTitle", UserSpecialMomentTitle);
      data.append("UserSpecialMomentValue", UserSpecialMomentValue);
      data.append("UserSpecialMomentLink", UserSpecialMomentLink);
      data.append("UserSpecialMomentInfo", UserSpecialMomentInfo);
      data.append("Image", Image);
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

    deleteUserCategoryQuestion: async (CategoryID) => {
      var data = new FormData();
      data.append("CategoryID", CategoryID);

      let deleteUserCategoryQuestionResponse, deleteUserCategoryQuestionError;
      try {
        deleteUserCategoryQuestionResponse =
          await API.DeleteUserCategoryQuestion.get(sessions, data);
        if (deleteUserCategoryQuestionResponse.data.StatusCode == "1") {
        } else {
          deleteUserCategoryQuestionError =
            deleteUserCategoryQuestionResponse.data.Message;
        }
      } catch (e) {
        deleteUserCategoryQuestionError = e;
      }
      return {
        deleteUserCategoryQuestionResponse,
        deleteUserCategoryQuestionError,
      };
    },

    deleteUserCategorySpecialDay: async (UserSpecialMomentID) => {
      var data = new FormData();
      data.append("UserSpecialMomentID", UserSpecialMomentID);

      let deleteUserCategorySpecialDayResponse,
        deleteUserCategorySpecialDayError;
      try {
        deleteUserCategorySpecialDayResponse =
          await API.DeleteUserCategorySpecialDay.get(sessions, data);
        if (deleteUserCategorySpecialDayResponse.data.StatusCode == "1") {
        } else {
          deleteUserCategorySpecialDayError =
            responsdeleteUserCategorySpecialDayResponsee.data.Message;
        }
      } catch (e) {
        deleteUserCategorySpecialDayError = e;
      }
      return {
        deleteUserCategorySpecialDayResponse,
        deleteUserCategorySpecialDayError,
      };
    },

    addCategoryQuestion: async (tokens, IsFirst, getQuestionsData) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      var data = new FormData();
      getQuestionsData.map((item) => {
        data.append("IsFirst", IsFirst);
        data.append("CategoryID[]", item.category_id);
        data.append("CategoryQuestionID[]", item.category_question_id);
        if (item.value == undefined) {
          data.append("CategoryQuestionValue[]", item.category_placeholder);
        } else {
          data.append("CategoryQuestionValue[]", item.value);
        }
      });
      debugger;
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

    updateCategoryQuestion: async (tokens, getUpdateQuestionData) => {
      var session = sessions;
      if (tokens) {
        session = tokens;
      }
      var data = new FormData();
      getUpdateQuestionData.map((item) => {
        data.append("UserCategoryQuestionID[]", item.categoryQuestionId);
        data.append("CategoryQuestionValue[]", item.value);
      });

      let updateCategoryQuestionResponse, updateCategoryQuestionError;
      try {
        updateCategoryQuestionResponse = await API.UpdateCategoryQuestion.get(
          sessions,
          data
        );
        if (updateCategoryQuestionResponse.data.StatusCode == "1") {
        } else {
          updateCategoryQuestionError =
            updateCategoryQuestionResponse.data.Message;
        }
      } catch (e) {
        updateCategoryQuestionError = e;
      }
      return { updateCategoryQuestionResponse, updateCategoryQuestionError };
    },

    getUserCategorySpecialMoment: async () => {
      let getUserCategorySpecialMomentResponse,
        getUserCategorySpecialMomentError;
      try {
        getUserCategorySpecialMomentResponse =
          await API.GetUserCategorySpecialMoment.get(sessions);
        if (getUserCategorySpecialMomentResponse.data.StatusCode == "1") {
          dispatch(
            userSpecialMoment(getUserCategorySpecialMomentResponse.data.Result)
          );
        }
      } catch (e) {
        getUserCategorySpecialMomentError = e;
      }
      return {
        getUserCategorySpecialMomentResponse,
        getUserCategorySpecialMomentError,
      };
    },

    getUserCategoryQuestion: async (token) => {
      var session = sessions;
      if (token) {
        session = token;
      }

      let UserCategoryQuestionResponse, UserCategoryQuestionError;
      try {
        UserCategoryQuestionResponse = await API.GetUserCategoryQuestion.get(
          session
        );
        if (UserCategoryQuestionResponse.data.StatusCode == "1") {
          dispatch(
            userCategoryQuestion(UserCategoryQuestionResponse.data.Result)
          );
        }
      } catch (e) {
        UserCategoryQuestionError = e;
      }
      return { UserCategoryQuestionResponse, UserCategoryQuestionError };
    },

    updateCategorySpecialMoment: async (
      SpecialMomentID,
      UserSpecialMomentTitle,
      UserSpecialMomentValue,
      UserSpecialMomentLink,
      UserSpecialMomentInfo,
      Image
    ) => {
      var data = new FormData();
      data.append("UserSpecialMomentID", SpecialMomentID);
      data.append("UserSpecialMomentTitle", UserSpecialMomentTitle);
      data.append("UserSpecialMomentValue", UserSpecialMomentValue);
      data.append("UserSpecialMomentLink", UserSpecialMomentLink);
      data.append("UserSpecialMomentInfo", UserSpecialMomentInfo);
      data.append("Image", Image);

      let updateCategorySpecialMomentResponse, updateCategorySpecialMomentError;
      try {
        updateCategorySpecialMomentResponse =
          await API.UpdateCategorySpecialMoment.get(sessions, data);
        if (updateCategorySpecialMomentResponse.data.StatusCode == "1") {
        } else {
          updateCategorySpecialMomentError =
            updateCategorySpecialMomentResponse.data.Message;
        }
      } catch (e) {
        updateCategorySpecialMomentError = e;
      }
      return {
        updateCategorySpecialMomentResponse,
        updateCategorySpecialMomentError,
      };
    },

    updateSetting: async (NotifyGifting, NotifySpecialMoment) => {
      var data = new FormData();
      data.append("NotifyGifting", NotifyGifting);
      data.append("NotifySpecialMoment", NotifySpecialMoment);

      let response, error;
      try {
        response = await API.UpdateSetting.get(sessions, data);
        if (response.data.StatusCode == "1") {
        } else {
          error = response.data.Message;
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    getSetting: async () => {
      let response, error;
      try {
        response = await API.GetSetting.get(sessions);
        if (response.data.StatusCode == "1") {
        }
      } catch (e) {
        error = e;
      }
      return { response, error };
    },

    socialAuth: async (userFname, userLname, Email, Type) => {
      var data = new FormData();
      data.append("Fname", userFname);
      data.append("Lname", userLname);
      data.append("Email", Email);
      data.append("Type", Type);

      let response, error;
      try {
        response = await API.SocialAuth.get(sessions, data);
        if (response.data.StatusCode == "1") {
          var token = response.data.Result.Token;
          dispatch(
            loginAction({
              token: token,
              userId: "1",
              userIsActive: "",
              userFname: userFname,
              userLname: userLname,
              userOtp: "43223423",
              defaultSpecialMoment: "",
              userProfileImage: "",
              isAutoLogin:
                response.data.Result.IsRegistered == "1" ? true : false,
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

    // Raj

    getProfile: async () => {
      let profileResponse, profileError;
      try {
        profileResponse = await API.GetProfile.get(sessions);
        if (profileResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        profileError = e;
      }
      return { profileResponse, profileError };
    },

    getUserProfile: async (UserID) => {
      let userProfileResponse, userProfileError;
      try {
        var data = new FormData();
        data.append("UserID", UserID);

        userProfileResponse = await API.GetProfile.get(sessions);
        if (userProfileResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        userProfileError = e;
      }
      return { userProfileResponse, userProfileError };
    },

    getUserFollowerList: async () => {
      let userFollowerListResponse, userFollowerListError;
      try {
        userFollowerListResponse = await API.getFollowerList.get(sessions);
        if (userFollowerListResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        userFollowerListError = e;
      }
      return { userFollowerListResponse, userFollowerListError };
    },

    getUserFollowingList: async () => {
      let UserFollowingListResponse, UserFollowingListError;
      try {
        UserFollowingListResponse = await API.getFollowingList.get(sessions);
        if (UserFollowingListResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        UserFollowingListError = e;
      }
      return { UserFollowingListResponse, UserFollowingListError };
    },

    getUnfollowFriendList: async (FriendUserID) => {
      debugger;
      let UnfollowFriendListResponse, UnfollowFriendListError;
      try {
        var data = new FormData();
        data.append("FriendUserID", FriendUserID);
        debugger;
        UnfollowFriendListResponse = await API.getunfollowFriend.get(
          sessions,
          data
        );
        if (UnfollowFriendListResponse.data.StatusCode == "1") {
          debugger;
        }
      } catch (e) {
        UnfollowFriendListError = e;
        debugger;
      }
      return { UnfollowFriendListResponse, UnfollowFriendListError };
    },

    RemoveFollowerFriend: async (FriendUserID) => {
      let RemoveFriendResponse, RemoveFriendError;
      try {
        var data = new FormData();
        data.append("FriendUserID", FriendUserID);
        debugger;
        RemoveFriendResponse = await API.RemoveFollowerFriend.get(
          sessions,
          data
        );
        debugger;
        if (RemoveFriendResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        RemoveFriendError = e;
      }
      return { RemoveFriendResponse, RemoveFriendError };
    },

    SearchUser: async (SearchName) => {
      let SearchUserResponse, SearchUserError;
      try {
        var data = new FormData();
        data.append("SearchKey", SearchName);
        debugger;
        SearchUserResponse = await API.SearchUser.get(sessions, data);
        debugger;
        if (SearchUserResponse.data.StatusCode == "1") {
        }
      } catch (e) {
        SearchUserError = e;
      }
      return { SearchUserResponse, SearchUserError };
    },

    //
  };
};
