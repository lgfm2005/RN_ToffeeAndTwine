import { StyleSheet } from "react-native";
import { p24 } from "../../../Assets/Style/CommonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import FontSize from "../../../Assets/utils/FontSize";

export default CommonStyle = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  inputHalf: {
    width: "48%",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  popbg: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    ...p24,
  },
  popView: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 16,
  },
  popimg: {
    width: 40,
    height: 40,
  },
  popbtn: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  silderbg: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 5,
    paddingBottom: 5,
    position: "absolute",
    bottom: 0,
    height: 64,
  },
  silderCircle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: COLORS.black,
  },
  SilderbgImg: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
  },
  silderIcon: {
    width: 24,
    height: 24,
  },
});
