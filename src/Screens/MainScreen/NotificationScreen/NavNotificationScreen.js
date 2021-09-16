import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Lib
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { COLORS } from '../../../Assets/utils/COLORS';

// Asset
import Gifting from './Gifting';
import UpcomingMoments from './UpcomingMoments';
import UpcomingUpGrade from './UpcomingUpGrade';
import UpComingThankyou from './UpComingThankyou';
import { NotificationToolbar } from '../../../Components/NotificationToolbar/NotificationToolbar';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function UpcomingMomentScreen() {
    return (
        <Stack.Navigator
            initialRouteName="UpcomingMoments"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="UpcomingMoments"
                component={UpcomingMoments}
            />
            <Stack.Screen
                name="UpcomingUpGrade"
                component={UpcomingUpGrade}
            />
            <Stack.Screen
                name="UpComingThankyou"
                component={UpComingThankyou}
            />

        </Stack.Navigator>
    );
}

const NavNotificationScreen = () => {
    return (
        <View style={{
            flex: 1,
            paddingTop: getStatusBarHeight(),
            backgroundColor: COLORS.Primary,
        }}>
            <NotificationToolbar />
            <Tab.Navigator
                initialRouteName={'Gifting'}
                screenOptions={{
                    tabBarActiveTintColor: COLORS.Primary,
                    tabBarInactiveTintColor: COLORS.PrimaryLight,
                    tabBarIndicatorStyle: {
                        backgroundColor: COLORS.Primary
                    },

                }}>
                <Tab.Screen name="Gifting" component={Gifting} />
                <Tab.Screen name="UpcomingMoment" component={UpcomingMomentScreen} />
            </Tab.Navigator>
        </View >
    );
}

export default NavNotificationScreen