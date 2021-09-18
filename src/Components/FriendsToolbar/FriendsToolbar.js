import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import CommonStyle from '../../Assets/Style/CommonStyle';
import {AppString} from '../../Assets/utils/AppString';
import {COLORS} from '../../Assets/utils/COLORS';
import {imgSearch} from '../../Assets/utils/Image';
import {FriendsToolbarStyle} from './FriendsToolbarStyle';

// Asset

export const FriendsToolbar = ({onPress}) => {
  return (
    <View style={[CommonStyle.Container, FriendsToolbarStyle.TopToolBar]}>
      <Text style={[CommonStyle.txtTitle, {fontSize: 24}]}>
        {AppString.Friends}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <Image source={imgSearch} style={CommonStyle.imgIconSize} />
      </TouchableOpacity>
    </View>
  );
};
