import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
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
import { FriendScreenStyle } from "./FriendScreenStyle";
import { Smallbtn } from "../../../Components/Button/ButtonStyle";
import { fontsize14 } from "../../../Assets/Style/CommonStyle";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { useActions } from "../../../redux/actions";

const Following = ({ navigation }) => {
  const { getUnfollowFriendList, getUserFollowingList } = useActions();

  const [getLoader, setLoader] = useState(false);
  const [getUserFollowing, setUserFollowing] = useState("");

  useEffect(async () => {
    setLoader(true);
    const { UserFollowingListResponse, UserFollowingListError } =
      await getUserFollowingList();
    if (UserFollowingListResponse.data.StatusCode == "1") {
      setUserFollowing(UserFollowingListResponse.data.Result);
      setLoader(false);
    } else {
      setLoader(false);
      console.log("user Follower List Error", UserFollowingListError);
    }
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

  const RenderItem = (Data, index) => {
    return (
      <View style={[FriendScreenStyle.FollowerListBg, CommonStyle.mb16]}>
        <View style={FriendScreenStyle.followerTxtIcon}>
          <Image
            source={
              Data.item.user_profile_image == ""
                ? { uri: Data.item.user_profile_image }
                : imgPlaceHolder
            }
            style={CommonStyle.showProfileImage}
          />
          <Text style={CommonStyle.txtFrienduserName}>
            {Data.item.user_fname + " " + Data.item.user_lname}
          </Text>
        </View>
        <View style={FriendScreenStyle.btnBg}>
          <POPLinkButton
            buttonName={AppString.UnFollow}
            onPress={() => UnFollowFriend(Data.item.following_user_id)}
            styleBtn={Smallbtn}
            fontStyle={fontsize12}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <SafeAreaView>
        <View Style={[CommonStyle.Container]}>
          <View style={FriendScreenStyle.backgroundColor}>
            <FlatList
              data={getUserFollowing}
              renderItem={(Data, index) => RenderItem(Data, index)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <Spinner visible={getLoader} />
      </SafeAreaView>
    </View>
  );
};

export default Following;
