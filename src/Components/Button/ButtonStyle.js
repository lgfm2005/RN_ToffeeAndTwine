import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import CommonStyle, {
  fontsize14,
  fontsize16,
  fontsize20,
} from "../../Assets/Style/CommonStyle";

import { COLORS } from "../../Assets/utils/COLORS";
import { FONT } from "../../Assets/utils/FONT";

export const BaseButton = {
  width: "100%",
  height: 50,
  borderRadius: 50 / 2,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
  // ...CommonStyle.mb32
  marginBottom: 12,
};

export const BaseButtonText = {
  ...fontsize20,
  fontFamily: FONT.Gilroy,
  textTransform: "uppercase",
};

export const POPLinkButtonStyle = {
  width: 134,
  height: 48,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
};
export const POPLinkButtonText = {
  ...fontsize16,
  fontFamily: FONT.Gilroy,
  textTransform: "uppercase",
};

export const Smallbtn = {
  width: 90,
  height: 30,
  marginBottom: 0,
};
export const Mediumbtn = {
  width: 90,
  height: 40,
  marginBottom: 0,
};

export const FrinedFilledButtonStyle = {
  width: 100,
  height: 45,
  borderRadius: 30,
  borderWidth: 1,
  justifyContent: "center",
  alignItems: "center",
};
export const FrinedFilledButtonText = {
  ...fontsize14,
  textTransform: "uppercase",
};

export const ButtonStyle = StyleSheet.create({
  // Black
  FilledButton: {
    ...BaseButton,
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Primary,
  },
  buttonDisabled: {
    ...BaseButton,
    borderColor: COLORS.PrimaryLight,
    backgroundColor: COLORS.PrimaryLight,
  },
  buttonEnabled: {
    ...BaseButton,
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Primary,
  },
  FilledButtonText: {
    ...BaseButtonText,
    color: COLORS.Secondary,
  },
  // White
  OutLinedButtonStyle: {
    ...BaseButton,
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Secondary,
  },
  OutLinedButtonText: {
    ...BaseButtonText,
    color: COLORS.black,
  },

  // Black pop
  popFilledButtonStyle: {
    ...POPLinkButtonStyle,
    borderColor: COLORS.Primary,
    backgroundColor: COLORS.Primary,
  },

  popFilledButtonText: {
    ...POPLinkButtonText,
    color: COLORS.Secondary,
  },

  // White pop
  popOutlineButtonStyle: {
    ...POPLinkButtonStyle,
    borderColor: COLORS.Secondary,
  },
  popOutlineButtonText: {
    ...POPLinkButtonText,
    color: COLORS.Primary,
  },
});
