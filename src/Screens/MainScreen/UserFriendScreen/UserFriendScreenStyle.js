import { StyleSheet } from "react-native";
import { fontsize18, fontsize24 } from "../../../Assets/Style/CommonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { FONT } from "../../../Assets/utils/FONT";

export const UserFriendScreenStyle = StyleSheet.create({
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
    // justifyContent: "center",
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
  NameAndEditbg: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  MomentStatus: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userName: {
    ...fontsize24,
    fontWeight: "600",
    fontFamily: FONT.NotoSans,
  },
});
