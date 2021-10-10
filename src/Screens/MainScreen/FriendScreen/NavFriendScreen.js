import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Lib
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS } from "../../../Assets/utils/COLORS";

// Asset
import Followers from "./Followers";
import Following from "./Following";
import FriendFollowersList from "./FriendFollowersList";
import Invite from "./Invite";
import { FriendsToolbar } from "../../../Components/FriendsToolbar/FriendsToolbar";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";

const Tab = createMaterialTopTabNavigator();

const NavFriendScreen = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: getStatusBarHeight(),
        backgroundColor: COLORS.Secondary,
        // backgroundColor: "red",
      }}
    >
      <FriendsToolbar onPress={() => navigation.navigate("Search")} />
      <Tab.Navigator
        initialRouteName={"Followers"}
        screenOptions={{
          tabBarActiveTintColor: COLORS.Primary,
          tabBarInactiveTintColor: COLORS.PrimaryLight,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.Primary,
          },
          borderTopWidth: 0,
          // tabBarOptions: {
          //     upperCaseLabel: false,
          // },
        }}
      >
        {/* <Tab.Screen
          name="FriendFollowersList"
          component={FriendFollowersList}
        /> */}
        <Tab.Screen name="Followers" component={Followers} />
        <Tab.Screen name="Following" component={Following} />
        <Tab.Screen name="Invite" component={Invite} />
      </Tab.Navigator>
    </View>
  );
};

export default NavFriendScreen;
