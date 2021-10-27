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

import { appleAuth } from "@invertase/react-native-apple-authentication";
// Asset
import {
  imgToffeeTwineLogo,
  imgGift,
  imgApple,
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
import { OneSignalExternalUserEmail } from "../../Assets/utils/OneSignalExternalUserEmail";

const Signup = ({ navigation }) => {
  const {
    signUp,
    CategoryList,
    getUserCategoryQuestion,
    socialAuth,
    socialAppleAuth,
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
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
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
        OneSignalExternalUserEmail(email);
        await updateNotification(token, deviceToken);
        const { GetCategoryListerror, GetCategoryListresponse } =
          await CategoryList(30, token);
        if (GetCategoryListresponse.data.StatusCode == "1") {
        } else {
        }

        const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
          await getUserCategoryQuestion(token);
        if (UserCategoryQuestionResponse.data.StatusCode == "1") {
        } else {
        }
        setLoader(false);
        if (response.data.StatusCode == "1") {
          navigation.navigate("Navigation");
        }
      } else if (isRegistered == "0") {
        const token = { token: tokens };
        OneSignalExternalUserEmail(email);
        var deviceToken = await getToken();
        await updateNotification(token, deviceToken);
        const { specialMomentResponse, specialMomentError } =
          await GetSpecialMoment(token);
        if (response.data.StatusCode == "1") {
          setLoader(false);
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

  const SignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      getCurrentUserInfo();
    } else {
    }
    setGettingLoginStatus(false);
  };

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      setUserInfo(info);
      navigation.navigate("TutorialFirst", {
        listGetSpecialDay: response.data.Result,
        token: tokens,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert("User has not signed in yet");
      } else {
        alert("Unable to get user's info");
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

      setUserInfo(userInfo);
      // navigation.navigate("HomeScreen");
    } catch (error) {
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
        if (result.isCancelled) {
          // Toast.show("Login cancelled")
        } else {
          AccessToken.getCurrentAccessToken()
            .then((data) => {
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
                    Toast.show("Something went wrong!");
                  } else {
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
              Toast.show("Something went wrong!");
            });
        }
      },
      function (error) {
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
      OneSignalExternalUserEmail(getEmail);
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

  const ApplesocialLogin = async (Email, UserAppleId, Fname, Lname, Type) => {
    setLoader(true);
    const { error, response } = await socialAppleAuth(
      Email,
      UserAppleId,
      Fname,
      Lname,
      Type
    );

    if (response.data.StatusCode == "1") {

      const tokens = response.data.Result.Token;

      const isRegistered = response.data.Result.IsRegistered;

      if (isRegistered == "1") {

        const token = { token: tokens };
        OneSignalExternalUserEmail(Email);
        var deviceToken = await getToken();
        await updateNotification(token, deviceToken);
        const { GetCategoryListerror, GetCategoryListresponse } =
          await CategoryList(30, token);

        if (GetCategoryListresponse.data.StatusCode == "1") {

          console.log("Category Question Response Done");
        } else {
        }

        const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
          await getUserCategoryQuestion(token);

        if (UserCategoryQuestionResponse.data.StatusCode == "1") {

          console.log("User Category Question Response Done");
        } else {
        }
        if (response.data.StatusCode == "1") {

          setLoader(false);
          setTimeout(() => {
            setLoader(false);
            navigation.navigate("Navigation");
          }, 1000);
        } else {
          setLoader(false);
        }
      } else if (isRegistered == "0") {

        const token = { token: tokens };
        OneSignalExternalUserEmail(Email);
        var deviceToken = await getToken();
        await updateNotification(token, deviceToken);
        const { specialMomentResponse, specialMomentError } =
          await GetSpecialMoment(token);

        if (response.data.StatusCode == "1") {

          setLoader(false);
          if (specialMomentResponse.data.StatusCode == "1") {

            navigation.navigate("TutorialFirst", {
              listGetSpecialDay: specialMomentResponse.data.Result,
              token: tokens,
              FirstName: Fname,
              LastName: Lname,
            });
          }
        }
      }
    }
  };


  const onAppleButtonPress = async () => {

    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });


    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated

      console.log(appleAuthRequestResponse);

      console.log(appleAuthRequestResponse.email);

      console.log(appleAuthRequestResponse.user);

      console.log(appleAuthRequestResponse.fullName.givenName);

      console.log(appleAuthRequestResponse.fullName.familyName);

      ApplesocialLogin(
        appleAuthRequestResponse.email,
        appleAuthRequestResponse.user,
        appleAuthRequestResponse.fullName.givenName,
        appleAuthRequestResponse.fullName.familyName,
        "A"
      )
    }
  };

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
              {
                Platform.OS == 'ios' ? (
                  <TouchableOpacity
                    onPress={() => onAppleButtonPress()}
                    style={Styles.iconbg}
                  >
                    <Image source={imgApple} style={Styles.icon} />
                  </TouchableOpacity>
                ) : null}
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
