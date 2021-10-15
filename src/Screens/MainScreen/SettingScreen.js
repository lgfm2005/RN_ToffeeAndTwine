import React, { useEffect, useState } from "react";
import {
  Platform,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
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
import Purchases from "react-native-purchases";
import Moment from "moment";
import {
  DataPolicy,
  ShareAppLink,
  TermsOfService,
} from "../../Assets/utils/ShareLink";
import OneSignal from "react-native-onesignal";

const SettingScreen = ({ navigation }) => {
  const {
    Logout,
    getSetting,
    updateSetting,
    DelectAccount,
    userSubscription,
    FinalLogOut,
  } = useActions();
  const [getGiftingSwitch, setGiftingSwitch] = useState(false);
  const [getSpecialMomentsSwitch, setSpecialMomentsSwitch] = useState(false);
  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState("0");
  const [planPeriodEnd, setPlanPeriodEnd] = useState("");

  const [isFitst, setIsFitst] = useState(false);

  const [getDeletedAccountModel, setDeletedAccountModel] = useState(false);
  const [getNotification, setNotification] = useState(true);
  const [getManageSubscriptions, setManageSubscriptions] = useState(false);
  const [getHelp, setHelp] = useState(false);
  const [getAbout, setAbout] = useState(false);

  const CloseItem = () => {
    setDeletedAccountModel(false);
  };

  const GiftingToggle = async () => {
    var getGifting = getGiftingSwitch ? 1 : 0;
    setGiftingSwitch(!getGiftingSwitch);
    Permission.response("notification").then((response) => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      this.setState({ photoPermission: response });
    });
    var getSpecialMoments = getSpecialMomentsSwitch ? 1 : 0;
    const { response, error } = await updateSetting(
      getGifting,
      getSpecialMoments
    );
  };

  const registerForPushNotifications = (permission) => {
    console.log("permission::", permission);
    if (permission) {
      GiftingToggle();
    } else {
      setGiftingSwitch(false);
      Linking.openURL("app-settings:");
    }
    // console.log("registerForPushNotifications::", permission);
    // do something with permission value
  };

  const GiftingToggleSwitch = async () => {
    OneSignal.promptForPushNotificationsWithUserResponse(
      registerForPushNotifications
    );
  };

  const SpecialMomentsToggleSwitch = async () => {
    setSpecialMomentsSwitch(!getSpecialMomentsSwitch);
    var getGifting = getGiftingSwitch ? 1 : 0;
    var getSpecialMoments = getSpecialMomentsSwitch ? 1 : 0;
    const { response, error } = await updateSetting(
      getGifting,
      getSpecialMoments
    );
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
    if (response.data.StatusCode == "1") {
      if (response.data.Result.user_subscription_status == "1") {
        setUserSubscriptionStatus(1);
        setPlanPeriodEnd(response.data.Result.plan_period_end);
      } else {
        setUserSubscriptionStatus(0);
        setPlanPeriodEnd("");
      }
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
  const FinalCheckLogout = async () => {
    OneSignal.removeExternalUserId();
    OneSignal.unsubscribeWhenNotificationsAreDisabled(true);
    const { FinalLogOutResponse, FinalLogOutError } = await FinalLogOut();
    if (FinalLogOutResponse.data.StatusCode == "1") {
      console.log("Logout Checked");
      Logout();
      navigation.navigate("MainScreen");
    } else {
      console.log("Logout Error", FinalLogOutError);
    }
  };
  const userSubscriptions = async (info) => {
    if (info.latestExpirationDate != null) {
      if (typeof info.entitlements.active.pro_monthly !== "undefined") {
        var latestExpirationDates = Moment(info.latestExpirationDate)
          .format("YYYY-MM-DD")
          .toString();
        var cuttentDate = Moment(new Date()).format("YYYY-MM-DD").toString();
        const { UserSubscriptionResponse, UserSubscriptionError } =
          await userSubscription("1.99", latestExpirationDates, cuttentDate);
        GetSetting();
      }
    }
  };

  const handleSubmitPayment = async () => {
    // setLoading(true);
    // HapticFeedback.trigger("impactLight");

    var currentDate = Moment(new Date(), "DD/MM/YYYY");
    try {
      const purchaserInfo1 = await Purchases.getPurchaserInfo();
      var latestExpirationDates = Moment(
        purchaserInfo1.latestExpirationDate,
        "DD/MM/YYYY"
      );

      var isBefore = currentDate.isBefore(latestExpirationDates);
      if (!isBefore) {
        if (
          typeof purchaserInfo1.entitlements.active.pro_monthly !== "undefined"
        ) {
          // Grant user "pro" access
        }
        const offerings = await Purchases.getOfferings();
        console.log("offerings:", offerings);
        const monthlyPackage = offerings.current.monthly;
        const { purchaserInfo } = await Purchases.purchasePackage(
          monthlyPackage
        );
        const { latestExpirationDate } = purchaserInfo;
        userSubscriptions(purchaserInfo);
        console.log("latestExpirationDate:", latestExpirationDate);
      } else {
      }
    } catch (e) {
      console.log("Error:", e);
      // setLoading(false);
      // if (e.userCancelled) return;
      // setError(
      //   "Something went wrong.\nPlease restart the app and start the purchase process again.",
      // );
      // setErrorDetails(e.message);
      // HapticFeedback.trigger("impactHeavy");
    }
  };

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
    Purchases.syncPurchases();
    // Purchases.addPurchaserInfoUpdateListener((info) => {
    //   // handle any changes to purchaserInfo

    // });
  }, []);

  if (!isFitst) {
    GetSetting();
    setIsFitst(true);
  }

  return (
    <View style={[CommonStyle.BgColorWhite]}>
      <MyWhiteStatusbar />

      <SafeAreaView
        style={[
          CommonStyle.BgColorWhite,
          { height: "100%", backgroundColor: COLORS.Secondary },
        ]}
      >
        <BackToolbar
          ScreenName={AppString.Settings}
          onPress={() => navigation.goBack()}
        />

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
          bounces={false}
        >
          <View
            style={[
              CommonStyle.Base,
              CommonStyle.p16,
              CommonStyle.BgColorWhite,
              { paddingLeft: 24, paddingRight: 24 },
            ]}
          >
            <View style={CommonStyle.paddingBottom20}>
              <TouchableOpacity onPress={() => Notification()}>
                <View style={CommonStyle.RowSpace}>
                  <Text style={CommonStyle.txtTitle}>
                    {AppString.Notifications}
                  </Text>
                  <Image
                    source={imgDownArrow}
                    style={CommonStyle.imgIconSize}
                  />
                </View>
              </TouchableOpacity>
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

            <View style={CommonStyle.paddingBottom20}>
              <TouchableOpacity onPress={() => ManageSubscriptions()}>
                <View style={CommonStyle.RowSpace}>
                  <Text style={CommonStyle.txtTitle}>
                    {AppString.ManageSubscriptions}
                  </Text>
                  <Image
                    source={imgDownArrow}
                    style={CommonStyle.imgIconSize}
                  />
                </View>
              </TouchableOpacity>

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
                      {userSubscriptionStatus == "1"
                        ? " $1.99 - Monthly"
                        : AppString.Free}
                    </Text>
                  </View>
                  <TouchableOpacity
                    disabled={userSubscriptionStatus == "1" ? true : false}
                    onPress={() => handleSubmitPayment()}
                    style={CommonStyle.centerRow}
                  >
                    <Text
                      style={[
                        CommonStyle.txtContent,
                        { color: COLORS.PrimaryLight },
                      ]}
                    >
                      {userSubscriptionStatus == "1" ? "" : AppString.Upgrade}
                      <Text style={{ color: COLORS.gold }}>
                        {" "}
                        {userSubscriptionStatus == "1"
                          ? " Next Billing On: " +
                            Moment(planPeriodEnd)
                              .format("MMMM DD YYYY")
                              .toString()
                          : AppString.UpgradePrice}
                      </Text>{" "}
                      {userSubscriptionStatus == "1" ? "" : AppString.monthly}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View style={CommonStyle.paddingBottom20}>
              <TouchableOpacity onPress={() => Help()}>
                <View style={CommonStyle.RowSpace}>
                  <Text style={CommonStyle.txtTitle}>{AppString.Help}</Text>
                  <Image
                    source={imgDownArrow}
                    style={CommonStyle.imgIconSize}
                  />
                </View>
              </TouchableOpacity>

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

            <View style={CommonStyle.paddingBottom20}>
              <TouchableOpacity onPress={() => About()}>
                <View style={CommonStyle.RowSpace}>
                  <Text style={CommonStyle.txtTitle}>{AppString.About}</Text>
                  <Image
                    source={imgDownArrow}
                    style={CommonStyle.imgIconSize}
                  />
                </View>
              </TouchableOpacity>
              {getAbout == true ? (
                <View>
                  <View>
                    <TouchableOpacity onPress={() => DataPolicy()}>
                      <Text
                        style={[
                          CommonStyle.txtContent,
                          { color: COLORS.PrimaryLight },
                        ]}
                      >
                        {AppString.AbDataPolicyout}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => TermsOfService()}>
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
              style={CommonStyle.paddingBottom20}
            >
              <Text style={[CommonStyle.txtTitle, { color: COLORS.Primary }]}>
                {AppString.Deleteaccount}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => FinalCheckLogout()}
              style={CommonStyle.paddingBottom20}
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
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
