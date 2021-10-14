import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

// Lib
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import CommonStyle, { fontsize12 } from "../../../Assets/Style/CommonStyle";
import { demodp, imgPlaceHolder } from "../../../Assets/utils/Image";
import { AppString, Remove } from "../../../Assets/utils/AppString";
import { FilledButton, POPLinkButton } from "../../../Components/Button/Button";
import { UserFriendScreenStyle } from "./UserFriendScreenStyle";
import { Smallbtn } from "../../../Components/Button/ButtonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { useActions } from "../../../redux/actions";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";

const MyFollowers = ({ route, navigation }) => {
  const { UserFollowerFriendId } = route.params;
  console.log("=========== UserFollowerFriendId ===============");
  console.log("MyFollowers  ====>", UserFollowerFriendId);
  // API get User Following Friend List
  debugger;
  const { getUserFollowingFriendList, RemoveFollowerFriend } = useActions();

  const [getLoader, setLoader] = useState(false);
  const [getUserFollower, setUserFollower] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // setLoader(true);
    const { userFriendListResponse, userFriendListError } =
      await getUserFollowingFriendList(UserFollowerFriendId);
    if (userFriendListResponse.data.StatusCode == "1") {
      console.log("user Follower Response  ===>", userFriendListResponse);
      setUserFollower(userFriendListResponse.data.Result);
      // setLoader(false);
      setRefreshing(false);
    } else {
      setRefreshing(false);
      // setLoader(false);
      console.log("user Follower List Error ===>", userFriendListError);
    }
  }, [refreshing]);

  const getUserFollowers = async () => {
    setLoader(true);
    const { userFriendListResponse, userFriendListError } =
      await getUserFollowingFriendList(UserFollowerFriendId);
    if (userFriendListResponse.data.StatusCode == "1") {
      console.log("user Follower Response  ===>", userFriendListResponse);
      setUserFollower(userFriendListResponse.data.Result);
      setLoader(false);
    } else {
      setLoader(false);
      console.log("user Follower List Error ===>", userFriendListError);
    }
  };

  useEffect(async () => {
    getUserFollowers();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserFollowers();
    });
  }, []);

  const RemoveFriend = async (Id) => {
    console.log("Remove Friend  ====>>>>", Id);

    setLoader(true);
    const { RemoveFriendResponse, RemoveFriendError } =
      await RemoveFollowerFriend(Id);
    const { userFollowerListResponse, userFollowerListError } =
      await getUserFollowerList();
    if (
      RemoveFriendResponse.data.StatusCode == "1" &&
      userFollowerListResponse.data.StatusCode == "1"
    ) {
      setUserFollower(userFollowerListResponse.data.Result);
      setLoader(false);
    } else {
      console.log("Remove Friend Error", RemoveFriendError);
      console.log("user Follower List Error", userFollowerListError);
      setLoader(false);
    }
  };
  const selectFriend = (item) => {
    // console.log("selectFriend", item);
    debugger;
    navigation.navigate("UserFriendProfile", {
      userID: item.follower_user_id,
    });
  };

  const RenderItem = (Data, index) => {
    return (
      <TouchableOpacity onPress={() => selectFriend(Data.item)}>
        <View
          style={[
            CommonStyle.mb16,
            CommonStyle.Container,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <View
            style={[
              UserFriendScreenStyle.followerTxtIcon,
              { width: "70%", paddingRight: 10 },
            ]}
          >
            <Image
              source={
                Data.item.user_profile_image == "" ||
                Data.item.user_profile_image == null ||
                Data.item.user_profile_image == undefined
                  ? imgPlaceHolder
                  : { uri: Data.item.user_profile_image }
              }
              style={CommonStyle.showProfileImage}
            />
            <Text
              style={[
                CommonStyle.txtFrienduserName,
                { flex: 1, flexWrap: "wrap" },
              ]}
            >
              {Data.item.user_fname + " " + Data.item.user_lname}
            </Text>
          </View>
          <View
            style={[
              UserFriendScreenStyle.btnBg,
              { width: "30%", justifyContent: "flex-end" },
            ]}
          >
            <POPLinkButton
              buttonName={AppString.Remove}
              onPress={() => RemoveFriend(Data.item.follower_user_id)}
              styleBtn={Smallbtn}
              fontStyle={fontsize12}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <SafeAreaView>
        <View Style={[CommonStyle.Container, CommonStyle.pt16]}>
          <View style={UserFriendScreenStyle.backgroundColor}>
            {!getUserFollower.length ? (
              // <View style={CommonStyle.ContainerCenter}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <View>
                  <Text style={[CommonStyle.txtContent, { lineHeight: 0 }]}>
                    {AppString.currentlyAnyonefollower}
                  </Text>
                </View>
                <View>
                  <Text style={[CommonStyle.txtContent, { lineHeight: 0 }]}>
                    {AppString.InviteFriends}
                  </Text>
                </View>
              </View>
            ) : (
              <FlatList
                data={getUserFollower}
                renderItem={(Data, index) => RenderItem(Data, index)}
                keyExtractor={(item) => item.id}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            )}
          </View>
        </View>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default MyFollowers;
