import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Lib
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS } from "../../../Assets/utils/COLORS";

// Asset
import MyProfile from "../ProfileScreen/MyProfile";
import Gifting from "./Gifting";
import UpcomingMoments from "./UpcomingMoments";
import UpcomingUpGrade from "./UpcomingUpGrade";
import UpComingThankyou from "./UpComingThankyou";
import { NotificationToolbar } from "../../../Components/NotificationToolbar/NotificationToolbar";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
import { useSelector } from "react-redux";
import { useActions } from "../../../redux/actions";

StatusBar.setBarStyle("dark-content", true);

function UpcomingMomentScreen() {
  return (
    <Stack.Navigator
      initialRouteName="UpcomingMoments"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="UpcomingUpGrade" component={UpcomingUpGrade} />
      <Stack.Screen name="UpComingThankyou" component={UpComingThankyou} />
      <Stack.Screen name="UpcomingMoments" component={UpcomingMoments} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
    </Stack.Navigator>
  );
}

const NavNotificationScreen = ({ navigation, route }) => {
  const { notificationTabEvent } = useActions();

  var notifactionTabEvent = useSelector((state) => state.notifactionTabEvent);
  const [isGift, setisGiftTab] = useState(
    notifactionTabEvent.isGiftTab == false ? false : true
  );

  useEffect(() => {
    debugger;
    if (notifactionTabEvent.isGiftTab == false) {
      debugger;
      setisGiftTab(false);
      notificationTabEvent(true);
    }
    debugger;
  }, [notifactionTabEvent.isGiftTab]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: COLORS.Secondary,
      }}
    >
      <NotificationToolbar />
      <Tab.Navigator
        initialRouteName={isGift ? "Gifting" : "Upcoming Moments"}
        screenOptions={{
          tabBarActiveTintColor: COLORS.Primary,
          tabBarInactiveTintColor: COLORS.PrimaryLight,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.Primary,
          },
        }}
      >
        <Tab.Screen name="Gifting" component={Gifting} />
        <Tab.Screen name="Upcoming Moments" component={UpcomingMomentScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default NavNotificationScreen;
