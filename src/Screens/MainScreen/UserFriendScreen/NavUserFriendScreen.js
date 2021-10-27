import * as React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
  var usename = "";
  if (route.params) {
    const { isFollowing, isUserFollowerFriendId, Usename } = route.params;
    isFollowings = isFollowing;
    usename = Usename;
    console.log("isFollowings::", isFollowings);
    console.log("isUserFollowerFriendId::", isUserFollowerFriendId);
    // isUserFollowerFriendIds = isUserFollowerFriendId;
    // isUserFollowingFriendIds = isUserFollowingFriendId;
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
        usename={
          usename == "" || usename == null || usename == undefined
            ? ""
            : usename + "'s"
        }
        onPressBack={() => navigation.goBack()}
        onPressSearch={() => navigation.navigate("Search")}
      />
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
        type={""}
      >
        <Tab.Screen
          name="Followers"
          component={MyFollowers}
          initialParams={{
            UserFollowerFriendId: route.params.isUserFollowerFriendId,
            isMyProfile: route.params.isMyProfile,
          }}
        />

        <Tab.Screen
          name="Following"
          component={MyFollowing}
          initialParams={{
            UserFollowingFriendId: route.params.isUserFollowingFriendId,
            isMyProfile: route.params.isMyProfile,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default NavUserFriendScreen;
