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

const Signup = ({ navigation }) => {
  const { signUp, GetSpecialDay } = useActions();

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
    SignedIn();
  }, []);

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
      console.log("User Info --> ", userInfo);
      setUserInfo(userInfo);
      navigation.navigate("HomeScreen");
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

    //GetSpecialDay
    if (signUpresponse.data.StatusCode == "1") {
      var tokens = signUpresponse.data.Result.Token;
      const { response, error } = await GetSpecialDay({
        token: tokens,
      });
      if (signUpresponse.data.StatusCode == "1") {
        if (response.data.StatusCode == "1") {
          navigation.navigate("TutorialFirst", {
            listGetSpecialDay: response.data.Result,
            token: tokens,
          });
        }
      } else {
        setInvalidEmailPassword(true);
      }
    }

    setLoader(false);
  };

  return (
    <SafeAreaView style={[CommonStyle.MainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
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
              <TouchableOpacity onPress={() => {}} style={Styles.iconbg}>
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
