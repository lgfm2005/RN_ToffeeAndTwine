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
import ImagePicker from "react-native-image-crop-picker";

// Asset
import {
  imgWhiteEdit,
  imgEditWhite,
  imgDownArrow,
  imgPlaceHolder,
  imgBackleftWhite,
  iimgprofiledemo3,
  imgProfileBackground,
} from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { FormInput, FullFormInput } from "../../../Components/FormInput";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { FriendScreenStyle } from "../FriendScreen/FriendScreenStyle";
import { FilledButton } from "../../../Components/Button/Button";
import { COLORS } from "../../../Assets/utils/COLORS";
import { ProfileScreenStyle } from "./ProfileScreenStyle";
import { FONT } from "../../../Assets/utils/FONT";

let UpdateFirstName,
  UpdateLastName,
  UpdateDefaultSpecialMomentShow,
  UpdateDefaultSpecialMoment;
const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state.session);
  const UserSpecialMoment = useSelector((state) => state.UserSpecialMoment);

  const { updateProfile } = useActions();

  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  const [getHighlightMomentModel, setHighlightMomentModel] = useState(false);
  const [getHighlightMoment, setHighlightMoment] = useState("");
  const [getHighlightMomentId, setHighlightMomentId] = useState("");
  const [getLoader, setLoader] = useState(false);

  const [getFirstName, setFirstName] = useState(user.userFname);
  const [getLastName, setLastName] = useState(user.userLname);
  const [getImage, setImage] = useState("");
  const [getImageShow, setImageShow] = useState([]);

  const [getImageNew, setImageNew] = useState([]);
  const [getImageAPI, setImageAPI] = useState([]);

  useEffect(() => {
    console.log(
      "user.defaultSpecialMoment    ========    22222222",
      user.defaultSpecialMoment
    );
    if (user.defaultSpecialMoment == 0) {
      // console.log(
      //   "user.defaultSpecialMoment ====  else =====  ",
      //   user.defaultSpecialMoment
      // );

      if (
        UserSpecialMoment &&
        UserSpecialMoment[0] &&
        UserSpecialMoment[0]["special_moment_name"]
      ) {
        UpdateDefaultSpecialMoment =
          UserSpecialMoment[0]["special_moment_name"];
      } else {
        UpdateDefaultSpecialMoment = "";
      }
    } else {
      const DefultUserSpecialMoment = UserSpecialMoment.filter(
        (item) => item.special_moment_id == user.defaultSpecialMoment
      );
      console.log(
        "DefultUserSpecialMoment==================1111111111111111",
        DefultUserSpecialMoment
      );
      if (DefultUserSpecialMoment.length > 0) {
        UpdateDefaultSpecialMoment =
          DefultUserSpecialMoment[0]["special_moment_name"];
      } else {
        UpdateDefaultSpecialMoment = "";
      }
    }
    setHighlightMoment(UpdateDefaultSpecialMoment);
  }, [user, UserSpecialMoment]);

  const CloseItem = () => {
    setHighlightMomentModel(false);
  };
  const HighlightMomentModel = () => {
    if (UpdateDefaultSpecialMoment == "") {
      setHighlightMomentModel(false);
    } else {
      setHighlightMomentModel(true);
    }
  };
  const HighlightMomentView = (Title, Id) => {
    setHighlightMoment(Title);
    setHighlightMomentId(Id);
    setHighlightMomentModel(false);
  };

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      compressImageQuality: 0.8,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImageShow(JSON.stringify(image));
      setImage(image.path);
      setImageNew(image.path);
      setImageAPI(JSON.stringify(image));
      // console.log("image===>", image);
    });
  };

  const APIUpdateProfile = async () => {
    if (getFirstName == "") {
      UpdateFirstName = user.userFname;
    } else {
      UpdateFirstName = getFirstName;
    }

    if (getLastName == "") {
      UpdateLastName = user.userLname;
    } else {
      UpdateLastName = getLastName;
    }
    if (getHighlightMomentId == "") {
      UpdateDefaultSpecialMomentShow = user.defaultSpecialMoment;
      console.log(
        "UpdateDefaultSpecialMomentShow",
        UpdateDefaultSpecialMomentShow
      );
    } else {
      UpdateDefaultSpecialMomentShow = getHighlightMomentId;
      console.log(
        "UpdateDefaultSpecialMomentShow",
        UpdateDefaultSpecialMomentShow
      );
    }

    // console.log("UpdateFirstName ====>>>>", UpdateFirstName);
    // console.log("UpdateLastName ====>>>>", UpdateLastName);
    // console.log("getImageShow ===>", getImageShow);

    setLoader(true);
    const { error, response } = await updateProfile(
      UpdateFirstName,
      UpdateLastName,
      getImageAPI,
      UpdateDefaultSpecialMomentShow
    );

    if (response.data.StatusCode == "1") {
      navigation.navigate("MyProfile");
      // console.log("response===>", response.data);
      setLoader(false);
      // navigation.navigate("MyProfile");
    } else {
      setLoader(false);
      console.log("APIUpdateProfile ===>>", error);
    }
  };

  const onSetFirstNames = (text) => {
    if (text.substring(0, 1) == " ") {
      setFirstName("");
      return;
    } else {
      setFirstName(text);
    }
  };

  const onSetLastNames = (text) => {
    if (text.substring(0, 1) == " ") {
      setLastName("");
      return;
    } else {
      setLastName(text);
    }
  };

  const RenderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() =>
          HighlightMomentView(item.special_moment_name, item.special_moment_id)
        }
      >
        <View style={[FriendScreenStyle.FollowerListBg, CommonStyle.mb16]}>
          <View style={FriendScreenStyle.followerTxtIcon}>
            <Text style={CommonStyle.txtFrienduserName}>
              {item.special_moment_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[CommonStyle.BgColorWhite, CommonStyle.mb10]}>
      <MyBlackStatusbar />

      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1,
        }}
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
          <View
            style={[CommonStyle.ProfileToolbarbg, { alignItems: "center" }]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* <TouchableOpacity onPress={() => navigation.push("MyProfile")}> */}
              <Image
                source={imgBackleftWhite}
                style={CommonStyle.imgIconSize}
              />
            </TouchableOpacity>
            <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>
              Edit Profile
            </Text>
            <TouchableOpacity onPress={() => ImageChange()}>
              <Image source={imgEditWhite} style={CommonStyle.imgIconSize} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={CommonStyle.authPage}>
          <KeyboardAvoidingView
            behavior="position"
            // keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={CommonStyle.imgmask}>
              {getImageNew == "" ? (
                user.userProfileImage != "" ? (
                  <ImageBackground
                    source={{ uri: user.userProfileImage }}
                    style={CommonStyle.imgProfileBackground}
                  ></ImageBackground>
                ) : (
                  <ImageBackground
                    source={imgPlaceHolder}
                    style={CommonStyle.imgProfileBackground}
                  ></ImageBackground>
                )
              ) : (
                <ImageBackground
                  source={{ uri: getImageNew }}
                  style={CommonStyle.imgProfileBackground}
                ></ImageBackground>
              )}
              <Image
                source={imgProfileBackground}
                style={CommonStyle.imgmaskbg}
              />
            </View>

            <View style={[CommonStyle.Container, { marginTop: 30 }]}>
              <View style={CommonStyle.formGroup}>
                <View style={[TutorialStyle.inputWrapper]}>
                  <View style={TutorialStyle.inputHalf}>
                    <Text
                      style={[
                        CommonStyle.formLabel,
                        { fontFamily: FONT.Gilroy },
                      ]}
                    >
                      {AppString.FirstName}
                    </Text>

                    <FullFormInput
                      buttonName={user.userFname}
                      placeholderTextColor={COLORS.Primary}
                      value={getFirstName}
                      textChange={(FirstName) => onSetFirstNames(FirstName)}
                    />
                  </View>
                  <View style={TutorialStyle.inputHalf}>
                    <Text
                      style={[
                        CommonStyle.formLabel,
                        { fontFamily: FONT.Gilroy },
                      ]}
                    >
                      {AppString.LastName}
                    </Text>
                    <FullFormInput
                      // buttonName={AppString.LastName}
                      value={getLastName}
                      buttonName={user.userLname}
                      placeholderTextColor={COLORS.Primary}
                      textChange={(LastName) => onSetLastNames(LastName)}
                    />
                  </View>
                </View>
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
          </KeyboardAvoidingView>
        </View>

        {getHighlightMomentModel == true ? (
          <Modal
            testID={"modal"}
            isVisible={getHighlightMomentModel}
            onBackdropPress={() => CloseItem()}
          >
            <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
              <View style={[CommonStyle.centerRow, CommonStyle.p8]}>
                <Text style={[CommonStyle.txtTitle, CommonStyle.mb16]}>
                  {AppString.HighlightMoments}
                </Text>
              </View>
              <FlatList
                data={UserSpecialMoment}
                renderItem={({ item, index }) => RenderItem(item, index)}
                keyExtractor={(UserSpecialMoment) =>
                  UserSpecialMoment.special_moment_id
                }
              />
            </View>
          </Modal>
        ) : null}
      </ScrollView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default EditProfile;
