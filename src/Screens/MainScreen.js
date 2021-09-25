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

import Spinner from "react-native-loading-spinner-overlay";
import OneSignal from "react-native-onesignal";

const MainScreen = ({ navigation }) => {
  if (Platform.OS === "ios") {
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
  }

  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [getLoader, setLoader] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: AppString.webClientId,
    });
    SignedIn();
  }, []);

  const onOpened = async (openResult, accountDetails) => {
    var eventId = openResult.notification.additionalData.eventId;
  };

  const registerForPushNotifications = (permission) => {
    // console.log("registerForPushNotifications::", permission);
    // do something with permission value
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
    OneSignal.setExternalUserId("raj12345");
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
      console.log("User Info --> ", userInfo);
      setUserInfo(userInfo);
      navigation.navigate("Navigation");
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
              <TouchableOpacity onPress={() => {}} style={Styles.iconbg}>
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
