import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

// Lib
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";

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

const TutorialThird = ({ navigation, props }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [getModalName, setModalName] = useState("");

  return (
    <SafeAreaView style={CommonStyle.MainContainer}>
      <View style={CommonStyle.authPage}>
        <View style={CommonStyle.Container}>
          <BackToolBar
            titleName={AppString.Skip}
            ImageLink={imgLeftBack}
            onPressImage={() => navigation.navigate("TutorialSecond")}
            onPressText={() => navigation.navigate("Navigation")}
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
              <FilledButton buttonName={AppString.Invite} onPress={() => {}} />
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
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({});

export default TutorialThird;
