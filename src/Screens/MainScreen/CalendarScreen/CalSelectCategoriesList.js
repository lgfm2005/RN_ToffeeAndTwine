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

export const CalSelectCategoriesList = ({
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
        <View style={[AllListViewStyle.itemContainer]}>
          <View style={AllListViewStyle.listIconbg}>
            <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
          </View>
          <Text>
            {ExploreName}
            {/* {ExploreName.length > 9
              ? ExploreName.substring(0, 9 - 3) + "..."
              : ExploreName} */}
          </Text>
          {/* <Text style={AllListViewStyle.listfont}>{ExploreName}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};
