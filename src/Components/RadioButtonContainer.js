import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import RadioButton from "../Components/RadioButton";
import TutorialStyle from "../Screens/Signup/Tutorial/TutorialStyle";

export default function RadioButtonContainer({ values, onPress }) {
  const [currentSelectedItem, setCurrentSelectedItem] = useState(null);

  const _onPress = (idx, momentId) => {
    onPress(idx, momentId);
    setCurrentSelectedItem(idx, momentId);
  };

  const _renderRadioButtons = () => {
    return (values || []).map((listItem, idx) => {
      let isChecked = currentSelectedItem === idx ? true : false;
      return idx < 4 ? (
        <RadioButton
          key={idx}
          onRadioButtonPress={() => _onPress(idx, listItem.special_moment_id)}
          // onRadioButtonPress={() => _onPress(listItem.special_moment_name)}
          isChecked={isChecked}
          text={listItem.special_moment_name}
        />
      ) : null;
    });
  };
  return (
    <View style={[TutorialStyle.inputWrapper, TutorialStyle.flexWrap]}>
      {_renderRadioButtons()}
    </View>
  );
}
