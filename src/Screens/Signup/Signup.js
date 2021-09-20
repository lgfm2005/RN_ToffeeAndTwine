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

const Signup = ({ navigation }) => {
  const { signUp, GetSpecialDay } = useActions();

  const keyboardVerticalOffset = Platform.OS === "ios" ? 1 : 0;
  const [getEmail, setEmail] = useState("");
  const [getCreatePassword, setCreatePassword] = useState("");
  const [getConfirmPassword, setConfirmPassword] = useState("");
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [getLoader, setLoader] = useState(false);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
    console.log("Keyboard Shown");
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
    console.log("Keyboard Hidden");
  };

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  }, []);

  const handleSignUp = async () => {
    if (Validation.removeBadSpaces(getEmail) === "") {
      showMessage({
        message: "Please enter a email",
        type: "danger",
      });
      return;
    } else if (!isEmailValid(getEmail)) {
      showMessage({
        message: "Enter a valid email",
        type: "danger",
      });
      return;
    } else if (Validation.removeBadSpaces(getCreatePassword) === "") {
      showMessage({
        message: "Please enter Password",
        type: "danger",
      });
      return;
    } else if (Validation.removeBadSpaces(getConfirmPassword) === "") {
      showMessage({
        message: "Please enter confirm password",
        type: "danger",
      });
      return;
    } else if (getConfirmPassword != getCreatePassword) {
      showMessage({
        message: "confirm password does not match",
        type: "danger",
      });
      return;
    }
    setLoader(true);
    //GetSpecialDay
    const { GetSpecialDayerror, GetSpecialDayresponse } = await GetSpecialDay();
    console.log("GetSpecialDayresponse==>", GetSpecialDayresponse);
    //signUp
    const { signUperror, signUpresponse } = await signUp(
      getEmail,
      getCreatePassword,
      getConfirmPassword
    );
    setLoader(false);
    if (signUpresponse.data.StatusCode == "1") {
      showMessage({
        message: "Alert",
        description: signUpresponse.data.Message,
        type: "success",
      });
      navigation.navigate("TutorialFirst");
    } else {
      showMessage({
        message: "Alert",
        description: signUpresponse.data.Message,
        type: "danger",
      });
    }
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
            </View>
            <View>
              <FilledButton
                buttonName={AppString.Signup}
                onPress={() => handleSignUp()}
              />
            </View>

            <View style={CommonStyle.mb32}>
              <OrLine LineName={"OR"} />
            </View>

            <View style={[CommonStyle.mb32, CommonStyle.googleFb]}>
              <TouchableOpacity onPress={() => {}} style={Styles.iconbg}>
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
