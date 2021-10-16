import React from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import CommonStyle from "../../Assets/Style/CommonStyle";

import { ButtonStyle } from "../../Components/Button/ButtonStyle";

export const FilledButton = ({
  buttonName,
  styleBtn,
  fontStyle,
  onPress,
  btncheck,
  btnabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={btnabled == "" ? true : false}
    >
      <View>
        <View
          style={[
            ButtonStyle.FilledButton,
            styleBtn,
            btncheck == ""
              ? ButtonStyle.buttonDisabled
              : ButtonStyle.buttonEnabled,
          ]}
        >
          <Text style={[ButtonStyle.FilledButtonText, fontStyle]}>
            {buttonName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const OutLinedButton = ({ buttonName, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={[ButtonStyle.OutLinedButtonStyle, { marginBottom: 32 }]}>
          <Text style={ButtonStyle.OutLinedButtonText}>{buttonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const POPLinkButton = ({
  buttonName,
  onPress,
  styleBtn,
  fontStyle,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={[ButtonStyle.popFilledButtonStyle, styleBtn]}>
          <Text style={[ButtonStyle.popFilledButtonText, fontStyle]}>
            {buttonName}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const POPOutLinkButton = ({ buttonName, onPress, ...props }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View style={ButtonStyle.popOutlineButtonStyle}>
          <Text style={ButtonStyle.popOutlineButtonText}>{buttonName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ImagePOPLinkButton = ({
  buttonName,
  buttonImage,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <View
          style={[ButtonStyle.popFilledButtonStyle, { flexDirection: "row" }]}
        >
          <Text style={ButtonStyle.popFilledButtonText}>{buttonName}</Text>
          {buttonImage && (
            <Image
              source={buttonImage}
              style={[CommonStyle.imgIconSize, { marginLeft: 10 }]}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
