import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

import { COLORS } from '../../Assets/utils/COLORS';
import { TopBarToffeeTwineLogo, imgSettings } from '../../Assets/utils/Image';
import { ToolbarMainStyle } from './ToolbarMainStyle';


export const ToolbarMain = ({ onPress }) => {
    return (
        <View style={[ToolbarMainStyle.background]}>
            <Image source={TopBarToffeeTwineLogo} style={ToolbarMainStyle.TopBarToffeeTwineLogo} />
            <TouchableOpacity onPress={onPress}>
                <Image source={imgSettings} style={ToolbarMainStyle.icon} />
            </TouchableOpacity>
        </View>
    )
}