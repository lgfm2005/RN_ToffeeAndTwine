import React, { Component, } from 'react';
import { AppRegistry, StyleSheet, View, StatusBar, Platform, SafeAreaView } from 'react-native';
import { COLORS } from '../../Assets/utils/COLORS';

const DarkTheme = ({ backgroundColor, ...props }) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
        <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </SafeAreaView>
    </View>
);

export const MyBlackStatusbar = (backgroundColor) => {
    return (
        <View style={styles.container}>
            <DarkTheme backgroundColor={backgroundColor} barStyle="light-content" />
            <View style={styles.appBar} />
            <View style={styles.content} />
        </View>
    );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 50 : 56;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
    appBar: {
        backgroundColor: COLORS.Primary,
        height: APPBAR_HEIGHT,
    },
    content: {
        flex: 1,
        backgroundColor: COLORS.Primary,
    },
});
