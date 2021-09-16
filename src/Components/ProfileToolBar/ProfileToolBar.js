import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import CommonStyle from '../../Assets/Style/CommonStyle';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '../../Assets/utils/COLORS';
import { imgLeftBack } from '../../Assets/utils/Image';
import { ProfileToolBarStyle } from './ProfileToolBarStyle';


export const ProfileToolBar = ({ onLeftPress, ScreenName, onRightPress }) => {
    return (
        <LinearGradient colors={['#00000000', '#FFFFFF']} style={ProfileToolBarStyle.linearGradient}>
            {/* <View style={ProfileToolBarStyle.background}> */}
            {/* <TouchableOpacity onPress={onLeftPress}>
                    <Image source={imgLeftBack} style={ProfileToolBarStyle.icon} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={CommonStyle.txtTitle}>{ScreenName}</Text>
                </View>
                <TouchableOpacity onPress={onRightPress}>
                    <Image source={imgLeftBack} style={ProfileToolBarStyle.icon} />
                </TouchableOpacity> */}
            {/* </View> */}
        </LinearGradient>
    )
}