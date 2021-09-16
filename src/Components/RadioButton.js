import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CommonStyle from "../Assets/Style/CommonStyle";
import { COLORS } from "../Assets/utils/COLORS";
import { FONT } from "../Assets/utils/FONT";
import TutorialStyle from "../Screens/Signup/Tutorial/TutorialStyle";

export default function RadioButton({ isChecked, text, onRadioButtonPress }) {
    const _renderCheckedView = () => {
        return isChecked ? (
            <View style={[styles.radioactive]} />
        ) : null;
    };

    const classes = [CommonStyle.formControl];
    isChecked ? classes.push(styles.radioactive) : classes;
    const radioButtonTextClasses = isChecked ? styles.radioButtonTextWhite : styles.radioButtonText;

    return (
        <View style={[TutorialStyle.inputHalf]}>
            <TouchableOpacity style={classes} onPress={onRadioButtonPress}>
                <View>
                    <Text style={[radioButtonTextClasses, { fontFamily: FONT.Gilroy }]}>{text}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    radioactive: {
        color: COLORS.white,
        backgroundColor: COLORS.black,
    },
    radioButtonText: {
        textAlign: 'center',
        lineHeight: 30,
        color: COLORS.black,
        fontSize: 16,
    },
    radioButtonTextWhite: {
        textAlign: 'center',
        lineHeight: 30,
        color: COLORS.white,
        fontSize: 16,

    },
});