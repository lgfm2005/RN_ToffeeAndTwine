import * as React from "react";
import { Text, View, StyleSheet, StatusBar, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

// Lib
import { getStatusBarHeight } from "react-native-status-bar-height";
import { COLORS } from "../../../Assets/utils/COLORS";

// Asset
import MyFollowers from "./MyFollowers";
import MyFollowing from "./MyFollowing";
import { UserFriendsToolbar } from "../../../Components/UserFriendsToolbar/UserFriendsToolbar";
import { useNavigation } from "@react-navigation/native";

import DynamicTabView from "react-native-top-tabs";
const size = Dimensions.get("window").width;

const Tab = createMaterialTopTabNavigator();

const NavUserFriendScreen = ({ route }) => {
  const navigation = useNavigation();

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

  const renderTab = (item, index) => {
    if (index == 0) {
      return (
        <MyFollowers
          navigation={navigation}
          UserFollowerFriendId={route.params.isUserFollowerFriendId}
          isMyProfile={route.params.isMyProfile}
          initialParams={{
            UserFollowerFriendId: route.params.isUserFollowerFriendId,
            isMyProfile: route.params.isMyProfile,
          }}
        />
      );
    }
    if (index == 1) {
      return (
        <MyFollowing
          navigation={navigation}
          UserFollowingFriendId={route.params.isUserFollowingFriendId}
          isMyProfile={route.params.isMyProfile}
          initialParams={{
            UserFollowingFriendId: route.params.isUserFollowingFriendId,
            isMyProfile: route.params.isMyProfile,
          }}
        />
      );
    }
  };

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
          }}
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
      ) : (
        // <Tab.Navigator
        //   initialRouteName={isFollowings == true ? "Following" : "Followers"}
        //   screenOptions={{
        //     tabBarActiveTintColor: COLORS.Primary,
        //     tabBarInactiveTintColor: COLORS.PrimaryLight,
        //     tabBarIndicatorStyle: {
        //       backgroundColor: COLORS.Primary,
        //     },
        //     borderTopWidth: 0,
        //   }}
        // >
        //   <Tab.Screen
        //     name="Followers"
        //     component={MyFollowers}
        //     initialParams={{
        //       UserFollowerFriendId: route.params.isUserFollowerFriendId,
        //       isMyProfile: route.params.isMyProfile,
        //     }}
        //   />

        //   <Tab.Screen
        //     name="Following"
        //     component={MyFollowing}
        //     initialParams={{
        //       UserFollowingFriendId: route.params.isUserFollowingFriendId,
        //       isMyProfile: route.params.isMyProfile,
        //     }}
        //   />
        // </Tab.Navigator>
        <DynamicTabView
          data={[
            { title: "Followers", key: "Followers" },
            { title: "Following", key: "Following" },
          ]}
          renderTab={renderTab}
          // onChangeTab={onChangeTab}
          defaultIndex={isFollowings == true ? 1 : 0}
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

export default NavUserFriendScreen;
