// import React, {useEffect, useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   Dimensions,
//   Text,
//   Image,
//   TouchableOpacity,
// } from 'react-native';

// import {fontsize14} from '../../Assets/Style/CommonStyle';
// import {imgPlus} from '../../Assets/utils/Image';
// import {COLORS} from '../../Assets/utils/COLORS';
// import {AllListViewStyle} from './AllListViewStyle';

// export const CalendarList = ({
//   Id,
//   index,
//   ImageUrl,
//   ExploreName,
//   DataLength,
//   onPress,
//   AddNewOnPress,
//   ...props
// }) => {
//   return (
//     <View>
//       <TouchableOpacity onPress={onPress}>
//         <View style={AllListViewStyle.itemContainer}>
//           <View style={AllListViewStyle.listIconbg}>
//             <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
//           </View>
//           <Text style={AllListViewStyle.listfont}>{ExploreName}</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import CommonStyle, {fontsize14} from '../../Assets/Style/CommonStyle';
import {imgImport} from '../../Assets/utils/Image';
import {COLORS} from '../../Assets/utils/COLORS';
import {AllListViewStyle} from './AllListViewStyle';
import {FONT} from '../../Assets/utils/FONT';

export const CalendarList = ({
  Id,
  index,
  ImageUrl,
  ExploreName,
  DataLength,
  onPress,
  AddNewOnPress,
  ColorCode,
  ...props
}) => {
  return (
    <View>
      {index == DataLength - 1 ? (
        <TouchableOpacity onPress={AddNewOnPress}>
          <View style={AllListViewStyle.itemContainer}>
            <Image source={imgImport} style={CommonStyle.modulePopupImage} />
            <Text
              style={[AllListViewStyle.listfont, {fontFamily: FONT.Gilroy}]}>
              Add
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <View style={[AllListViewStyle.itemContainer]}>
            <View>
              <View style={AllListViewStyle.listIconbg}>
                <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
              </View>
            </View>
            <View>
              <Text
                style={[AllListViewStyle.listfont, {fontFamily: FONT.Gilroy}]}>
                {ExploreName}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
