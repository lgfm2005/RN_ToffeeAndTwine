import * as React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Lib
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS } from "../../../Assets/utils/COLORS";

// Asset
import MyFollowers from "./MyFollowers";
import MyFollowing from "./MyFollowing";
import { UserFriendsToolbar } from "../../../Components/UserFriendsToolbar/UserFriendsToolbar";

const Tab = createMaterialTopTabNavigator();

const NavUserFriendScreen = ({ navigation, route }) => {
  var isFollowings = false;
  if (route.params) {
    const { isFollowing } = route.params;
    isFollowings = isFollowing;
    // isUserFollowerFriendIds = isUserFollowerFriendId;
    // isUserFollowingFriendIds = isUserFollowingFriendId;
    // debugger;
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
      <UserFriendsToolbar
        onPressBack={() => navigation.goBack()}
        onPressSearch={() => navigation.navigate("Search")}
      />
      <Tab.Navigator
        initialRouteName={isFollowings == true ? "MyFollowing" : "MyFollowers"}
        screenOptions={{
          tabBarActiveTintColor: COLORS.Primary,
          tabBarInactiveTintColor: COLORS.PrimaryLight,
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.Primary,
          },
          borderTopWidth: 0,
        }}
      >
        <Tab.Screen
          name="MyFollowers"
          component={MyFollowers}
          initialParams={{
            UserFollowerFriendId: route.params.isUserFollowerFriendId,
          }}
        />

        <Tab.Screen
          name="MyFollowing"
          component={MyFollowing}
          initialParams={{
            UserFollowingFriendId: route.params.isUserFollowingFriendId,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default NavUserFriendScreen;
