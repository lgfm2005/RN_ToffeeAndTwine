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
import { demodp } from "../../../Assets/utils/Image";
import { AppString, Remove } from "../../../Assets/utils/AppString";
import { FilledButton } from "../../../Components/Button/Button";
import { NotificationScreenStyle } from "./NotificationScreenStyle";
import { Smallbtn } from "../../../Components/Button/ButtonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";

const Data = [
  {
    id: 1,
    UserName: "Jessica Rockwell",
    Plan: "plans to get",
    Title: "Heather",
    SubTitle: "a cup of Coffee.",
    Time: "15 mins.",
    Image: demodp,
  },
  {
    id: 2,
    UserName: "Jessica Rockwell",
    Plan: "plans to get",
    Title: "Heather",
    SubTitle: "a cup of Coffee.",
    Time: "15 mins.",
    Image: demodp,
  },
  {
    id: 3,
    UserName: "Jessica Rockwell",
    Plan: "plans to get",
    Title: "Heather",
    SubTitle: "a cup of Coffee.",
    Time: "15 mins.",
    Image: demodp,
  },
];

import { useActions } from "../../../redux/actions";
const Gifting = ({ navigation }) => {
  const [giftingList, setGiftingList] = useState([]);
  const { userSubscription, getNotifyList } = useActions();

  const getNotifyLists = async () => {
    const { getNotifyListResponse, getNotifyListError } = await getNotifyList();
    if (getNotifyListResponse.data.StatusCode == "1") {
      var data = getNotifyListResponse.data.Result;
      setGiftingList(data);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getNotifyLists();
    });
  }, []);
  const RenderItem = (item, index) => {
    return (
      <View style={[NotificationScreenStyle.FollowerListBg, CommonStyle.mb16]}>
        <View style={[NotificationScreenStyle.followerTxtIcon, { padding: 5 }]}>
          <Image source={demodp} style={CommonStyle.showProfileImage} />
          <View>
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
          <Text
            style={[
              CommonStyle.txtFrienduserName,
              NotificationScreenStyle.txtcolor,
            ]}
          >
            {" "}
            {"15 mins."}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <View Style={[CommonStyle.Container]}>
        <View style={NotificationScreenStyle.backgroundColor}>
          <FlatList
            data={giftingList}
            renderItem={({ item, index }) => RenderItem(item, index)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default Gifting;
