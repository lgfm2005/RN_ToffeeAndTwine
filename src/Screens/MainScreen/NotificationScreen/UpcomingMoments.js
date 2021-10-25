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
import Spinner from "react-native-loading-spinner-overlay";
import { NotificationScreenStyle } from "./NotificationScreenStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { useActions } from "../../../redux/actions";
import { AppString } from "../../../Assets/utils/AppString";

const UpcomingMoments = ({ navigation }) => {
  const { getProfile, getUpcomingMoments } = useActions();
  const [upcomingMomentsList, setUpcomingMomentsList] = useState([]);
  const [getLoader, setLoader] = useState(false);

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
    setLoader(true);
    const { getUpcomingMomentsResponse, getUpcomingMomentsError } =
      await getUpcomingMoments();
    if (getUpcomingMomentsResponse.data.StatusCode == "1") {
      setLoader(false);
      var data = getUpcomingMomentsResponse.data.Result;
      setUpcomingMomentsList(data);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setLoader(false);
      UpGradePayment();
      getUpcomingMoment();
    });
  }, []);

  const RenderItem = (item, index) => {
    return (
      <View style={[NotificationScreenStyle.FollowerListBg, CommonStyle.mb16]}>
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

          <View style={{ width: "90%" }}>
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
      </View>
    );
  };

  return (
    <View>
      {/* <MyWhiteStatusbar /> */}
      <SafeAreaView>
        <View>
          <View style={NotificationScreenStyle.backgroundColor}>
            {upcomingMomentsList.length > 0 ? (
              <FlatList
                data={upcomingMomentsList}
                renderItem={({ item, index }) => RenderItem(item, index)}
                keyExtractor={(item) => item.id}
              />
            ) : (
              <View style={[CommonStyle.centerRow, CommonStyle.p24]}>
                <Text style={[CommonStyle.txtContent, { textAlign: "center" }]}>
                  {AppString.NotificationsMoment}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default UpcomingMoments;
