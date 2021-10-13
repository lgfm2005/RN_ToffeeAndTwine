import * as React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Lib
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS } from "../../../Assets/utils/COLORS";

// Asset
import Followers from "./Followers";
import Following from "./Following";
import { FriendsToolbar } from "../../../Components/FriendsToolbar/FriendsToolbar";

const Tab = createMaterialTopTabNavigator();

const NavUserFriendScreen = ({ navigation, route }) => {
  var isFollowings = false;
  if (route.params) {
    const { isFollowing } = route.params;
    isFollowings = isFollowing;
  }

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
        initialRouteName={isFollowings == true ? "Following" : "Followers"}
        screenOptions={{
          tabBarActiveTintColor: COLORS.Primary,
          tabBarInactiveTintColor: COLORS.PrimaryLight,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.Primary,
          },
          borderTopWidth: 0,
        }}
      >
        <Tab.Screen name="Followers" component={Followers} />
        <Tab.Screen name="Following" component={Following} />
      </Tab.Navigator>
    </View>
  );
};

export default NavUserFriendScreen;
