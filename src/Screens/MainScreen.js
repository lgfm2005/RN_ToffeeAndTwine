import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";

// Asset
import {
  imgToffeeTwineLogo,
  imgGift,
  imgGoogle,
  imgFacebook,
} from "../Assets/utils/Image";
import { AppString } from "../Assets/utils/AppString";
import { FilledButton, OutLinedButton } from "../Components/Button/Button";
import CommonStyle, { fontsize16 } from "../Assets/Style/CommonStyle";
import { FONT } from "../Assets/utils/FONT";
import { COLORS } from "../Assets/utils/COLORS";
import { OrLine } from "../Components/Line/OrLine";
import { MyWhiteStatusbar } from "../Components/MyStatusBar/MyWhiteStatusbar";
import KeyboardManager from "react-native-keyboard-manager";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";

import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk";

import Spinner from "react-native-loading-spinner-overlay";
import OneSignal from "react-native-onesignal";

import { useActions } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { OneSignalExternalUserEmail } from "../Assets/utils/OneSignalExternalUserEmail";

const MainScreen = ({ navigation }) => {
  if (Platform.OS === "ios") {
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  }
  const sessions = useSelector((state) => state.session);
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [getLoader, setLoader] = useState(false);

  const {
    CategoryList,
    getUserCategoryQuestion,
    socialAuth,
    GetSpecialMoment,
    updateNotification,
  } = useActions();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: AppString.webClientId,
    });
    // var token = sessions.isAutoLogin ? true : false;
    // if (token && sessions.userFname != null) {
    //   navigation.navigate("Navigation");
    // }
    // // SignedIn();
  }, []);

  const onOpened = async (openResult, accountDetails) => {
    var eventId = openResult.notification.additionalData.eventId;
  };

  const registerForPushNotifications = (permission) => {
    // console.log("registerForPushNotifications::", permission);
    // do something with permission value
  };

  const getToken = async () => {
    // const deviceState = await (await OneSignal.getDeviceState()).pushToken;
    const deviceState = await (await OneSignal.getDeviceState()).userId;
    return deviceState;
  };

  React.useEffect(() => {
    OneSignal.setAppId("1b61c026-91b6-40fe-ad5d-829673a4817c");

    // Calling registerForPushNotifications
    OneSignal.promptForPushNotificationsWithUserResponse(
      registerForPushNotifications
    );
    // if (session.environmentPrefix) {
    //   var prefix =
    //     "WU-" +
    //     String(session.environmentPrefix) +
    //     "-" +
    //     String(session.userId);
    //   OneSignal.setExternalUserId("raj12345");
    // }
    OneSignal.setNotificationOpenedHandler((handler) => onOpened(handler));
  }, []);

  // if (userValidate == "false") {
  //   connection.stop();
  //   OneSignal.removeExternalUserId();
  // }

  const SignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert("User is already signed in");
      // Set User Info if user is already signed in
      getCurrentUserInfo();
    } else {
      console.log("Please Login");
    }
    setGettingLoginStatus(false);
  };

  const socialAuthLogin = async (firstName, lastName, email, type) => {
    setLoader(true);
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
        ///Device Token:- 032e9f8679129d8c8571fffcc8213a673f1de60478f867a10c5bca161abf6764
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
                    if (
                      result.email == "" ||
                      result.email == null ||
                      result.email == undefined
                    ) {
                      navigation.navigate("Signup");
                    } else {
                      socialAuthLogin(
                        result.first_name,
                        result.last_name,
                        result.email,
                        "F"
                      );
                    }
                    console.log("result111:", result);
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

  const getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log("User Info --> ", info);
      setUserInfo(info);
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
      console.log("User Info Main --> ", userInfo.user);
      socialAuthLogin(
        userInfo.user.givenName,
        userInfo.user.familyName,
        userInfo.user.email,
        "G"
      );
      setUserInfo(userInfo.user);
      // navigation.navigate("Navigation");
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

  const Facebook = () => {};

  // const _signOut = async () => {
  //   setGettingLoginStatus(true);
  //   // Remove user session from the device.
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     // Removing user Info
  //     setUserInfo(null);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setGettingLoginStatus(false);
  // };

  return (
    <SafeAreaView
      //   style={CommonStyle.MainContainer}
      style={{
        height: "100%",
        backgroundColor: COLORS.white,
      }}
    >
      {/* <MyWhiteStatusbar /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          width: "100%",
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            height: "100%",
            // marginTop: 68,
            marginBottom: 68,
            //   backgroundColor: 'blue',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={[
              // CommonStyle.my32,
              // CommonStyle.Container,
              CommonStyle.Container,
              {
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Image source={imgToffeeTwineLogo} style={CommonStyle.logoImage} />
            <Text
              style={[
                CommonStyle.giftThoughtfully,
                { fontFamily: FONT.Gilroy },
              ]}
            >
              {AppString.GiftThoughtfully}
            </Text>
          </View>

          <Image
            source={imgGift}
            style={[
              CommonStyle.imgGiftTutorial,
              // CommonS tyle.my32,
              {
                width: "100%",
                height: 230,
                resizeMode: "cover",
                marginTop: 48,
                marginBottom: 48,
              },
            ]}
          />

          <View
            style={[
              CommonStyle.Container,
              // CommonStyle.my32,
              // {marginTop: 12, marginBottom: 12},
            ]}
          >
            <FilledButton
              buttonName={AppString.Signup}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            />

            <OutLinedButton
              buttonName={AppString.Signin}
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            />

            <View style={[CommonStyle.mb32, {}]}>
              <OrLine LineName={"OR"} />
            </View>

            <View style={[CommonStyle.googleFb]}>
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
          </View>
        </View>
      </ScrollView>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
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

export default MainScreen;
