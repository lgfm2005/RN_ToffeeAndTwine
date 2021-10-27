import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Platform, Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

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
import DynamicTabView from "react-native-top-tabs";
const size = Dimensions.get("window").width;

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

const NavNotificationScreen = ({ route }) => {
  const { notificationTabEvent } = useActions();
  const navigation = useNavigation();

  var notifactionTabEvent = useSelector((state) => state.notifactionTabEvent);
  const [isGift, setisGiftTab] = useState(
    notifactionTabEvent.isGiftTab == false ? false : true
  );

  useEffect(() => {
    if (notifactionTabEvent.isGiftTab == false) {
      setisGiftTab(false);
      notificationTabEvent(true);
    }
  }, [notifactionTabEvent.isGiftTab]);

  const renderTab = (item, index) => {
    if (index == 0) {
      return <Gifting navigation={navigation} />;
    }
    if (index == 1) {
      return <UpcomingMomentScreen navigation={navigation} />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        // backgroundColor: COLORS.Secondary,
        backgroundColor: "black",
      }}
    >
      <NotificationToolbar />
      {Platform.OS === "ios" ? (
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
          <Tab.Screen
            name="Upcoming Moments"
            component={UpcomingMomentScreen}
          />
        </Tab.Navigator>
      ) : (
        <DynamicTabView
          data={[
            { title: "Gifting", key: "Gifting" },
            { title: "Upcoming Moments", key: "Upcoming Moments" },
          ]}
          renderTab={renderTab}
          // onChangeTab={onChangeTab}
          defaultIndex={isGift == true ? 1 : 0}
          containerStyle={{ width: size, padding: 0 }}
          headerBackgroundColor={"white"}
          headerUnderlayColor={"gray"}
          headerTextStyle={{
            color: "black",
            width: size / 2.5,
            textAlign: "center",
            bottom: 5,
          }}
        />
      )}
    </View>
  );
};

export default NavNotificationScreen;
