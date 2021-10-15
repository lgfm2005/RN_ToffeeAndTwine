import OneSignal from "react-native-onesignal";

export const OneSignalExternalUserEmail = (userEmail) => {
  console.log("OneSignalExternalUserEmail", userEmail);
  OneSignal.setExternalUserId(userEmail);
};
