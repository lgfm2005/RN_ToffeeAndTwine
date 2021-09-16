import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { COLORS } from '../Assets/utils/COLORS';

const NotBorderBlackButton = ({ buttonName, onPress, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.Container}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>{buttonName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default NotBorderBlackButton;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
    },
    buttonStyle: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: COLORS.Secondary,
        flexDirection: 'column',
        justifyContent: 'center'

    },
    buttonText: {
        color: COLORS.Primary,
        fontSize: 20,
        textAlign: 'center'
    }
})