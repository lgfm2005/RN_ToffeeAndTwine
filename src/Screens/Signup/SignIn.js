import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

// Lib
import { showMessage } from "react-native-flash-message";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";

// Asset
import {
  imgToffeeTwineLogo,
  imgGift,
  imgGoogle,
  imgFacebook,
} from "../../Assets/utils/Image";
import { AppString } from "../../Assets/utils/AppString";
import { FilledButton } from "../../Components/Button/Button";
import CommonStyle, { fontsize16 } from "../../Assets/Style/CommonStyle";
import { FONT } from "../../Assets/utils/FONT";
import { COLORS } from "../../Assets/utils/COLORS";
import { OrLine } from "../../Components/Line/OrLine";
import { FormInput, ShowFormInput } from "../../Components/FormInput";

import { useActions } from "../../redux/actions";
import Spinner from "react-native-loading-spinner-overlay";
import { ButtonStyle } from "../../Components/Button/ButtonStyle";
import { isEmailValid } from "../../utils";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import OneSignal from "react-native-onesignal";
import { OneSignalExternalUserEmail } from "../../Assets/utils/OneSignalExternalUserEmail";

const SignIn = ({ navigation }) => {
  const {
    Login,
    CategoryList,
    getUserCategoryQuestion,
    socialAuth,
    GetSpecialMoment,
    updateNotification,
  } = useActions();
  const keyboardVerticalOffset = Platform.OS === "ios" ? 5 : 0;

  // Facebook And Google
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  const [getEmail, setEmail] = useState("");
  const [getCreatePassword, setCreatePassword] = useState("");
  const [getInvalidEmailPassword, setInvalidEmailPassword] = useState(false);

  const [getLoader, setLoader] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: AppString.webClientId,
    });
    // SignedIn();
  }, []);

  const getToken = async () => {
    const deviceState = await (await OneSignal.getDeviceState()).userId;
    return deviceState;
  };

  const SignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
    setGettingLoginStatus(false);
  };

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log("User Info --> ", info);
      setUserInfo(info);
      // navigation.navigate("Navigation");
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
        console.log("User has not signed in yet");
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const socialAuthLogin = async (firstName, lastName, email, type) => {
    const { error, response } = await socialAuth(
      firstName,
      lastName,
      email,
      type
    );
    if (response.data.StatusCode == "1") {
      const tokens = response.data.Result.Token;
      const isRegistered = response.data.Result.IsRegistered;
      if (isRegistered == "1") {
        const token = { token: tokens };
        OneSignalExternalUserEmail(email);
        var deviceToken = await getToken();
        await updateNotification(token, deviceToken);
        const { GetCategoryListerror, GetCategoryListresponse } =
          await CategoryList(30, token);
        if (GetCategoryListresponse.data.StatusCode == "1") {
          console.log("Category Question Response Done");
        } else {
          console.log(
            "User Category Question Response Error  ===>>>",
            GetCategoryListerror
          );
        }

        const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
          await getUserCategoryQuestion(token);
        if (UserCategoryQuestionResponse.data.StatusCode == "1") {
          console.log("User Category Question Response Done");
        } else {
          console.log(
            "User Category Question Response Error  ===>>>",
            GetCategoryListerror
          );
        }
        setLoader(false);
        if (response.data.StatusCode == "1") {
          navigation.navigate("Navigation");
        }
      } else if (isRegistered == "0") {
        const token = { token: tokens };

        const { specialMomentResponse, specialMomentError } =
          await GetSpecialMoment(token);
        if (response.data.StatusCode == "1") {
          if (specialMomentResponse.data.StatusCode == "1") {
            navigation.navigate("TutorialFirst", {
              listGetSpecialDay: specialMomentResponse.data.Result,
              token: tokens,
              FirstName: firstName,
              LastName: lastName,
            });
          }
        }
      }
    }
  };

  const GoogleLogin = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      socialAuthLogin(
        userInfo.user.name,
        userInfo.user.familyName,
        userInfo.user.email,
        "G"
      );

      console.log("User Info signIn--> ", userInfo.user);
      setUserInfo(userInfo);
    } catch (error) {
      console.log("Message", JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert("Play Services Not Available or Outdated");
      } else {
        alert(error.message);
      }
    }
  };

  const isvalidForm = () => {
    if (isEmailValid(getEmail) && getCreatePassword != "") {
      return true;
    }
    return false;
  };

  React.useEffect(() => {
    OneSignal.setAppId("1b61c026-91b6-40fe-ad5d-829673a4817c");
  }, []);

  const handleSignIn = async (getEmail, getCreatePassword) => {
    setLoader(true);
    const { error, response } = await Login(getEmail, getCreatePassword, "");
    if (response.data.StatusCode == "1") {
      const tokens = response.data.Result[0].Token;
      const token = { token: tokens };
      OneSignalExternalUserEmail(getEmail);
      var deviceToken = await getToken();
      debugger;
      await updateNotification(token, deviceToken);
      const { GetCategoryListerror, GetCategoryListresponse } =
        await CategoryList(30, token);
      if (GetCategoryListresponse.data.StatusCode == "1") {
        console.log("Category Question Response Done");
      } else {
        console.log(
          "User Category Question Response Error  ===>>>",
          GetCategoryListerror
        );
      }

      const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
        await getUserCategoryQuestion(token);
      if (UserCategoryQuestionResponse.data.StatusCode == "1") {
        console.log("User Category Question Response Done");
      } else {
        console.log(
          "User Category Question Response Error  ===>>>",
          GetCategoryListerror
        );
      }
    } else {
    }

    setLoader(false);
    if (response.data.StatusCode == "1") {
      if (
        !response.data.Result[0].user_fname &&
        !response.data.Result[0].user_lname
      ) {
        var tokens = response.data.Result[0].Token;

        const { specialMomentResponse, specialMomentError } =
          await GetSpecialMoment({
            token: tokens,
          });

        if (specialMomentResponse.data.StatusCode == "1") {
          navigation.navigate("TutorialFirst", {
            listGetSpecialDay: specialMomentResponse.data.Result,
            token: tokens,
          });
        }
      } else {
        navigation.navigate("Navigation");
      }
    } else {
      setInvalidEmailPassword(true);
      console.log("Error", error);
    }
  };

  const fbSignIn = async () => {
    LoginManager.logInWithPermissions(["email", "public_profile"]).then(
      function (result) {
        console.log("result", result);
        if (result.isCancelled) {
          // Toast.show("Login cancelled")
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {
              console.log(data);
              // Create a graph request asking for user information with a callback to handle the response.
              const infoRequest = new GraphRequest(
                "/me",
                {
                  httpMethod: "GET",
                  version: "v10.0",
                  parameters: {
                    fields: {
                      string:
                        "id,name,first_name,last_name,email,picture.type(large)",
                    },
                  },
                },
                (error, result) => {
                  if (error) {
                    console.log("error:", error);
                    Toast.show("Something went wrong!");
                  } else {
                    socialAuthLogin(
                      result.first_name,
                      result.last_name,
                      result.email,
                      "F"
                    );
                    console.log("result:", result);
                  }
                }
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            })
            .catch((error) => {
              console.log("error: ", error);
              Toast.show("Something went wrong!");
            });
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
        Toast.show("Something went wrong!");
      }
    );
  };

  return (
    <SafeAreaView style={[CommonStyle.MainContainer]}>
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        // contentContainerStyle={CommonStyle.height}
      >
        <View style={[CommonStyle.Container, CommonStyle.authPage]}>
          <View style={CommonStyle.my32}>
            <Image source={imgToffeeTwineLogo} style={CommonStyle.logoImage} />
            <Text style={CommonStyle.giftThoughtfully}>
              {AppString.GiftThoughtfully}
            </Text>
          </View>
          <KeyboardAvoidingView
            behavior="height"
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={CommonStyle.formGroup}>
              <Text style={CommonStyle.formLabel}>
                {AppString.EmailAddress}
              </Text>
              <FormInput
                buttonName={AppString.Enteremailaddress}
                textChange={(Email) => setEmail(Email)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={CommonStyle.formGroup}>
              <Text style={CommonStyle.formLabel}>{AppString.Password}</Text>
              <ShowFormInput
                buttonName={AppString.EnterPassword}
                textChange={(CreatePassword) =>
                  setCreatePassword(CreatePassword)
                }
              />
              {getInvalidEmailPassword == true ? (
                <Text style={CommonStyle.txtErrorMessage}>
                  {AppString.InvaildEmailPassword}
                </Text>
              ) : null}
            </View>

            <View style={CommonStyle.Right}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={CommonStyle.txtContent}>
                  {AppString.ForgotPassword}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <FilledButton
                buttonName={AppString.Signin}
                // onPress={() => handleSignIn(getEmail, getCreatePassword)}
                // btncheck={isvalidForm()}
                // btnabled={isvalidForm()}
                // onPress={() =>
                //   handleSignIn("kachhadiya101@gmail.com", "123456")
                // }
                onPress={() => handleSignIn("uss.hitesh@gmail.com", "123456")}
                // onPress={() => handleSignIn("bhavesh@gmail.com", "123456")}
                // onPress={() =>
                //   handleSignIn("rshah@universalstreamsolution.com", "123456")
                // }
                // onPress={() => handleSignIn("uss.jignesh@gmail.com", "123456")}
                // onPress={() => handleSignIn("1uss.jignesh@gmail.com", "123456")}
                // onPress={() => handleSignIn("jignesh@noemail.com", "123456")}
                // onPress={() =>
                //   handleSignIn("amansuri@universalstreamsolution.com", "123456")
                // }
              />
            </View>
          </KeyboardAvoidingView>
          <View style={CommonStyle.mb32}>
            <OrLine LineName={"OR"} />
          </View>

          <View style={[CommonStyle.mb32, CommonStyle.googleFb]}>
            <TouchableOpacity
              onPress={() => GoogleLogin()}
              style={Styles.iconbg}
            >
              <Image source={imgGoogle} style={Styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => fbSignIn()} style={Styles.iconbg}>
              <Image source={imgFacebook} style={Styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={[Styles.bgbottomicon]}>
            <Text style={{ color: COLORS.gray }}>
              {AppString.Alreadyhaveanaccount}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: COLORS.black }}>{AppString.Signup}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  bgbottomicon: {
    width: "100%",
    height: 64,
    flexDirection: "row",
    justifyContent: "center",
    ...fontsize16,
    color: COLORS.gray,
    position: "absolute",
    bottom: 0,
    right: 32,
    left: 32,
    alignItems: "center",
    textAlign: "center",
  },
  iconbg: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
export default SignIn;
