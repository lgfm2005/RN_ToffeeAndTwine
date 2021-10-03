import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
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
import { COLORS } from "../../../Assets/utils/COLORS";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { useActions } from "../../../redux/actions";

const Followers = ({ navigation }) => {
  const { getUserFollowerList, RemoveFollowerFriend } = useActions();

  const [getLoader, setLoader] = useState(false);
  const [getUserFollower, setUserFollower] = useState("");

  useEffect(async () => {
    setLoader(true);
    const { userFollowerListResponse, userFollowerListError } =
      await getUserFollowerList();
    if (userFollowerListResponse.data.StatusCode == "1") {
      setUserFollower(userFollowerListResponse.data.Result);
      setLoader(false);
    } else {
      setLoader(false);
      console.log("user Follower List Error ===>", userFollowerListError);
    }
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
    console.log("selectFriend", item);
    navigation.navigate("FriendFollowersList", {
      userID: item.follower_user_id,
    });
  };

  const RenderItem = (Data, index) => {
    return (
      <TouchableOpacity onPress={() => selectFriend(Data.item)}>
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
          <View style={FriendScreenStyle.backgroundColor}>
            {!getUserFollower.length ? (
              <View style={CommonStyle.ContainerCenter}>
                <Text style={CommonStyle.txtContent}>
                  No Follower Found.!!!
                </Text>
              </View>
            ) : (
              <FlatList
                data={getUserFollower}
                renderItem={(Data, index) => RenderItem(Data, index)}
                keyExtractor={(item) => item.id}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default Followers;
