import { beforeEach } from "jest-circus";
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
  Modal,
  ScrollView,
} from "react-native";
import Purchases from "react-native-purchases";

// Lib
// import Modal from 'react-native-modal';

import CommonStyle from "../../../Assets/Style/CommonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { COLORS } from "../../../Assets/utils/COLORS";
import { imgInvite, imgcross, imgThankYou } from "../../../Assets/utils/Image";
import { FilledButton, POPLinkButton } from "../../../Components/Button/Button";
import { useActions } from "../../../redux/actions";
import Moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";

const UpcomingUpGrade = ({ navigation }) => {
  const [getUpgradeModel, setUpgradeModel] = useState(false);
  const { userSubscription, getProfile } = useActions();
  const [getLoader, setLoader] = useState(false);

  const CloseItem = () => {
    setUpgradeModel(false);
    navigation.navigate("UpcomingMoments");
  };

  const handleSubmitPayment = async () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 4000);
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
        const monthlyPackage = offerings.current.monthly;
        const { purchaserInfo } = await Purchases.purchasePackage(
          monthlyPackage
        );
        const { latestExpirationDate } = purchaserInfo;
        userSubscriptions(purchaserInfo);
      } else {
      }
    } catch (e) {}
  };

  const userSubscriptions = async (info) => {
    if (info.latestExpirationDate != null) {
      if (typeof info.entitlements.active.pro_monthly !== "undefined") {
        // var latestExpirationDates = Moment(info.latestExpirationDate)
        //   .format("YYYY-MM-DD")
        //   .toString();
        setLoader(true);
        var cuttentDate = Moment(new Date()).format("YYYY-MM-DD").toString();
        var latestExpirationDates = Moment(Moment(cuttentDate).add(1, "M"))
          .format("YYYY-MM-DD")
          .toString();
        const { UserSubscriptionResponse, UserSubscriptionError } =
          await userSubscription("1.99", cuttentDate, latestExpirationDates);
        setLoader(false);
        setUpgradeModel(true);
      }
    }
  };
  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
    Purchases.syncPurchases();
    Purchases.addPurchaserInfoUpdateListener((info) => {
      // handle any changes to purchaserInfo
    });
  }, []);
  // const UpGradePayment = () => {
  //   setUpgradeModel(true);
  //   handleSubmitPayment();
  // };

  const UpGradePayment = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode == "1") {
      var isActive =
        profileResponse.data.Result[0].user_details[0].user_subscription_status;
      if (isActive == "0") {
        //
        Purchases.logOut();
        Purchases.setDebugLogsEnabled(true);
        Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
        Purchases.syncPurchases();
        handleSubmitPayment();
      } else {
      }
    }
  };

  return (
    <View style={CommonStyle.BgColorWhite}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[CommonStyle.BgColorWhite, { height: "100%" }]}
        contentContainerStyle={{ bottom: 45 }}
      >
        <Image source={imgInvite} style={[CommonStyle.imgGiftTutorial]} />
        <View style={[CommonStyle.Container, CommonStyle.BgColorWhite]}>
          <View>
            <View style={CommonStyle.Row}>
              <Text style={CommonStyle.txtContent}>
                {AppString.txtUpgradecategories1}
                <Text style={{ color: COLORS.gold }}> {AppString.price} </Text>
                {AppString.txtUpgradecategories2}
              </Text>
            </View>
            <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
              {AppString.UpgradeIncludes}
            </Text>
            <View style={{ paddingLeft: 15 }}>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.txtUpgradecategoriesp1}
              </Text>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.txtUpgradecategoriesp2}
              </Text>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.txtUpgradecategoriesp3}
              </Text>
            </View>
            <View style={[CommonStyle.centerRow, { marginTop: 5 }]}>
              <POPLinkButton
                buttonName={AppString.Upgrade}
                onPress={() => UpGradePayment()}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {getUpgradeModel == true ? (
        <Modal>
          <View
            style={[
              {
                width: "100%",
                height: "100%",
                backgroundColor: COLORS.BgColorWhite,
              },
            ]}
          >
            <SafeAreaView>
              <TouchableOpacity onPress={() => CloseItem()}>
                <View style={[CommonStyle.rowEnd, { paddingRight: 15 }]}>
                  <Image source={imgcross} style={CommonStyle.imgIconSize} />
                </View>
              </TouchableOpacity>
              <View
                style={[
                  CommonStyle.BgColorWhite,
                  {
                    width: "100%",
                    height: "90%",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <Image
                  source={imgThankYou}
                  style={[
                    CommonStyle.imgGiftTutorial,
                    { resizeMode: "contain" },
                  ]}
                />
                <View style={CommonStyle.p16}>
                  <Text style={[CommonStyle.txtContent]}>
                    {AppString.upgradedEnjoy}
                  </Text>
                  <View style={CommonStyle.centerRow}>
                    <POPLinkButton
                      buttonName={AppString.continue}
                      onPress={() => CloseItem()}
                    />
                  </View>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      ) : null}
      <Spinner visible={getLoader} />
    </View>
  );
};

export default UpcomingUpGrade;
