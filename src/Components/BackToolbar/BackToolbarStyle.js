import { StyleSheet } from "react-native";
import { fontsize16 } from "../../Assets/Style/CommonStyle";
import { COLORS } from "../../Assets/utils/COLORS";

export const BackToolbarStyle = StyleSheet.create({
  TopToolBar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    // backgroundColor: "red",
    height: 30,
    // paddingTop: 10
  },
});
