import { wrap } from "lodash";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Linking,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import CommonStyle from "../Assets/Style/CommonStyle";

import { COLORS } from "../Assets/utils/COLORS";
import { FONT } from "../Assets/utils/FONT";
import { imgEye, imgEyeOff } from "../Assets/utils/Image";
function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.#?&//=]*)/g
  );
  return res !== null;
}
export const OpenBrowserLink = (UrlLink) => {
  console.log("https url 1 ==> ", UrlLink, isValidURL(UrlLink));
  if (isValidURL(UrlLink)) {
    if (UrlLink.startsWith("http://") || UrlLink.startsWith("http://"))
      Linking.openURL(UrlLink);
    else Linking.openURL("http://" + UrlLink);
  } else Linking.openURL("https://www.google.com/search?q=" + UrlLink);
};

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

export const FullFormInput = ({
  buttonName,
  textChange,
  value,
  onRef,
  ...props
}) => {
  return (
    <TextInput
      style={CommonStyle.formControl}
      placeholder={buttonName}
      onChangeText={textChange}
      value={value}
      selectionColor={COLORS.Primary}
      placeholderTextColor={COLORS.PrimaryLight}
      ref={onRef}
      {...props}
    />
  );
};

export const SimpleInputEditView = ({
  TitleName,
  buttonName,
  textChange,
  value,
  ...props
}) => {
  return (
    <View
      style={[CommonStyle.formSimpletxtEditView, { alignItems: "stretch" }]}
    >
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      <TextInput
        style={[CommonStyle.formSimpleEditView]}
        value={value}
        placeholder={buttonName}
        onChangeText={textChange}
        selectionColor={COLORS.Primary}
        color={value != "" ? COLORS.Primary : COLORS.gray}
        placeholderTextColor={COLORS.gray}
        multiline={true}
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
  value,
  Link,
  ...props
}) => {
  return Link ? (
    <View style={[CommonStyle.formSimpletxtEditView]}>
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      {value === "" ? (
        <Text
          style={[
            CommonStyle.formSimpleEditView,
            { color: COLORS.gray, width: "100%" },
          ]}
        >
          {buttonName}
        </Text>
      ) : (
        <View
          style={{ flexDirection: "column", width: "70%", paddingLeft: 16 }}
        >
          <TouchableOpacity onPress={() => OpenBrowserLink(value)}>
            <Text
              // style={CommonStyle.formSimpleEditView}
              placeholder={buttonName}
              value={value}
              selectionColor={COLORS.Primary}
              color={value != "" ? COLORS.Primary : COLORS.gray}
              placeholderTextColor={COLORS.gray}
              editable={false}
            >
              {value}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  ) : (
    <View
      style={[CommonStyle.formSimpletxtEditView, { alignItems: "stretch" }]}
    >
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>

      <TextInput
        style={CommonStyle.formSimpleEditView}
        placeholder={buttonName}
        value={value}
        selectionColor={COLORS.Primary}
        color={value != "" ? COLORS.Primary : COLORS.gray}
        placeholderTextColor={COLORS.gray}
        editable={false}
        multiline={true}
        onPress={onPress}
        {...props}
      />
    </View>
  );
};
export const EditShowBtnSimpleView = ({
  TitleName,
  buttonName,
  buttonCheck,
  onPress,
  ...props
}) => {
  return (
    <View
      style={[
        CommonStyle.formSimpletxtEditView,
        { paddingTop: 10, paddingBottom: 10 },
      ]}
    >
      <Text style={[CommonStyle.formPopUpLabel, { fontFamily: FONT.Gilroy }]}>
        {TitleName}
      </Text>
      <TouchableOpacity onPress={onPress}>
        <View style={{ paddingLeft: 16 }}>
          {buttonCheck == false && buttonName == "Date" ? (
            <Text style={{ color: COLORS.gray }}>{buttonName}</Text>
          ) : (
            <Text style={{ color: COLORS.Primary }}>{buttonName}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
