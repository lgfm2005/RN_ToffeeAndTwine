import OneSignal from "react-native-onesignal";

export const OneSignalExternalUserEmail = (userEmail) => {
  OneSignal.setExternalUserId(userEmail);
};
