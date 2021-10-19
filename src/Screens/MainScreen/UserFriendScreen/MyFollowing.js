import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
  ScrollView,
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
import { fontsize14 } from "../../../Assets/Style/CommonStyle";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { useActions } from "../../../redux/actions";
import { useSelector } from "react-redux";

const MyFollowing = ({ route, navigation }) => {
  const { UserFollowingFriendId, isMyProfile } = route.params;
  console.log("=========== UserFollowingFriend Id ===============");
  console.log("MyFollowing  ====>", UserFollowingFriendId);
  const userData = useSelector((state) => state.session);

  const {
    getUserFollowingFriendList,
    getUnfollowFriendList,
    getUserFollowingList,
  } = useActions();

  const [getLoader, setLoader] = useState(false);
  const [getUserFollowing, setUserFollowing] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const getDataFollowing = async (isLoad) => {
    setLoader(isLoad);
    if (isMyProfile) {
      const { UserFollowingListResponse, UserFollowingListError } =
        await getUserFollowingList();
      if (UserFollowingListResponse.data.StatusCode == "1") {
        console.log("user Follower Response  ===>", UserFollowingListResponse);
        setUserFollowing(UserFollowingListResponse.data.Result);
        setLoader(false);
      } else {
        setLoader(false);
        console.log("user Follower List Error ===>", UserFollowingListError);
      }
    } else {
      if (userData.userId == UserFollowingFriendId) {
        const { UserFollowingListResponse, UserFollowingListError } =
          await getUserFollowingList();
        if (UserFollowingListResponse.data.StatusCode == "1") {
          console.log(
            "user Follower Response  ===>",
            UserFollowingListResponse
          );
          setUserFollowing(UserFollowingListResponse.data.Result);
          setLoader(false);
        } else {
          setLoader(false);
          console.log("user Follower List Error ===>", UserFollowingListError);
        }
      } else {
        const { userFriendListResponse, userFriendListError } =
          await getUserFollowingFriendList(UserFollowingFriendId);
        if (userFriendListResponse.data.StatusCode == "1") {
          console.log("user Follower Response  ===>", userFriendListResponse);
          setUserFollowing(userFriendListResponse.data.Result);
          setLoader(false);
        } else {
          setLoader(false);
          console.log("user Follower List Error ===>", userFriendListError);
        }
      }
    }
  };

  const onRefresh = React.useCallback(async () => {
    getDataFollowing(true);
  }, [refreshing]);

  const getUserFollowingLists = async (isLoad) => {
    getDataFollowing(isLoad);
  };
  useEffect(async () => {
    getUserFollowingLists(true);
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserFollowingLists(false);
    });
  }, []);

  const UnFollowFriend = async (Id) => {
    console.log("RemoveFriend", Id);

    setLoader(true);
    const { UnfollowFriendListResponse, UnfollowFriendListError } =
      await getUnfollowFriendList(Id);
    const { UserFollowingListResponse, UserFollowingListError } =
      await getUserFollowingList();
    if (
      UnfollowFriendListResponse.data.StatusCode == "1" &&
      UserFollowingListResponse.data.StatusCode == "1"
    ) {
      setUserFollowing(UnfollowFriendListResponse.data.Result);
      setLoader(false);
    } else {
      console.log("Remove Friend Error", UnfollowFriendListError);
      console.log("user Follower List Error", UserFollowingListError);
      setLoader(false);
    }
  };

  const selectFriend = (item) => {
    navigation.push("UserFriendProfile", {
      userID: isMyProfile
        ? item.following_user_id
        : item.following_user_id
        ? item.following_user_id
        : item.friend_following_user_id,
      MyProfileData: item.is_my_profile,
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

          {Data.item.is_my_profile == "1" ? (
            <View />
          ) : (
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
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <SafeAreaView>
        <View Style={[CommonStyle.Container]}>
          <View style={UserFriendScreenStyle.backgroundColor}>
            {!getUserFollowing.length ? (
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
                    {AppString.currentlyAnyonefollowing}
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
                data={getUserFollowing}
                renderItem={(Data, index) => RenderItem(Data, index)}
                keyExtractor={(item) => item.id}
                // refreshControl={
                //   <RefreshControl
                //     refreshing={refreshing}
                //     onRefresh={onRefresh}
                //   />
                // }
              />
            )}
          </View>
        </View>
        <Spinner visible={getLoader} />
      </SafeAreaView>
    </View>
  );
};

export default MyFollowing;
