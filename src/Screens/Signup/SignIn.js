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

const SignIn = ({ navigation }) => {
  const { Login, CategoryList, getUserCategoryQuestion } = useActions();
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
      navigation.navigate("Navigation");
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

  const handleSignIn = async (getEmail, getCreatePassword) => {
    setLoader(true);
    const { error, response } = await Login(getEmail, getCreatePassword, "");
    debugger;
    if (response.data.StatusCode == "1") {
      const tokens = response.data.Result[0].Token;
      const token = { token: tokens };
      debugger;
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
      navigation.navigate("Navigation");
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
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        // contentContainerStyle={CommonStyle.height}
      >
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View style={[CommonStyle.Container, CommonStyle.authPage]}>
            <View style={CommonStyle.my32}>
              <Image
                source={imgToffeeTwineLogo}
                style={CommonStyle.logoImage}
              />
              <Text style={CommonStyle.giftThoughtfully}>
                {AppString.GiftThoughtfully}
              </Text>
            </View>

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
                // onPress={() => handleLogin(getEmail, getCreatePassword)}
                onPress={() => handleSignIn("uss.hitesh@gmail.com", "123456")}
                // btncheck={isvalidForm()}
                // btnabled={isvalidForm()}
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

            <View style={[Styles.bgbottomicon]}>
              <Text style={{ color: COLORS.gray }}>
                {AppString.Alreadyhaveanaccount}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ color: COLORS.black }}>{AppString.Signup}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
