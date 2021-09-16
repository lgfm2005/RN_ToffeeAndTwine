import * as React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Screen
import Slider from '../Screens/Signup/Silder/Slider'
import MainScreen from '../Screens/MainScreen'
import Signup from '../Screens/Signup/Signup'
import TutorialFirst from '../Screens/Signup/Tutorial/TutorialFirst'
import TutorialSecond from '../Screens/Signup/Tutorial/TutorialSecond'
import TutorialThird from '../Screens/Signup/Tutorial/TutorialThird'
import SignIn from '../Screens/Signup/SignIn'
import SetPassword from '../Screens/Signup/SetPassword'
import ForgotPassword from '../Screens/Signup/ForgotPassword'

// After Login
import Navigation from '../Screens/Navigation/Navigation'
import HomeScreen from '../Screens/MainScreen/HomeScreen'

const Stack = createStackNavigator();

const Auth = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }} >
                {/* <Stack.Screen name="Slider" component={Slider} /> */}

                <Stack.Screen name="MainScreen" component={MainScreen} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="TutorialFirst" component={TutorialFirst} />
                <Stack.Screen name="TutorialSecond" component={TutorialSecond} />
                <Stack.Screen name="TutorialThird" component={TutorialThird} />
                <Stack.Screen name="SetPassword" component={SetPassword} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

                <Stack.Screen name="Navigation" component={Navigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Auth