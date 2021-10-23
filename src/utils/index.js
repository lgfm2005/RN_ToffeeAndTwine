import { Alert, Platform, Dimensions } from "react-native";
import { hideMessage, showMessage } from "react-native-flash-message";
const { width } = Dimensions.get("window");
import { trim } from "lodash";

export const isEmailValid = (email) => {
  let pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(trim(email)).toLowerCase());
};

export const isAndroid = () => Platform.OS === "android";
export const isIOS = () => Platform.OS === "ios";

export const keyboardAvoidingViewBehavior = isIOS() ? "padding" : 30;

export const validatePassword = (pass) => {
  if (pass.length < 8) {
    return "Your password must be at least 8 characters.";
  } else if (pass.search(/[a-z]/i) < 0) {
    return "Your password must contain at least one letter.";
  } else if (pass.search(/[0-9]/) < 0) {
    return "Your password must contain at least one digit.";
  } else {
    return "success";
  }
};

export const allLetter = (inputtxt) => {
  var letters = /^[A-Za-z]+$/;
  if (inputtxt.match(letters)) {
    console.log("true");
    return true;
  } else {
    console.log("False");
    return false;
  }
};

export function showErrorMessageWithHideTime(message = "", closeMillis = 2000) {
  showMessage({
    message: "Error",
    description: message,
    type: "danger",
    // backgroundColor: AppStyles.color.COLOR_RED,
  });
  setTimeout(() => {
    hideMessage();
  }, closeMillis);
}

export function filterStringByNumber(text) {
  return text.replace(/\D/g, "");
}
