import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import { fontsize14 } from "../../Assets/Style/CommonStyle";
import { imgPlus } from "../../Assets/utils/Image";
import { COLORS } from "../../Assets/utils/COLORS";
import { AllListViewStyle } from "./AllListViewStyle";

const numColumns = 5;
// const size = Dimensions.get('window').width;
const { width } = Dimensions.get("screen");

export const SelectCategoriesList = ({
  Id,
  index,
  ImageUrl,
  ExploreName,
  DataLength,
  onPress,
  AddNewOnPress,
  ...props
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={AllListViewStyle.itemContainer}>
          <View style={AllListViewStyle.listIconbg}>
            <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
          </View>
          <Text style={AllListViewStyle.listfont}>{ExploreName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export const PopUpSelectCategoriesList = ({
  Id,
  index,
  ImageUrl,
  ExploreName,
  DataLength,
  onPress,
  AddNewOnPress,
  ...props
}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={AllListViewStyle.popUpItemContainer}>
          <View style={AllListViewStyle.listIconbg}>
            <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
          </View>
          <Text style={AllListViewStyle.listfont}>{ExploreName}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
