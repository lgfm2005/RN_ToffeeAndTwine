import React, { useRef, useState, useEffect } from "react";
import { Text, View, Dimensions, Platform } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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

import DynamicTabView from "react-native-top-tabs";
const size = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();

const NavFriendScreen = ({ route }) => {
  const navigation = useNavigation();

  var isFollowings = false;
  var usename = "";
  if (route.params) {
    const { isFollowing, isUserFollowerFriendId, Usename } = route.params;
    isFollowings = isFollowing;
    usename = Usename;
    console.log("isFollowings::", isFollowings);
    // isUserFollowerFriendIds = isUserFollowerFriendId;
    // isUserFollowingFriendIds = isUserFollowingFriendId;
  }

  const renderTab = (item, index) => {
    if (index == 0) {
      return <Followers navigation={navigation} />;
    }
    if (index == 1) {
      return <Following navigation={navigation} />;
    }
    if (index == 2) {
      return <Invite />;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        paddingTop: getStatusBarHeight(),
        // backgroundColor: COLORS.Secondary,
        backgroundColor: "black",
      }}
    >
      <FriendsToolbar onPress={() => navigation.navigate("Search")} />
      {Platform.OS === "ios" ? (
        <Tab.Navigator
          initialRouteName={isFollowings == true ? "Following" : "Followers"}
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
          backBehavior={"order"}
        >
          <Tab.Screen
            name="FriendFollowersList"
            component={FriendFollowersList}
          />
          <Tab.Screen name="Followers" component={Followers} />
          <Tab.Screen name="Following" component={Following} />
          <Tab.Screen name="Invite" component={Invite} />
        </Tab.Navigator>
      ) : (
        <DynamicTabView
          data={[
            { title: "Followers", key: "Followers" },
            { title: "Following", key: "Following" },
            { title: "Invite", key: "Invite" },
          ]}
          renderTab={renderTab}
          // onChangeTab={onChangeTab}
          defaultIndex={isFollowings == true ? 1 : 0}
          containerStyle={{ width: size, padding: 0 }}
          headerBackgroundColor={"white"}
          headerUnderlayColor={"gray"}
          headerTextStyle={{
            color: "black",
            width: size / 4,
            textAlign: "center",
            bottom: 5,
          }}
        />
      )}
    </View>
  );
};

export default NavFriendScreen;
