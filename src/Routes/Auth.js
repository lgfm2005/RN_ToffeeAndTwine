import * as React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Screen
import Slider from "../Screens/Signup/Silder/Slider";
import MainScreen from "../Screens/MainScreen";
import Signup from "../Screens/Signup/Signup";
import TutorialFirst from "../Screens/Signup/Tutorial/TutorialFirst";
import TutorialSecond from "../Screens/Signup/Tutorial/TutorialSecond";
import TutorialThird from "../Screens/Signup/Tutorial/TutorialThird";
import SignIn from "../Screens/Signup/SignIn";
import SetPassword from "../Screens/Signup/SetPassword";
import ForgotPassword from "../Screens/Signup/ForgotPassword";

// After Login
import Navigation from "../Screens/Navigation/Navigation";
import HomeScreen from "../Screens/MainScreen/HomeScreen";
import FlashMessage from "react-native-flash-message";

const Stack = createStackNavigator();
import { useDispatch, useSelector } from "react-redux";

const Auth = () => {
  const sessions = useSelector((state) => state.session);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        initialRouteName={sessions ? "Navigation" : "MainScreen"}
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="Slider" component={Slider} /> */}

        <Stack.Screen
          name={sessions.isAutoLogin ? "Navigation" : "MainScreen"}
          component={sessions.isAutoLogin ? Navigation : MainScreen}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="TutorialFirst" component={TutorialFirst} />
        <Stack.Screen name="TutorialSecond" component={TutorialSecond} />
        <Stack.Screen name="TutorialThird" component={TutorialThird} />
        <Stack.Screen name="SetPassword" component={SetPassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
      <FlashMessage
        autoHide={true}
        position="top"
        icon="auto"
        duration={4000}
      />
    </NavigationContainer>
  );
};

export default Auth;
