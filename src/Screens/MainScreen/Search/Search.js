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
// import {Searchbar} from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
// Asset
import CommonStyle, {
  fontsize10,
  fontsize12,
} from "../../../Assets/Style/CommonStyle";
import { demodp, imgPlaceHolder } from "../../../Assets/utils/Image";
import { AppString, Remove } from "../../../Assets/utils/AppString";
import { FilledButton } from "../../../Components/Button/Button";
import { SearchBarStyle } from "./SearchBarStyle";
import { Smallbtn } from "../../../Components/Button/ButtonStyle";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { COLORS } from "../../../Assets/utils/COLORS";
import { useActions } from "../../../redux/actions";

const Search = ({ navigation }) => {
  const { SearchUser } = useActions();

  const [getSearchQuery, setSearchQuery] = useState("");
  const [getSearchData, setSearchData] = useState([]);
  const [getLoader, setLoader] = useState(false);

  const onChangeSearch = async (query) => {
    setSearchQuery(query);
    console.log("Remove Friend  ====>>>>", query);
    if (query.length > 2) {
      // setLoader(true);
      const { SearchUserResponse, SearchUserError } = await SearchUser(query);
      if (SearchUserResponse.data.StatusCode == "1") {
        setSearchData(SearchUserResponse.data.Result);
        console.log(
          "Search Data Response ===>",
          typeof SearchUserResponse.data.Result
        );
        // setLoader(false);
      } else {
        // setLoader(false);
        console.log("Search Data Error ===>", SearchUserError);
      }
    }
  };

  const OpenUserProfile = (userInfo) => {
    // console.log("OpenUserProfile", userInfo);
    navigation.navigate("UserProfile", { userInfo: userInfo });
  };

  const RenderItem = (Data, index) => {
    return (
      <TouchableOpacity onPress={() => OpenUserProfile(Data.item)}>
        {/* <TouchableOpacity onPress={() => {}}> // Data.item.user_id */}
        <View style={[SearchBarStyle.FollowerListBg, CommonStyle.mb16]}>
          <View style={SearchBarStyle.followerTxtIcon}>
            <Image
              source={
                Data.item.user_profile_image != ""
                  ? { uri: Data.item.user_profile_image }
                  : imgPlaceHolder
              }
              style={CommonStyle.showProfileImage}
            />
            <Text style={CommonStyle.txtFrienduserName}>
              {Data.item.user_fname + " " + Data.item.user_lname}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={CommonStyle.BgColorWhite}>
      <MyWhiteStatusbar />
      <View Style={[CommonStyle.Container, CommonStyle.pt16]}>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => onChangeSearch(text)}
            value={getSearchQuery}
            platform="ios"
            autoFocus
            // onCancel={() => navigation.navigate("NavFriendScreen")}
            onCancel={() => navigation.goBack()}
            containerStyle={{
              backgroundColor: COLORS.Secondary,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
            }}
          />
        </View>

        <View style={SearchBarStyle.backgroundColor}>
          {getSearchData == "" ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Data Found !!</Text>
            </View>
          ) : (
            <FlatList
              data={getSearchData}
              renderItem={(Data) => RenderItem(Data)}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};

export default Search;
