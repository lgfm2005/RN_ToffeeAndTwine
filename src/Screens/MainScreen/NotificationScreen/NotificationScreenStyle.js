import { StyleSheet } from "react-native";
import { COLORS } from "../../../Assets/utils/COLORS";

export const NotificationScreenStyle = StyleSheet.create({
  FollowerListBg: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  followerTxtIcon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  backgroundColor: {
    width: "100%",
    height: "100%",
    paddingTop: 16,
    backgroundColor: COLORS.white,
  },
  txtcolor: {
    color: COLORS.PrimaryLight,
  },
});
