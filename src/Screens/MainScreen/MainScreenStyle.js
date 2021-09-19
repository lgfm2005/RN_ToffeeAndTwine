import { StyleSheet, Dimensions } from "react-native";
import { fontsize20 } from "../../Assets/Style/CommonStyle";
import { COLORS } from "../../Assets/utils/COLORS";

const { width } = Dimensions.get("screen");

export const MainScreenStyle = StyleSheet.create({
  homeImg: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  scrollItemStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  // FriendScreen
  friendToolbarbg: {
    width: "33.33%",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.Secondary,
    borderRadius: 2,
  },
  tabActive: {
    borderBottomColor: COLORS.Primary,
  },
});
