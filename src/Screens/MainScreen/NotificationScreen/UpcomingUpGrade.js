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

// Lib
// import Modal from 'react-native-modal';

import CommonStyle from "../../../Assets/Style/CommonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { COLORS } from "../../../Assets/utils/COLORS";
import { imgInvite, imgcross, imgThankYou } from "../../../Assets/utils/Image";
import { FilledButton, POPLinkButton } from "../../../Components/Button/Button";

const UpcomingUpGrade = ({ navigation }) => {
  const [getUpgradeModel, setUpgradeModel] = useState(false);

  const CloseItem = () => {
    setUpgradeModel(false);
    navigation.navigate("UpcomingMoments");
  };
  const UpGradePayment = () => {
    setUpgradeModel(true);
  };

  return (
    <View style={CommonStyle.BgColorWhite}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={[CommonStyle.BgColorWhite, { height: "100%" }]}
      >
        <Image source={imgInvite} style={[CommonStyle.imgGiftTutorial]} />
        <View style={[CommonStyle.Container, CommonStyle.BgColorWhite]}>
          <View>
            <View style={CommonStyle.Row}>
              <Text style={CommonStyle.txtContent}>
                {AppString.Upgradenow}
                <Text style={{ color: COLORS.gold }}> {AppString.price} </Text>
                {AppString.Upgradefriendspecialmoments}
              </Text>
            </View>
            <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
              {AppString.UpgradeIncludes}
            </Text>
            <View style={{ paddingLeft: 15 }}>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.Notificationsfriends}
              </Text>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.giftlisthints}
              </Text>
              <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                {"\u2022"} {AppString.sharewithfriends}
              </Text>
            </View>
            <View style={CommonStyle.centerRow}>
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
    </View>
  );
};

export default UpcomingUpGrade;
