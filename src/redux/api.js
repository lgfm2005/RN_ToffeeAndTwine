import axios from "axios";
import ApiConstants from "./apiConstants";

const baseAPIDev = axios.create({
  baseURL: ApiConstants.BASE_URL_DEV,
});


const createAuthorizationHeader = async (session) => {
  if (!session?.token && !session?.access_token) {
    return {};
  }
  return {Authorization: `Bearer ${session.token || session.access_token}`};
};

const createApikey = async () => {
  return {"api_key": `AIzMzWBGoZ8Pq4QRKLcwDCG3-jPY278wxT8nMz9`};
};

const api = async (
  session,
  endpoint,
  method = "get",
  body,
  contentType,
) => {
  const headers = {
    ...(await createAuthorizationHeader(session)),
    ...(await createApikey()),
    "content-type": contentType || "application/json",
  };

  if (method === "get" || method === "delete") {
    return await baseAPIDev[method](endpoint, {headers});
  }
  return await baseAPIDev[method](
    endpoint,
    body,
    {
      headers,
    },
  );
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

// export const ForgotPassword = {
//   password: async (isDevMode, email) =>
//     await api(
//       isDevMode,
//       null,
//       `/syncauto/authentication/forgot-password?email=${email}`,
//       "post",
//     ),
// };


