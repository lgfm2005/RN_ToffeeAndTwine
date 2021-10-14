import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from "react-native";

// Lib
import OTPTextView from "react-native-otp-textinput";

// Asset
import {
  imgToffeeTwineLogo,
  imgLeftBack,
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
import BackToolBar from "../../Components/BackToolBar";
import { useActions } from "../../redux/actions";
import { isEmailValid } from "../../utils";
import Validation from "../../utils/validation";
import { showMessage } from "react-native-flash-message";
import Spinner from "react-native-loading-spinner-overlay";
import { ChangeNewPassword, ResendOtp } from "../../redux/api";

const SetPassword = ({ navigation, route }) => {
  const { ForgotPasswordOTPS, ResendOTPs, ChangePassword } = useActions();

  const { VerificationCode, getEmail } = route.params;
  const [getOtp, setOtp] = useState("");
  const [getTimer, setTimer] = useState(60);
  const [getText, setText] = useState("");
  const [getResend, setResend] = useState(false);
  const [getOtpCheck, setOtpCheck] = useState("");
  const [verificationCode, setVerificationCode] = useState(VerificationCode);
  const [isVerification, setIsVerification] = useState(false);
  const [getUserId, setUserId] = useState("");

  const [getLoader, setLoader] = useState(false);

  const [getCreatePassword, setCreatePassword] = useState("");
  const [getConfirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount == 1) {
          setText("Resend");
        }
        lastTimerCount <= 1 && clearInterval(interval);
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [getResend]);

  const Resend = async () => {
    setLoader(true);
    const { error, response } = await ResendOTPs(getEmail);
    setLoader(false);

    if (response.data.StatusCode == "1") {
      let tempResendValue = !getResend;
      setResend(tempResendValue);
      setTimer(60);
      setText("");
    } else {
      Alert.alert(AppString.AppName, response.data.Message);
    }
  };

  const Submit = async () => {
    if (isVerification) {
      if (Validation.removeBadSpaces(getCreatePassword) === "") {
        return;
      } else if (Validation.removeBadSpaces(getConfirmPassword) === "") {
        return;
      } else if (getConfirmPassword != getCreatePassword) {
        return;
      }

      setLoader(true);
      const { error, response } = await ChangePassword(
        getUserId,
        getCreatePassword,
        getConfirmPassword
      );

      setLoader(false);

      if (response.data.StatusCode == "1") {
        navigation.navigate("SignIn");
      } else {
        Alert.alert(AppString.AppName, response.data.Message);
      }
    } else {
      if (getOtp.length == 6) {
        setLoader(true);
        const { error, response } = await ForgotPasswordOTPS(getEmail, getOtp);
        setLoader(false);

        if (response.data.StatusCode == "1") {
          setUserId(response.data.Result[0].user_id);
          setIsVerification(true);
        } else {
          Alert.alert(AppString.AppName, response.data.Message);
        }
      }
    }
  };

  return (
    <SafeAreaView style={CommonStyle.MainContainer}>
      <View style={[CommonStyle.Container]}>
        <BackToolBar
          ImageLink={imgLeftBack}
          onPressImage={() => navigation.navigate("ForgotPassword")}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"always"}
        bounces={false}
      >
        <KeyboardAvoidingView behavior="position">
          <View style={[CommonStyle.Container, CommonStyle.authPage]}>
            <View style={CommonStyle.my16}>
              <Image
                source={imgToffeeTwineLogo}
                style={CommonStyle.logoImage}
              />
              <Text style={CommonStyle.giftThoughtfully}>
                {AppString.GiftThoughtfully}
              </Text>
            </View>

            <View style={CommonStyle.mb32}>
              <Text style={CommonStyle.txtContent}>
                {/* {AppString.OTPasswordemailaddress} */}
                We sent you an One Time Password (OTP) in your email address{" "}
                {getEmail}. Please enter verifciation code to continue.
              </Text>
            </View>

            <View style={CommonStyle.formGroup}>
              <View style={CommonStyle.Row}>
                <OTPTextView
                  handleTextChange={(otp) => setOtp(otp)}
                  containerStyle={Styles.textInputContainer}
                  textInputStyle={Styles.roundedTextInput}
                  inputCount={6}
                  inputCellLength={1}
                  offTintColor={COLORS.Primary}
                  tintColor={COLORS.Primary}
                  placeholderTextColor={COLORS.Primary}
                  returnKeyLabel="Done"
                />
              </View>

              <View style={CommonStyle.rowEnd}>
                {getText == "Resend" ? (
                  <TouchableOpacity onPress={() => Resend()}>
                    <Text style={CommonStyle.txtContent}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={[CommonStyle.txtContent, { width: 155 }]}>
                    Resend OTP in 00:{getTimer}
                  </Text>
                )}
              </View>
            </View>

            {isVerification ? (
              <View>
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
              </View>
            ) : null}

            <View>
              <FilledButton
                buttonName={
                  isVerification ? AppString.ResetPassword : AppString.verifyotp
                }
                onPress={() => Submit()}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 20,
    fontFamily: FONT.Gilroy,
  },
  roundedTextInput: {
    borderRadius: 8,
    borderWidth: 1,
    fontFamily: FONT.Gilroy,
    borderBottomWidth: 1,
    width: 48,
    ...fontsize16,
  },
});

export default SetPassword;
