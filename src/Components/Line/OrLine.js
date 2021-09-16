import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

import { COLORS } from '../../Assets/utils/COLORS';
import { OrLineStyle } from './OrLineStyle';

export const OrLine = ({ LineName }) => {
    return (
        <View style={OrLineStyle.Linebg}>
            <View style={OrLineStyle.Separator} />
            <View>
                <Text style={OrLineStyle.Separatortxt}>{LineName}</Text>
            </View>
            <View style={OrLineStyle.Separator} />
        </View>
    )
}