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
import { useActions } from "../../../redux/actions";

const UpcomingMoments = ({ navigation }) => {
  const { getProfile, getUpcomingMoments } = useActions();
  const [upcomingMomentsList, setUpcomingMomentsList] = useState([]);

  const UpGradePayment = async () => {
    const { profileResponse, profileError } = await getProfile();
    if ((profileResponse.data.StatusCode = "1")) {
      var isActive =
        profileResponse.data.Result[0].user_details[0].user_subscription_status;
      if (isActive == "1") {
        // navigation.navigate("UpcomingMoments");
      } else {
        navigation.navigate("UpcomingUpGrade");
      }
    }
  };

  const getUpcomingMoment = async () => {
    const { getUpcomingMomentsResponse, getUpcomingMomentsError } =
      await getUpcomingMoments();
    if (getUpcomingMomentsResponse.data.StatusCode == "1") {
      var data = getUpcomingMomentsResponse.data.Result;
      setUpcomingMomentsList(data);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      UpGradePayment();
      getUpcomingMoment();
    });
  }, []);

  const RenderItem = (item, index) => {
    return (
      <View style={[NotificationScreenStyle.FollowerListBg, CommonStyle.mb16]}>
        <View style={[{ alignItems: "center", flexDirection: "row" }]}>
          <Image source={demodp} style={CommonStyle.showProfileImage} />
          <Text
            style={[
              CommonStyle.txtFrienduserName,
              { color: COLORS.PrimaryLight },
            ]}
          >
            <Text style={{ color: COLORS.black }}>
              {item.by_user_fname} {item.by_user_lname}{" "}
            </Text>
            {item.special_moment_name} {"is on"} {item.special_moment_value}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <View>
        <View style={NotificationScreenStyle.backgroundColor}>
          <FlatList
            data={upcomingMomentsList}
            renderItem={({ item, index }) => RenderItem(item, index)}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default UpcomingMoments;
