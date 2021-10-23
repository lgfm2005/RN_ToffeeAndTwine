import { StyleSheet } from "react-native";
import { fontsize16 } from "../../Assets/Style/CommonStyle";
import { COLORS } from "../../Assets/utils/COLORS";

export const UserFriendsToolbarStyle = StyleSheet.create({
  TopToolBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
