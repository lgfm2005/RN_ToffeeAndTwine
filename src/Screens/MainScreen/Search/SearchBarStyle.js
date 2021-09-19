import { StyleSheet } from "react-native";
import { COLORS } from "../../../Assets/utils/COLORS";

export const SearchBarStyle = StyleSheet.create({
  FollowerListBg: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  followerTxtIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnBg: {
    flexDirection: "row",
  },
  backgroundColor: {
    width: "100%",
    height: "100%",
    paddingTop: 16,
    backgroundColor: COLORS.white,
  },
});
