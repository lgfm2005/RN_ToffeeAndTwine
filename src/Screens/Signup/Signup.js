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
  Keyboard,
  Alert,
} from "react-native";
// Lib
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
// import CommonStyle from '../../Assets/utils/CommonStyle';
import { FONT } from "../../Assets/utils/FONT";
import { COLORS } from "../../Assets/utils/COLORS";
import { OrLine } from "../../Components/Line/OrLine";
import { FormInput, ShowFormInput } from "../../Components/FormInput";

import Spinner from "react-native-loading-spinner-overlay";
import { useActions } from "../../redux/actions";
import { isEmailValid } from "../../utils";
import Validation from "../../utils/validation";
import { showMessage } from "react-native-flash-message";
import { isEmail } from "../../Components/EmailCheck";
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";
import OneSignal from "react-native-onesignal";

const Signup = ({ navigation }) => {
  const {
    signUp,
    CategoryList,
    getUserCategoryQuestion,
    socialAuth,
    GetSpecialMoment,
    updateNotification,
  } = useActions();

  const keyboardVerticalOffset = Platform.OS === "ios" ? 1 : 0;

  // Facebook And Google
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  const [getEmail, setEmail] = useState("");
  const [getCreatePassword, setCreatePassword] = useState("");
  const [getConfirmPassword, setConfirmPassword] = useState("");

  const [getInvalidEmailPassword, setInvalidEmailPassword] = useState(false);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [getLoader, setLoader] = useState(false);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
    // console.log("Keyboard Shown");
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
    // console.log("Keyboard Hidden");
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    GoogleSignin.configure({
      webClientId: AppString.webClientId,
    });
    // SignedIn();
  }, []);

  const getToken = async () => {
    // const deviceState = await (await OneSignal.getDeviceState()).pushToken;
    const deviceState = await (await OneSignal.getDeviceState()).userId;
    return deviceState;
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
            });
          }
        }
      }
    }
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
      navigation.navigate("TutorialFirst", {
        listGetSpecialDay: response.data.Result,
        token: tokens,
      });
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

  const GoogleLogin = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info Signup--> ", userInfo.user);
      socialAuthLogin(
        userInfo.user.name,
        userInfo.user.familyName,
        userInfo.user.email,
        "G"
      );

      setUserInfo(userInfo);
      // navigation.navigate("HomeScreen");
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
                    console.log("result:", result);
                    socialAuthLogin(
                      result.first_name,
                      result.last_name,
                      result.email,
                      "F"
                    );
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

  const isvalidForm = () => {
    if (
      isEmailValid(getEmail) &&
      getCreatePassword != "" &&
      getConfirmPassword != ""
    ) {
      return true;
    }
    return false;
  };

  const handleSignUp = async () => {
    if (Validation.removeBadSpaces(getEmail) === "") {
      setInvalidEmailPassword(true);
      return;
    } else if (!isEmailValid(getEmail)) {
      setInvalidEmailPassword(true);
      return;
    } else if (Validation.removeBadSpaces(getCreatePassword) === "") {
      setInvalidEmailPassword(true);
      return;
    } else if (Validation.removeBadSpaces(getConfirmPassword) === "") {
      setInvalidEmailPassword(true);
      return;
    } else if (getConfirmPassword != getCreatePassword) {
      setInvalidEmailPassword(true);
      return;
    }
    setLoader(true);

    //signUp
    const { signUperror, signUpresponse } = await signUp(
      getEmail,
      getCreatePassword,
      getConfirmPassword
    );

    //GetSpecialMoment
    if (signUpresponse.data.StatusCode == "1") {
      var tokens = signUpresponse.data.Result.Token;
      const { specialMomentResponse, specialMomentError } =
        await GetSpecialMoment({
          token: tokens,
        });
      var tokenInfo = { token: tokens };
      var deviceToken = await getToken();
      await updateNotification(tokenInfo, deviceToken);
      if (signUpresponse.data.StatusCode == "1") {
        if (specialMomentResponse.data.StatusCode == "1") {
          navigation.navigate("TutorialFirst", {
            listGetSpecialDay: specialMomentResponse.data.Result,
            token: tokens,
          });
        }
      } else {
        setInvalidEmailPassword(true);
      }
    } else {
      Alert.alert(signUpresponse.data.Message);
    }
    setLoader(false);
  };

  React.useEffect(() => {
    OneSignal.setAppId("1b61c026-91b6-40fe-ad5d-829673a4817c");
  }, []);

  return (
    <SafeAreaView style={[CommonStyle.MainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps={"always"}
        // contentContainerStyle={CommonStyle.height}
      >
        <View
          style={[
            CommonStyle.Container,
            CommonStyle.authPage,
            { marginTop: keyboardShow ? -100 : 0 },
          ]}
        >
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
              <Text style={CommonStyle.formLabel}>
                {AppString.CreatePassword}
              </Text>
              <ShowFormInput
                buttonName={AppString.CreatePassword}
                textChange={(CreatePassword) =>
                  setCreatePassword(CreatePassword)
                }
              />
            </View>

            <View style={CommonStyle.formGroup}>
              <Text style={CommonStyle.formLabel}>
                {AppString.ConfirmPassword}
              </Text>
              <ShowFormInput
                buttonName={AppString.ConfirmPassword}
                textChange={(ConfirmPassword) =>
                  setConfirmPassword(ConfirmPassword)
                }
              />

              {getInvalidEmailPassword == true ? (
                <Text style={CommonStyle.txtErrorMessage}>
                  {AppString.InvaildEmailPassword}
                </Text>
              ) : null}
            </View>
            <View>
              <FilledButton
                buttonName={AppString.Signup}
                onPress={() => handleSignUp()}
                btncheck={isvalidForm()}
                btnabled={isvalidForm()}
              />
            </View>

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
              <TouchableOpacity
                onPress={() => fbSignIn()}
                style={Styles.iconbg}
              >
                <Image source={imgFacebook} style={Styles.icon} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

          {keyboardShow == false && (
            <View style={[Styles.bgbottomicon]}>
              <Text style={{ color: COLORS.gray }}>
                {AppString.Alreadyhaveanaccount}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={{ color: COLORS.black }}> {AppString.Signin}</Text>
              </TouchableOpacity>
            </View>
          )}
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

export default Signup;
