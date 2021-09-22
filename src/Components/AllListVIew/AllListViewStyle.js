import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import CommonStyle, { fontsize20 } from "../../Assets/Style/CommonStyle";

import { COLORS } from "../../Assets/utils/COLORS";
import { fontsize14 } from "../../Assets/Style/CommonStyle";
const { width } = Dimensions.get("screen");

export const AllListViewStyle = StyleSheet.create({
  itemContainer: {
    flexDirection: "column",
    marginBottom: 16,
    minWidth: "24%",
    // width: '100%',
    // width: width / 7,
    alignItems: "center",
    // paddingLeft: "1%",
    // paddingRight: '1%',
    marginLeft: "0.5%",
    marginRight: "0.5%",
  },
  addItem: {
    borderWidth: 1,
    borderColor: COLORS.PrimaryLight,
    borderStyle: "dashed",
    backgroundColor: COLORS.SecondaryLight,
  },
  listIconbg: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  grayListIconbg: {
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    backgroundColor: COLORS.PrimaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  RemovebglistIconbg: {
    width: 24,
    height: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeListbg: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  listIcon: {
    width: 30,
    height: 30,
  },
  listfont: {
    ...fontsize14,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    width: 60,
  },
  popupImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
});
