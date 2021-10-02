import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import CommonStyle from "../Assets/Style/CommonStyle";

import { COLORS } from "../Assets/utils/COLORS";
import { FONT } from "../Assets/utils/FONT";
import { imgEye, imgEyeOff } from "../Assets/utils/Image";

export const FormInput = ({
  buttonName,
  textChange,
  onChangeText,
  ...props
}) => {
  return (
    <TextInput
      style={CommonStyle.formControl}
      placeholder={buttonName}
      onChangeText={textChange}
      placeholderTextColor={COLORS.PrimaryLight}
      selectionColor={COLORS.Primary}
      autoCorrect={false}
      {...props}
    />
  );
};

export const ShowFormInput = ({ buttonName, textChange, ...props }) => {
  const [hidePass, setHidePass] = useState(true);

  return (
    <View style={[CommonStyle.formInputGroup]}>
      <View style={{ width: "80%" }}>
        <TextInput
          style={[CommonStyle.formControl, CommonStyle.passwordShowInput]}
          placeholder={buttonName}
          onChangeText={textChange}
          placeholderTextColor={COLORS.PrimaryLight}
          selectionColor={COLORS.Primary}
          secureTextEntry={hidePass ? true : false}
          {...props}
        />
      </View>
      <View style={{ width: "20%" }}>
        <View style={[CommonStyle.formControl, CommonStyle.passwordShowIcon]}>
          <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
            <Image
              source={hidePass ? imgEye : imgEyeOff}
              style={[CommonStyle.passwordShow]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const FullFormInput = ({ buttonName, textChange, ...props }) => {
  return (
    <TextInput
      style={CommonStyle.formControl}
      placeholder={buttonName}
      onChangeText={textChange}
      selectionColor={COLORS.Primary}
      placeholderTextColor={COLORS.PrimaryLight}
      {...props}
    />
  );
};

export const SimpleInputEditView = ({
  TitleName,
  buttonName,
  textChange,
  ...props
}) => {
  return (
    <View style={[CommonStyle.formSimpletxtEditView]}>
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      <TextInput
        style={CommonStyle.formSimpleEditView}
        placeholder={buttonName}
        onChangeText={textChange}
        selectionColor={COLORS.Primary}
        placeholderTextColor={COLORS.PrimaryLight}
        {...props}
      />
    </View>
  );
};
export const EditShowSimpleView = ({
  TitleName,
  buttonName,
  textChange,
  onPress,
  ...props
}) => {
  return (
    <View style={[CommonStyle.formSimpletxtEditView]}>
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      <TextInput
        style={CommonStyle.formSimpleEditView}
        placeholder={buttonName}
        placeholderTextColor={COLORS.PrimaryLight}
        selectionColor={COLORS.Primary}
        editable={false}
        onPress={onPress}
        {...props}
      />
    </View>
  );
};
export const EditShowBtnSimpleView = ({
  TitleName,
  buttonName,
  placeholder,
  onPress,
  ...props
}) => {
  return (
    <View style={[CommonStyle.formSimpletxtEditView]}>
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <View style={{ paddingLeft: 16 }}>
          <Text style={{ color: COLORS.Primary }}>{placeholder}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
