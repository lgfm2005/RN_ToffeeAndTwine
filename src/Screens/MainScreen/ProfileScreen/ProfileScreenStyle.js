import { StyleSheet } from "react-native";
import {
  fontsize14,
  fontsize16,
  fontsize24,
} from "../../../Assets/Style/CommonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { FONT } from "../../../Assets/utils/FONT";

export const ProfileScreenStyle = StyleSheet.create({
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
