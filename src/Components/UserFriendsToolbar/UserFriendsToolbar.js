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
import { imgSearch, imgLeftBack } from "../../Assets/utils/Image";
import { UserFriendsToolbarStyle } from "./UserFriendsToolbarStyle";

// Asset

export const UserFriendsToolbar = ({ onPressBack, onPressSearch, usename }) => {
  return (
    <View style={[CommonStyle.Container, UserFriendsToolbarStyle.TopToolBar]}>
      <TouchableOpacity onPress={onPressBack}>
        <Image source={imgLeftBack} style={CommonStyle.imgIconSize} />
      </TouchableOpacity>
      <Text style={[CommonStyle.txtTitle, { fontSize: 24 }]}>
        {usename} {AppString.Friends}
      </Text>
      <TouchableOpacity onPress={onPressSearch}>
        <Image source={imgSearch} style={CommonStyle.imgIconSize} />
      </TouchableOpacity>
    </View>
  );
};
