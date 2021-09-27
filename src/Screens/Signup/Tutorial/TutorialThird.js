import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

// Lib
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import { AppString } from "../../../Assets/utils/AppString";
import { COLORS } from "../../../Assets/utils/COLORS";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import TutorialStyle from "./TutorialStyle";
import NotBorderBlackButton from "../../../Components/NotBorderBlackButton";
import { FilledButton } from "../../../Components/Button/Button";
import {
  imgSliderThird,
  imgLeftBack,
  imgArrowRight,
} from "../../../Assets/utils/Image";
import { SimpleInputEditView } from "../../../Components/FormInput";
import BackToolBar from "../../../Components/BackToolBar";
import { FONT } from "../../../Assets/utils/FONT";
import { useActions } from "../../../redux/actions";
import { ShareAppLink } from "../../../Assets/utils/ShareLink";

const TutorialThird = ({ navigation, route }) => {
  const { tokens } = route.params;
  const { CategoryList } = useActions();
  const [getLoader, setLoader] = useState(false);

  const HomeScreen = async () => {
    setLoader(true);
    const { GetCategoryListerror, GetCategoryListresponse } =
      await CategoryList(30, tokens);
    if (GetCategoryListresponse.data.StatusCode == "1") {
      setLoader(false);
      navigation.navigate("Navigation");
    }
  };

  // const ShareAppLink = async () => {
  //   try {
  //     const result = await Share.share({
  //       title: "App link",
  //       message: "Please install this app and stay safe ",
  //       url: "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <SafeAreaView style={CommonStyle.MainContainer}>
      <View style={CommonStyle.authPage}>
        <View style={CommonStyle.Container}>
          <BackToolBar
            titleName={AppString.Skip}
            ImageLink={imgLeftBack}
            onPressImage={() => navigation.goBack()}
            onPressText={() => HomeScreen()}
          />
        </View>

        <View>
          <Image
            source={imgSliderThird}
            style={[CommonStyle.imgGiftTutorial, CommonStyle.my16]}
          />

          <View style={CommonStyle.Container}>
            <Text style={[CommonStyle.txtTitle, { fontFamily: FONT.Gilroy }]}>
              {AppString.Finalstep}
            </Text>

            <Text style={[CommonStyle.txtContent, { fontFamily: FONT.Gilroy }]}>
              {AppString.Invitespeciallove}
            </Text>

            <View style={{ paddingLeft: 50, paddingRight: 50 }}>
              <FilledButton
                buttonName={AppString.Invite}
                onPress={() => ShareAppLink()}
              />
            </View>
          </View>
        </View>

        <View style={[TutorialStyle.silderbg, CommonStyle.Container]}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.black },
              ]}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Navigation')}>
                            <View style={TutorialStyle.SilderbgImg} >
                                <Image source={imgArrowRight} style={TutorialStyle.silderIcon} />
                            </View>
                        </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({});

export default TutorialThird;
