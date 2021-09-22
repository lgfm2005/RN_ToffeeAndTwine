import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

// Lib
import RadioGroup from "react-native-custom-radio-group";
import Modal from "react-native-modal";
import DatePicker from "react-native-date-picker";
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import { AppString } from "../../../Assets/utils/AppString";
import {
  imgGiftTutorialfirst,
  imgBirthdayCake,
  imgArrowRight,
} from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import FontSize from "../../../Assets/utils/FontSize";
import TutorialStyle from "./TutorialStyle";
import { FullFormInput } from "../../../Components/FormInput";
import {
  POPLinkButton,
  POPOutLinkButton,
} from "../../../Components/Button/Button";
import RadioButtonContainer from "../../../Components/RadioButtonContainer";
import { COLORS } from "../../../Assets/utils/COLORS";
import { FONT } from "../../../Assets/utils/FONT";
import { useActions } from "../../../redux/actions";

const keyboardVerticalOffset = Platform.OS === "ios" ? 5 : 0;

// const data = [
//   {
//     text: AppString.Birthday,
//   },
//   {
//     text: AppString.Anniversary,
//   },
//   {
//     text: AppString.Graduation,
//   },
//   {
//     text: AppString.Christmas,
//   },
// ];

const TutorialFirst = ({ navigation, props, route }) => {
  const { listGetSpecialDay, token } = route.params;
  const { updateProfile, addCategoryspecialDay } = useActions();

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getRadioId, setRadioId] = useState("");
  const [getLoader, setLoader] = useState(false);

  const [getValidationCheck, setValidationCheck] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [getFinaldate, setFinalDate] = useState();
  const [date, setDate] = useState(new Date());

  const onRadioButtonPress = (idx, momentId) => {
    console.log("Clicked ==>", idx, momentId);
    setRadioId(momentId);
    setModalVisible(true);
  };

  const CloseDatePicker = () => {
    setModalVisible(false);
  };
  const SaveDatePicker = async () => {
    setModalVisible(false);
    setValidationCheck("GetAllData");
    console.log("getFirstName ===>>", getFirstName);
    console.log("getLastName ===>>", getLastName);
    console.log("getRadioId ===>>", getRadioId);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalDate(DateSubstring);
    console.log("getRadioName ===>>", DateSubstring);
  };

  const SubmitData = async () => {
    navigation.navigate("TutorialSecond");
    // setLoader(true);
    // const { error, response } = await updateProfile(
    //   getFirstName,
    //   getLastName,
    //   token
    // );
    // console.log("response ===> ", response);
    // console.log("error ===> ", error);
    // // const { addCategoryspecialDayerror, addCategoryspecialDayResponse } =
    // //   await addCategoryspecialDay(getRadioId, getFinaldate, "1");
    // setLoader(true);
    // if (response.data.StatusCode == "1") {
    //   setLoader(false);
    //   navigation.navigate("TutorialSecond");
    // }
  };

  return (
    <SafeAreaView style={CommonStyle.BgColorWhite}>
      <View style={[CommonStyle.authPage]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={"always"}
          bounces={false}
        >
          <KeyboardAvoidingView
            behavior="position"
            // keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={[CommonStyle.Base, { flex: 1 }]}>
              <Image
                source={imgGiftTutorialfirst}
                style={[CommonStyle.imgGiftTutorial, CommonStyle.my16]}
              />
              <View style={CommonStyle.Base}>
                <View style={[CommonStyle.Container, CommonStyle.mb32]}>
                  <Text
                    style={[CommonStyle.txtTitle, { fontFamily: FONT.Gilroy }]}
                  >
                    {AppString.WelcometoToffeeTwine}
                  </Text>

                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { fontFamily: FONT.Gilroy },
                    ]}
                  >
                    {AppString.gifthints}
                  </Text>

                  <View style={[CommonStyle.mb16, TutorialStyle.inputWrapper]}>
                    <View style={TutorialStyle.inputHalf}>
                      <Text
                        style={[
                          CommonStyle.formLabel,
                          { fontFamily: FONT.Gilroy },
                        ]}
                      >
                        {AppString.FirstName}
                      </Text>
                      <FullFormInput
                        buttonName={AppString.EnterFirstName}
                        textChange={(FirstName) => setFirstName(FirstName)}
                      />
                    </View>
                    <View style={TutorialStyle.inputHalf}>
                      <Text
                        style={[
                          CommonStyle.formLabel,
                          { fontFamily: FONT.Gilroy },
                        ]}
                      >
                        {AppString.LastName}
                      </Text>
                      <FullFormInput
                        buttonName={AppString.EnterLastName}
                        textChange={(LastName) => setLastName(LastName)}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={CommonStyle.formLabel}>
                      {AppString.Chooseonespecialday}
                    </Text>
                    <View>
                      <RadioButtonContainer
                        values={listGetSpecialDay}
                        onPress={onRadioButtonPress}
                      />
                    </View>
                  </View>

                  {isModalVisible == true ? (
                    <Modal
                      testID={"modal"}
                      isVisible={isModalVisible}
                      onBackdropPress={() => CloseDatePicker()}
                    >
                      <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                        <View style={TutorialStyle.popView}>
                          <Image
                            source={imgBirthdayCake}
                            style={TutorialStyle.popimg}
                          />
                        </View>

                        <View>
                          <Text
                            style={[
                              CommonStyle.txtContent,
                              { fontFamily: FONT.Gilroy },
                            ]}
                          >
                            {AppString.Pleasebirthdaycontinue}
                          </Text>
                        </View>

                        <DatePicker
                          mode={"date"}
                          date={date}
                          onDateChange={setDate}
                        />

                        <View style={[CommonStyle.centerRow, CommonStyle.mt16]}>
                          <POPOutLinkButton
                            buttonName={AppString.Cancel}
                            onPress={() => CloseDatePicker()}
                          />

                          <POPLinkButton
                            buttonName={AppString.Save}
                            onPress={() => SaveDatePicker()}
                          />
                        </View>
                      </View>
                    </Modal>
                  ) : null}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={[TutorialStyle.silderbg, CommonStyle.Container]}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.black },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => SubmitData()}
              disabled={getValidationCheck != "" ? false : true}
            >
              <View
                style={[
                  getValidationCheck != ""
                    ? TutorialStyle.SilderbgImg
                    : TutorialStyle.GraySilderbgImg,
                ]}
              >
                <Image
                  source={imgArrowRight}
                  style={TutorialStyle.silderIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};

export default TutorialFirst;
