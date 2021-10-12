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
import CommonStyle from "../../Assets/Style/CommonStyle";
import { AppString } from "../../Assets/utils/AppString";
import { COLORS } from "../../Assets/utils/COLORS";
import { imgLeftBack } from "../../Assets/utils/Image";
import { BackToolbarStyle } from "./BackToolbarStyle";

// Asset

export const BackToolbar = ({ onPress, ScreenName }) => {
  return (
    <View style={[CommonStyle.Container, BackToolbarStyle.TopToolBar]}>
      <View style={{ width: "20%" }}>
        <TouchableOpacity onPress={onPress}>
          <Image source={imgLeftBack} style={[CommonStyle.imgIconSize]} />
        </TouchableOpacity>
      </View>
      <View style={{ width: "60%", alignItems: "center" }}>
        <Text style={CommonStyle.txtTitle}>{ScreenName}</Text>
      </View>
      <View style={{ width: "20%" }}></View>
    </View>
  );
};
