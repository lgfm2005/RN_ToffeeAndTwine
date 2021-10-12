import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../utils/COLORS";
import { FONT } from "../utils/FONT";

const WindowWidth = Dimensions.get("window").width;
const WindowHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("screen").width;
const ScreenHeight = Dimensions.get("screen").height;

// export const redBorder = {
//     borderColor: 'red',
//     borderWidth: 1
// }

export const baseContainer = {
  width: "100%",
  paddingLeft: 24,
  paddingRight: 24,
  backgroundColor: COLORS.RootBG,
};
export const fontsize12 = {
  fontSize: 12,
};
export const fontsize13 = {
  fontSize: 13,
};
export const fontsize14 = {
  fontSize: 14,
};
export const fontsize16 = {
  fontSize: 16,
};
export const fontsize18 = {
  fontSize: 18,
};
export const fontsize20 = {
  fontSize: 20,
};
export const fontsize24 = {
  fontSize: 24,
};
export const mb10 = {
  marginBottom: 10,
};
export const mb32 = {
  marginBottom: 32,
};
export const mt32 = {
  marginTop: 32,
};
export const mb16 = {
  marginBottom: 16,
};
export const p32 = {
  padding: 32,
};
export const p20 = {
  paddingLeft: 20,
  paddingRight: 20,
};
export const p24 = {
  padding: 24,
};

export default CommonStyle = StyleSheet.create({
  Base: {
    width: "100%",
    height: "100%",
    // ...redBorder
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    // backgroundColor: 'red',
    height: "100%",
    backgroundColor: COLORS.RootBG,
  },
  Container: {
    ...baseContainer,
  },
  my32: {
    marginTop: 32,
    marginBottom: 32,
  },
  my16: {
    marginTop: 16,
    marginBottom: 16,
  },
  mb32: {
    marginBottom: 32,
  },
  mb10: {
    marginBottom: 10,
  },
  pb16: {
    paddingBottom: 16,
  },
  mb16: {
    marginBottom: 16,
  },
  mt32: {
    marginTop: 32,
  },
  mt16: {
    marginTop: 16,
  },
  imgGiftTutorial: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  txtTitle: {
    lineHeight: 32,
    fontFamily: FONT.Gilroy,
    // marginBottom: 8,
    ...fontsize20,
  },
  txtContent: {
    lineHeight: 32,
    fontFamily: FONT.Gilroy,
    ...fontsize16,
    ...mb16,
  },
  formGroup: {
    ...mb16,
  },
  formInputGroup: {
    flexDirection: "row",
    // ...mb32
  },
  formLabel: {
    ...fontsize16,
    fontFamily: FONT.Gilroy,
    marginBottom: 8,
  },
  formPopUpLabel: {
    ...fontsize16,
    fontFamily: FONT.Gilroy,
    fontWeight: "500",
    width: "30%",
  },
  formControl: {
    width: "100%",
    height: 46,
    backgroundColor: COLORS.Secondary,
    borderColor: COLORS.Primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    ...mb16,
    fontFamily: FONT.Gilroy,
    // ...mb32
  },
  formSimpleEditView: {
    width: "70%",
    // height: 46,
    // backgroundColor: COLORS.Secondary,
    paddingLeft: 16,
  },
  formSimpletxtEditView: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 16,
  },
  logoImage: {
    width: "100%",
    height: 40,
    resizeMode: "contain",
    ...mb32,
  },
  giftThoughtfully: {
    ...fontsize24,
    textAlign: "center",
    fontFamily: FONT.Gilroy,
    color: COLORS.gray,
    // ...mb32
  },
  mt32: {
    ...mt32,
  },
  passwordShow: {
    width: 20,
    height: 20,
  },
  passwordShowInput: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
  },
  passwordShowIcon: {
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 8,
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  googleFb: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  authPage: {
    height: "100%",
    paddingBottom: 64,
    position: "relative",
    // backgroundColor: 'blue'
  },
  rowEnd: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  BgColorWhite: {
    backgroundColor: COLORS.Secondary,
  },
  Right: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  p32: {
    ...p32,
  },
  p16: {
    padding: 16,
  },
  p24: {
    padding: 24,
  },
  p8: {
    padding: 8,
  },
  centerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  Row: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomBarImg: {
    width: 34,
    height: 34,
  },
  ProfileImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  showProfileImage: {
    width: 44,
    height: 44,
    borderRadius: 40,
  },
  userName: {
    ...fontsize24,
    paddingLeft: 16,
    fontWeight: "600",
    fontFamily: FONT.NotoSans,
  },
  textUpperCase: {
    textTransform: "uppercase",
  },
  imgIconSize: {
    height: 24,
    width: 24,
  },
  txtFrienduserName: {
    ...fontsize16,
    paddingLeft: 16,
    fontFamily: FONT.Gilroy,
  },
  topLeftRightpadding50: {
    paddingTop: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
  toppadding16: {
    paddingTop: 16,
  },
  pb16: {
    paddingBottom: 16,
  },
  alignItemsBaseLine: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  center: {
    alignItems: "center",
  },
  height: {
    height: "100%",
  },
  Windowwidth: {
    width: WindowWidth,
  },
  WindowHeight: {
    height: WindowHeight,
  },
  ScreenWidth: {
    width: ScreenWidth,
  },
  ScreenHeight: {
    height: ScreenHeight,
  },
  popupImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
  modulePopupImage: {
    width: 52,
    height: 52,
    borderRadius: 40,
  },
  MainScreen: {
    position: "relative",
    paddingTop: 70,
    paddingBottom: 64,
  },
  BottomContent: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },
  pt16: {
    paddingTop: 16,
  },
  RowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgProfileBackground: {
    width: "105%",
    height: "100%",
    resizeMode: "cover",
  },
  imgmask: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: 400,
    // backgroundColor: "red",
  },
  imgmaskbg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    width: "100%",
    height: 400,
  },
  ProfileToolbarbg: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  popupProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
  PopModalWidth60: {
    width: "60%",
  },
  PopModalWidth100: {
    width: "100%",
  },
  txtErrorMessage: {
    fontFamily: FONT.Gilroy,
    ...fontsize14,
    color: COLORS.red,
  },
  ContainerCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  MainPopStyle: {
    maxHeight: "60%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "50%",
    //marginTop: "25%",
    //marginBottom: "25%",
    // backgroundColor: "red",
    paddingBottom: 50,
    paddingTop: 50,
    //overflow: "hidden",
  },
  HiddenPopStyle: {
    //overflow: "hidden",
    //paddingBottom: "10%",
  },
  paddingBottom20: {
    paddingBottom: 20,
  },
});
