import React, { useState } from "react";
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

const SettingScreen = ({ navigation }) => {
  const { Logout } = useActions();
  const [getGiftingSwitch, setGiftingSwitch] = useState(false);
  const [getSpecialMomentsSwitch, setSpecialMomentsSwitch] = useState(false);

  const [getNotification, setNotification] = useState(true);
  const [getManageSubscriptions, setManageSubscriptions] = useState(false);
  const [getHelp, setHelp] = useState(false);
  const [getAbout, setAbout] = useState(false);

  const GiftingToggleSwitch = () => {
    setGiftingSwitch(!getGiftingSwitch);
  };
  const SpecialMomentsToggleSwitch = () => {
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

          <TouchableOpacity onPress={() => {}} style={{ paddingBottom: 16 }}>
            <Text style={[CommonStyle.txtTitle, { color: COLORS.Primary }]}>
              {AppString.Deleteaccount}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Logout()}
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
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
