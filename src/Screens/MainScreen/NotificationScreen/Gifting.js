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

// Asset
import CommonStyle, {
  fontsize10,
  fontsize12,
} from "../../../Assets/Style/CommonStyle";
import { imgPlaceHolder } from "../../../Assets/utils/Image";
import { AppString, Remove } from "../../../Assets/utils/AppString";
import { FilledButton } from "../../../Components/Button/Button";
import { NotificationScreenStyle } from "./NotificationScreenStyle";
import { Smallbtn } from "../../../Components/Button/ButtonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import Spinner from "react-native-loading-spinner-overlay";
import { useActions } from "../../../redux/actions";

const Gifting = ({ navigation }) => {
  const [giftingList, setGiftingList] = useState([]);
  const [getLoader, setLoader] = useState(false);
  const { userSubscription, getNotifyList } = useActions();

  const getNotifyLists = async () => {
    const { getNotifyListResponse, getNotifyListError } = await getNotifyList();
    if (getNotifyListResponse.data.StatusCode == "1") {
      setLoader(false);
      var data = getNotifyListResponse.data.Result;
      setGiftingList(data);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoader(true);
      getNotifyLists();
    });
  }, []);

  const RenderItem = (item, index) => {
    return (
      <View style={[NotificationScreenStyle.FollowerListBg, CommonStyle.mb16]}>
        <View style={[NotificationScreenStyle.followerTxtIcon, { padding: 5 }]}>
          <View style={[{ alignItems: "center", flexDirection: "row" }]}>
            <View style={{ width: "10%" }}>
              <Image
                source={
                  item.user_profile_image == "" ||
                  item.user_profile_image == null ||
                  item.user_profile_image == undefined
                    ? imgPlaceHolder
                    : { uri: item.user_profile_image }
                }
                style={CommonStyle.showProfileImage}
              />
            </View>

            <View style={{ width: "60%", marginLeft: 10 }}>
              <Text
                style={[
                  CommonStyle.txtFrienduserName,
                  { color: COLORS.PrimaryLight },
                ]}
              >
                <Text style={{ color: COLORS.black }}>
                  {item.gift_by_fname} {item.gift_by_lname}{" "}
                </Text>
                {"plans to get"}
              </Text>
              <Text
                style={[
                  CommonStyle.txtFrienduserName,
                  { color: COLORS.PrimaryLight },
                ]}
              >
                <Text style={{ color: COLORS.black }}>
                  {item.gift_to_fname} {item.gift_to_lname}{" "}
                </Text>
                {item.category_name}
              </Text>
            </View>

            <View style={{ width: "30%" }}>
              <Text
                style={[
                  CommonStyle.txtFrienduserName,
                  NotificationScreenStyle.txtcolor,
                ]}
              >
                {" "}
                {item.send_gift_difference}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <SafeAreaView>
        <View Style={[CommonStyle.Container]}>
          <View style={NotificationScreenStyle.backgroundColor}>
            <FlatList
              data={giftingList}
              renderItem={({ item, index }) => RenderItem(item, index)}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default Gifting;
