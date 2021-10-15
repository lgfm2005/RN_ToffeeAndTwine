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
import { useSelector } from "react-redux";

const MyFollowers = ({ route, navigation }) => {
  const { UserFollowerFriendId, isMyProfile } = route.params;
  const userData = useSelector((state) => state.session);

  console.log("=========== UserFollowerFriendId ===============");
  console.log(
    "MyFollowers  isMyProfile ====>",
    UserFollowerFriendId,
    isMyProfile
  );
  // API get User Following Friend List
  const {
    getUserFriendFollowerList,
    getUserFollowerList,
    RemoveFollowerFriend,
  } = useActions();

  const [getLoader, setLoader] = useState(false);
  const [getUserFollower, setUserFollower] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // setLoader(true);
    const { userFriendListResponse, userFriendListError } =
      await getUserFollowerList();
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
  const onGetFollowerList = async (isLoad) => {
    setLoader(isLoad);
    if (isMyProfile) {
      const { userFollowerListResponse, userFollowerListError } =
        await getUserFollowerList();
      if (userFollowerListResponse.data.StatusCode == "1") {
        console.log("user Follower Response  ===>", userFollowerListResponse);
        setUserFollower(userFollowerListResponse.data.Result);
        setLoader(false);
      } else {
        setLoader(false);
        console.log("user Follower List Error ===>", userFollowerListError);
      }
    } else {
      if (userData.userId == UserFollowerFriendId) {
        const { userFollowerListResponse, userFollowerListError } =
          await getUserFollowerList();
        if (userFollowerListResponse.data.StatusCode == "1") {
          console.log("user Follower Response  ===>", userFollowerListResponse);
          setUserFollower(userFollowerListResponse.data.Result);
          setLoader(false);
        } else {
          setLoader(false);
          console.log("user Follower List Error ===>", userFollowerListError);
        }
      } else {
        const { userFriendListResponse, userFriendListError } =
          await getUserFriendFollowerList(UserFollowerFriendId);
        if (userFriendListResponse.data.StatusCode == "1") {
          console.log("user Follower Response  ===>", userFriendListResponse);
          setUserFollower(userFriendListResponse.data.Result);
          setLoader(false);
        } else {
          setLoader(false);
          console.log("user Follower List Error ===>", userFriendListError);
        }
      }
    }
  };

  const getUserFollowersList = async (isLoad) => {
    onGetFollowerList(isLoad);
  };

  useEffect(async () => {
    getUserFollowersList(true);
  }, []);

  useEffect(() => {
    navigation.addListener("focus", () => {
      getUserFollowersList(false);
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
    navigation.push("UserFriendProfile", {
      userID: isMyProfile
        ? item.follower_user_id
        : item.follower_user_id
        ? item.follower_user_id
        : item.friend_follower_user_id,
      isMyProfile: false,
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
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default MyFollowers;
