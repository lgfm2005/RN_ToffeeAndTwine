import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CommonStyle from '../../Assets/Style/CommonStyle';
import { AppString } from '../../Assets/utils/AppString';
import { COLORS } from '../../Assets/utils/COLORS';
import { imgSearch } from '../../Assets/utils/Image';
import { NotificationToolbarStyle } from './NotificationToolbarStyle';

// Asset

export const NotificationToolbar = ({ onPress, ImageIcon }) => {
    return (
        <View style={[CommonStyle.Container, NotificationToolbarStyle.TopToolBar]}>
            <Text style={CommonStyle.txtTitle}>{AppString.Notifications}</Text>
            <TouchableOpacity onPress={onPress}>
                <Image source={ImageIcon} style={CommonStyle.imgIconSize} />
            </TouchableOpacity>
        </View>
    )
}

