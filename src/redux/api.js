import axios from "axios";
import ApiConstants from "./apiConstants";

const baseAPIDev = axios.create({
  baseURL: ApiConstants.BASE_URL_DEV,
});

const createAuthorizationHeader = async (session) => {
  if (!session?.token && !session?.access_token) {
    return {};
  }
  return { Authorization: `Bearer ${session.token || session.access_token}` };
};

const createApikey = async () => {
  return { api_key: `AIzMzWBGoZ8Pq4QRKLcwDCG3-jPY278wxT8nMz9` };
};

const api = async (session, endpoint, method = "get", body, contentType) => {
  const headers = {
    ...(await createAuthorizationHeader(session)),
    ...(await createApikey()),
    "content-type": contentType || "application/json",
  };

  if (method === "get" || method === "delete") {
    return await baseAPIDev[method](endpoint, { headers });
  }
  return await baseAPIDev[method](endpoint, body, {
    headers,
  });
};

// export const Auth = {
//   token: async (isDevMode, authCode) =>
//     await api(isDevMode, null, "/auth/token", "post", {
//       code: authCode,
//       redirect_uri: REACT_APP_REDIRECT_URL,
//     }),
//   refresh: async (isDevMode, session) =>
//     await api(
//       isDevMode,
//       session,
//       "/syncauto/authentication/refresh-token",
//       "post",
//     ),
// };


export const User = {
  login: async (data, session) =>
    await api(session, "/rest_api/controller_user/login", "post", data),
};

export const Signups = {
  signUp: async (data, session) =>
    await api(session, `/rest_api/controller_user/registration`, "post", data),
};

export const ForgotPassword = {
  password: async (data, session) =>
    await api(
      session,
      `/rest_api/controller_user/forgot_password`,
      "post",
      data
    ),
};

export const ForgotPasswordOTP = {
  OTP: async (data, session) =>
    await api(
      session,
      `/rest_api/controller_user/forgot_password_enter_otp`,
      "post",
      data
    ),
};

export const ChangeNewPassword = {
  password: async (data, session) =>
    await api(
      session,
      `/rest_api/controller_user/change_password_from_forgot_password`,
      "post",
      data
    ),
};

export const ResendOtp = {
  OTP: async (data, session) =>
    await api(session, `/rest_api/controller_user/resent_otp`, "post", data),
};

export const UpdateProfile = {
  UpdateProfile: async (data, session) =>
    await api(
      session,
      `/rest_api/controller_profile/update_profile`,
      "post",
      data
    ),
};

export const GetSpecialMoment = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_profile/get_special_moment`,
      "get"
    ),
};

export const GetCategories = {
  categories: async (data, session) =>
    await api(
      session,
      `/rest_api/controller_profile/get_categories`,
      "post",
      data
    ),
};

export const AdddCategorySpecialDays = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/add_category_special_moment`,
      "post",
      data
    ),
};

export const AddCategoryQuestion = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/add_category_question`,
      "post",
      data
    ),
};

export const DeleteUserCategorySpecialDay = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/delete_user_category_special_moment`,
      "post",
      data
    ),
};

export const DeleteUserCategoryQuestion = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/delete_user_category_question`,
      "post",
      data
    ),
};

export const GetUserCategorySpecialMoment = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_profile/get_user_category_special_moment`,
      "get"
    ),
};

export const GetUserCategoryQuestion = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_profile/get_user_category_question`,
      "get"
    ),
};

export const UpdateCategorySpecialMoment = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/update_category_special_moment`,
      "post",
      data
    ),
};

export const UpdateCategoryQuestion = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/update_category_question`,
      "post",
      data
    ),
};

export const UpdateSetting = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/update_settings`,
      "post",
      data
    ),
};

export const GetSetting = {
  get: async (session) =>
    await api(session, `/rest_api/controller_profile/get_settings`, "get"),
};

export const SocialAuth = {
  get: async (session, data) =>
    await api(session, `/rest_api/controller_user/social_auth`, "post", data),
};

export const AppleLogin = {
  get: async (session, data) =>
    await api(session, "/rest_api/controller_user/social_auth_apple", "post", data),
};

// Raj
export const GetProfile = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/get_profile`,
      "post",
      data
    ),
};
export const getFollowerList = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_friend/get_user_follower_list`,
      "get"
    ),
};
export const getFollowingList = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_friend/get_user_following_list`,
      "get"
    ),
};

export const GetUserFriendFollowingList = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_friend/get_friend_user_following_list`,
      "post",
      data
    ),
};

export const getUserFriendFollowerList = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_friend/get_friend_user_follower_list`,
      "post",
      data
    ),
};

export const getunfollowFriend = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_friend/unfollow_friend`,
      "post",
      data
    ),
};
export const getSearchUser = {
  get: async (session, data) =>
    await api(session, `/rest_api/controller_user/search_user`, "post", data),
};

export const RemoveFollowerFriend = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_friend/remove_follower_friend`,
      "post",
      data
    ),
};

export const SearchUser = {
  get: async (session, data) =>
    await api(session, `/rest_api/controller_user/search_user`, "post", data),
};

export const GetFriendCategorySpecialMoment = {
  get: async (session, data) =>
    await api(
      session,
      `/rest_api/controller_profile/get_friend_category_special_moment`,
      "post",
      data
    ),
};

export const UserSubscription = {
  get: async (session, data) =>
    await api(
      session,
      `rest_api/controller_user/user_subscription`,
      "post",
      data
    ),
};

export const UpdateNotification = {
  get: async (session, data) =>
    await api(
      session,
      `rest_api/controller_user/update_notification_id`,
      "post",
      data
    ),
};

export const FollowUser = {
  get: async (session, data) =>
    await api(session, `rest_api/controller_friend/follow_user`, "post", data),
};

export const BlockFriend = {
  get: async (session, data) =>
    await api(session, `rest_api/controller_friend/block_friend`, "post", data),
};

export const AddGiftNotication = {
  get: async (session, data) =>
    await api(session, `rest_api/controller_gift/add_gift`, "post", data),
};

export const DelectAccount = {
  get: async (session, data) =>
    await api(session, `rest_api/controller_user/delete_account`, "get", data),
};

export const GetNotifyList = {
  get: async (session) =>
    await api(session, `/rest_api/controller_gift/get_notify_list`, "get"),
};

export const GetUpcomingMoments = {
  get: async (session) =>
    await api(
      session,
      `/rest_api/controller_moment/get_upcoming_moments`,
      "get"
    ),
};

export const notifyFriend = {
  get: async (session, data) =>
    await api(session, `/rest_api/controller_gift/notify_friend`, "post", data),
};

export const logout = {
  get: async (session, data) =>
    await api(session, `/rest_api/controller_user/logout`, "get"),
};
