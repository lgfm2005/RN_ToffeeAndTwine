import React, { useEffect, useState } from "react";
import {
  ImageBackground,
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
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector } from "react-redux";
import { useActions } from "../../../redux/actions";
// Asset
import {
  imgWhiteEdit,
  imgDownArrow,
  imgWhiteShare,
  imgBackleftWhite,
  iimgprofiledemo3,
  imgProfileBackground,
} from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { FormInput } from "../../../Components/FormInput";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { FriendScreenStyle } from "../FriendScreen/FriendScreenStyle";
import { FilledButton } from "../../../Components/Button/Button";
import { COLORS } from "../../../Assets/utils/COLORS";

const Data = [
  {
    id: 1,
    Name: AppString.Coffee,
  },
  {
    id: 2,
    Name: AppString.Dessert,
  },
  {
    id: 3,
    Name: AppString.Flowers,
  },
  {
    id: 4,
    Name: AppString.Laptop,
  },
  {
    id: 5,
    Name: AppString.Ring,
  },
  {
    id: 6,
    Name: AppString.Book,
  },
  {
    id: 7,
    Name: AppString.Dessert,
  },
];

const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state.session);
  const { updateProfile } = useActions();

  const [getHighlightMomentModel, setHighlightMomentModel] = useState(false);
  const [getHighlightMoment, setHighlightMoment] = useState("Coffee");
  const [getFirstName, setFirstName] = useState(user.userLname);
  const [getLastName, setLastName] = useState("");
  const [getLoader, setLoader] = useState(false);

  const CloseItem = () => {
    setHighlightMomentModel(false);
  };
  const HighlightMomentModel = () => {
    setHighlightMomentModel(true);
  };
  const HighlightMomentView = (Title) => {
    setHighlightMoment(Title);
    setHighlightMomentModel(false);
  };

  const APIUpdateProfile = async () => {
    setLoader(true);
    const { error, response } = await updateProfile(getFirstName, getLastName);
    debugger;
    // console.log("getFirstName===>", getFirstName);
    // console.log("getLastName===>", getLastName);
    console.log("response===>", response);
    console.log("error===>", error);
    debugger;
    // setLoader(false);
    // navigation.navigate("MyProfile");
  };

  const RenderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => HighlightMomentView(item.Name)}>
        <View style={[FriendScreenStyle.FollowerListBg, CommonStyle.mb16]}>
          <View style={FriendScreenStyle.followerTxtIcon}>
            <Text style={CommonStyle.txtFrienduserName}>{item.Name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={CommonStyle.BgColorWhite}>
      <MyBlackStatusbar />
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={CommonStyle.authPage}>
            <View style={CommonStyle.imgmask}>
              <ImageBackground
                source={iimgprofiledemo3}
                style={CommonStyle.imgProfileBackground}
              >
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,1)",
                    "rgba(0,0,0,0.8)",
                    "rgba(0,0,0,0.6)",
                    "rgba(0,0,0,0.4)",
                    "rgba(0,0,0,0.0)",
                  ]}
                >
                  <View style={CommonStyle.ProfileToolbarbg}>
                    <TouchableOpacity>
                      <Image
                        source={imgBackleftWhite}
                        style={CommonStyle.imgIconSize}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        CommonStyle.txtTitle,
                        { color: COLORS.Secondary },
                      ]}
                    >
                      Edit Profile
                    </Text>
                    <TouchableOpacity onPress={() => {}}>
                      <Image
                        source={imgWhiteEdit}
                        style={CommonStyle.imgIconSize}
                      />
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </ImageBackground>
              <Image
                source={imgProfileBackground}
                style={CommonStyle.imgmaskbg}
              />
            </View>

            <View style={[CommonStyle.Container]}>
              <View style={CommonStyle.formGroup}>
                <Text style={CommonStyle.formLabel}>{AppString.FirstName}</Text>
                <FormInput
                  // buttonName={AppString.FirstName}
                  buttonName={user.userFname}
                  placeholderTextColor={COLORS.Primary}
                  textChange={(FirstName) => setFirstName(FirstName)}
                />
              </View>

              <View style={CommonStyle.formGroup}>
                <Text style={CommonStyle.formLabel}>{AppString.LastName}</Text>
                <FormInput
                  // buttonName={AppString.LastName}
                  buttonName={user.userLname}
                  placeholderTextColor={COLORS.Primary}
                  textChange={(LastName) => setLastName(LastName)}
                />
              </View>

              <View style={CommonStyle.formGroup}>
                <Text style={CommonStyle.formLabel}>
                  {AppString.HighlightMoments}
                </Text>

                <TouchableOpacity onPress={() => HighlightMomentModel()}>
                  <View
                    style={[
                      CommonStyle.formControl,
                      CommonStyle.RowSpace,
                      CommonStyle.Row,
                    ]}
                  >
                    <Text>{getHighlightMoment}</Text>
                    <Image
                      source={imgDownArrow}
                      style={CommonStyle.imgIconSize}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <FilledButton
                  buttonName={AppString.Updateprofile}
                  onPress={() => APIUpdateProfile()}
                />
              </View>
            </View>

            {getHighlightMomentModel == true ? (
              <Modal
                testID={"modal"}
                isVisible={getHighlightMomentModel}
                onBackdropPress={() => CloseItem()}
              >
                <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                  <FlatList
                    data={Data}
                    renderItem={({ item, index }) => RenderItem(item, index)}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </Modal>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default EditProfile;
