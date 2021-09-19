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
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { COLORS } from "../../../Assets/utils/COLORS";
import { imgInvite } from "../../../Assets/utils/Image";
import { FilledButton, POPLinkButton } from "../../../Components/Button/Button";

// Asset

const UpComingThankyou = ({ navigation }) => {
  return (
    <View style={[CommonStyle.MainContainer, CommonStyle.BgColorWhite]}>
      <Image source={imgInvite} style={[CommonStyle.imgGiftTutorial]} />
      <View style={CommonStyle.p16}>
        <Text style={[CommonStyle.txtContent]}>{AppString.upgradedEnjoy}</Text>
        <View style={CommonStyle.centerRow}>
          <POPLinkButton buttonName={AppString.continue} onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default UpComingThankyou;
