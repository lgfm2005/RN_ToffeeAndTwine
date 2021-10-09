import React, { useEffect, useState } from "react";
import { Platform, Image, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonStyle from "../../Assets/Style/CommonStyle";
import { AppString } from "../../Assets/utils/AppString";
import { imgDownArrow } from "../../Assets/utils/Image";
import { BackToolbar } from "../../Components/BackToolbar/BackToolbar";
import { MyWhiteStatusbar } from "../../Components/MyStatusBar/MyWhiteStatusbar";
import { Switch } from "react-native-paper";
import { COLORS } from "../../Assets/utils/COLORS";
import { useActions } from "../../redux/actions";
import { POPLinkButton } from "../../Components/Button/Button";
import Modal from "react-native-modal";
import TutorialStyle from "../Signup/Tutorial/TutorialStyle";
import { FONT } from "../../Assets/utils/FONT";

const SettingScreen = ({ navigation }) => {
  const { Logout, getSetting, updateSetting, DelectAccount } = useActions();
  const [getGiftingSwitch, setGiftingSwitch] = useState(false);
  const [getSpecialMomentsSwitch, setSpecialMomentsSwitch] = useState(false);
  const [isFitst, setIsFitst] = useState(false);

  const [getDeletedAccountModel, setDeletedAccountModel] = useState(false);
  const [getNotification, setNotification] = useState(true);
  const [getManageSubscriptions, setManageSubscriptions] = useState(false);
  const [getHelp, setHelp] = useState(false);
  const [getAbout, setAbout] = useState(false);

  const CloseItem = () => {
    setDeletedAccountModel(false);
  };

  const GiftingToggleSwitch = async () => {
    var getGifting = getGiftingSwitch ? 1 : 0;
    var getSpecialMoments = getSpecialMomentsSwitch ? 1 : 0;
    const { response, error } = await updateSetting(
      getGifting,
      getSpecialMoments
    );

    setGiftingSwitch(!getGiftingSwitch);
  };
  const SpecialMomentsToggleSwitch = async () => {
    var getGifting = getGiftingSwitch ? 1 : 0;
    var getSpecialMoments = getSpecialMomentsSwitch ? 1 : 0;
    const { response, error } = await updateSetting(
      getGifting,
      getSpecialMoments
    );
    setSpecialMomentsSwitch(!getSpecialMomentsSwitch);
  };

  const Notification = () => {
    setNotification(!getNotification);
  };
  const ManageSubscriptions = () => {
    setManageSubscriptions(!getManageSubscriptions);
  };
  const Help = () => {
    setHelp(!getHelp);
  };
  const About = () => {
    setAbout(!getAbout);
  };

  const GetSetting = async () => {
    const { response, error } = await getSetting();
    if (response.data.StatusCode) {
      setGiftingSwitch(false);
      if (response.data.Result.isNotifyGifting == "1") {
        setGiftingSwitch(true);
      } else {
      }
      setSpecialMomentsSwitch(false);
      if (response.data.Result.isNotifySpecialMoment == " 1") {
        setSpecialMomentsSwitch(true);
      }
    }
  };

  const CheckDeletedAccount = () => {
    setDeletedAccountModel(true);
  };
  const FinalDeletedAccount = async () => {
    const { DelectAccountResponse, DelectAccountError } = await DelectAccount();
    if (DelectAccountResponse.data.StatusCode == "1") {
      setDeletedAccountModel(false);
      Logout(), navigation.navigate("MainScreen");
    } else {
    }
  };

  if (!isFitst) {
    GetSetting();
    setIsFitst(true);
  }

  return (
    <View style={[CommonStyle.BgColorWhite, { width: "100%" }]}>
      <MyWhiteStatusbar />
      <SafeAreaView style={[CommonStyle.BgColorWhite, { width: "100%" }]}>
        <BackToolbar
          ScreenName={AppString.Settings}
          onPress={() => navigation.navigate("HomeScreen")}
        />
        <View
          style={[
            CommonStyle.Base,
            CommonStyle.p16,
            CommonStyle.BgColorWhite,
            { paddingLeft: 24, paddingRight: 24 },
          ]}
        >
          <View style={{ paddingBottom: 16 }}>
            <View style={CommonStyle.RowSpace}>
              <Text style={CommonStyle.txtTitle}>
                {AppString.Notifications}
              </Text>
              <TouchableOpacity onPress={() => Notification()}>
                <Image source={imgDownArrow} style={CommonStyle.imgIconSize} />
              </TouchableOpacity>
            </View>
            {getNotification == true ? (
              <View>
                <View style={CommonStyle.RowSpace}>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.Gifting}
                  </Text>
                  <Switch
                    value={getGiftingSwitch}
                    onValueChange={GiftingToggleSwitch}
                    color={COLORS.black}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>
                <View style={CommonStyle.RowSpace}>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.SpecialMoments}
                  </Text>
                  <Switch
                    value={getSpecialMomentsSwitch}
                    onValueChange={SpecialMomentsToggleSwitch}
                    color={COLORS.black}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ paddingBottom: 16 }}>
            <View style={CommonStyle.RowSpace}>
              <Text style={CommonStyle.txtTitle}>
                {AppString.ManageSubscriptions}
              </Text>
              <TouchableOpacity onPress={() => ManageSubscriptions()}>
                <Image source={imgDownArrow} style={CommonStyle.imgIconSize} />
              </TouchableOpacity>
            </View>

            {getManageSubscriptions == true ? (
              <View>
                <View style={CommonStyle.RowSpace}>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.Current}
                  </Text>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.Free}
                  </Text>
                </View>
                <View style={CommonStyle.centerRow}>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.Upgrade}
                    <Text style={{ color: COLORS.gold }}>
                      {" "}
                      {AppString.UpgradePrice}{" "}
                    </Text>
                    {AppString.monthly}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ paddingBottom: 16 }}>
            <View style={CommonStyle.RowSpace}>
              <Text style={CommonStyle.txtTitle}>{AppString.Help}</Text>
              <TouchableOpacity onPress={() => Help()}>
                <Image source={imgDownArrow} style={CommonStyle.imgIconSize} />
              </TouchableOpacity>
            </View>

            {getHelp == true ? (
              <View style={{ paddingTop: 5 }}>
                <View style={CommonStyle.centerRow}>
                  <Text
                    style={[
                      CommonStyle.txtContent,
                      { color: COLORS.PrimaryLight },
                    ]}
                  >
                    {AppString.customer1}
                    <Text style={{ color: COLORS.gold }}>
                      {" "}
                      {AppString.email}{" "}
                    </Text>
                    {AppString.customer2}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>

          <View style={{ paddingBottom: 16 }}>
            <View style={CommonStyle.RowSpace}>
              <Text style={CommonStyle.txtTitle}>{AppString.About}</Text>
              <TouchableOpacity onPress={() => About()}>
                <Image source={imgDownArrow} style={CommonStyle.imgIconSize} />
              </TouchableOpacity>
            </View>
            {getAbout == true ? (
              <View>
                <View>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={[
                        CommonStyle.txtContent,
                        { color: COLORS.PrimaryLight },
                      ]}
                    >
                      {AppString.AbDataPolicyout}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Text
                      style={[
                        CommonStyle.txtContent,
                        { color: COLORS.PrimaryLight },
                      ]}
                    >
                      {AppString.TermsofService}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={() => CheckDeletedAccount()}
            style={{ paddingBottom: 16 }}
          >
            <Text style={[CommonStyle.txtTitle, { color: COLORS.Primary }]}>
              {AppString.Deleteaccount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Logout(), navigation.navigate("MainScreen");
            }}
            style={{ paddingBottom: 16 }}
          >
            <View style={CommonStyle.RowSpace}>
              <Text style={[CommonStyle.txtTitle, { color: COLORS.Primary }]}>
                {AppString.Logout}
              </Text>
              <Text
                style={[CommonStyle.txtTitle, { color: COLORS.PrimaryLight }]}
              >
                {AppString.Version}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ----- */}

        {getDeletedAccountModel == true ? (
          <Modal testID={"modal"} isVisible={getDeletedAccountModel}>
            <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
              <View style={CommonStyle.Row}>
                <View style={{ width: "100%" }}>
                  <Text
                    style={[
                      CommonStyle.txtTitle,
                      CommonStyle.mb32,
                      { fontFamily: FONT.Gilroy },
                    ]}
                  >
                    {AppString.ConfirmText}
                  </Text>
                </View>
              </View>

              <View
                style={[CommonStyle.Row, { justifyContent: "space-between" }]}
              >
                <POPLinkButton
                  buttonName={AppString.Cancel}
                  onPress={() => CloseItem()}
                />

                <POPLinkButton
                  buttonName={AppString.confirm}
                  onPress={() => FinalDeletedAccount()}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
