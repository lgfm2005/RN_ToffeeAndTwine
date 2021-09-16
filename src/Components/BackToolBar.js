import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import { COLORS } from '../Assets/utils/COLORS';
import { FONT } from '../Assets/utils/FONT';

const BackToolBar = ({ titleName, ImageLink, onPressImage, onPressText, ...props }) => {
    return (
        <View style={styles.Container}>
            <TouchableOpacity onPress={onPressImage}>
                <Image source={ImageLink} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressText}>
                <Text style={{ color: COLORS.gray, fontFamily: FONT.Gilroy }}>{titleName}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BackToolBar;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
        alignItems: 'center'
    },
})