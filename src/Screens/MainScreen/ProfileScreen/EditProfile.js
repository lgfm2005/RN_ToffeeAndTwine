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
import { ProfileScreenStyle } from "./ProfileScreenStyle";

let UpdateFirstName,
  UpdateLastName,
  UpdateDefaultSpecialMomentShow,
  UpdateDefaultSpecialMoment;
const EditProfile = ({ navigation }) => {
  const user = useSelector((state) => state.session);
  const UserSpecialMoment = useSelector((state) => state.UserSpecialMoment);

  const { updateProfile } = useActions();

  const [getHighlightMomentModel, setHighlightMomentModel] = useState(false);
  const [getHighlightMoment, setHighlightMoment] = useState("");
  const [getHighlightMomentId, setHighlightMomentId] = useState("");
  const [getLoader, setLoader] = useState(false);

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getImage, setImage] = useState("");
  const [getImageShow, setImageShow] = useState([]);

  console.log(
    "user.defaultSpecialMoment>>>>>>>>>>.",
    user.defaultSpecialMoment
  );
  useEffect(() => {
    console.log("user.defaultSpecialMoment", user.defaultSpecialMoment);
    if (user.defaultSpecialMoment == 0) {
      UpdateDefaultSpecialMoment = UserSpecialMoment[0]["special_moment_name"];
    } else {
      const DefultUserSpecialMoment = UserSpecialMoment.filter(
        (item) => item.special_moment_id == user.defaultSpecialMoment
      );
      UpdateDefaultSpecialMoment =
        DefultUserSpecialMoment[0]["special_moment_name"];
    }
    // (item) => item.special_moment_id == user.defaultSpecialMoment
    // )[0]["special_moment_name"]
    setHighlightMoment(UpdateDefaultSpecialMoment);
  }, [user, UserSpecialMoment]);

  const CloseItem = () => {
    setHighlightMomentModel(false);
  };
  const HighlightMomentModel = () => {
    setHighlightMomentModel(true);
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
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImageShow(JSON.stringify(image));
      setImage(image.path);
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
      UpdateDefaultSpecialMomentShow = "1";
    } else {
      UpdateDefaultSpecialMomentShow = getHighlightMomentId;
    }

    // console.log("UpdateFirstName ====>>>>", UpdateFirstName);
    // console.log("UpdateLastName ====>>>>", UpdateLastName);
    // console.log("getImageShow ===>", getImageShow);

    setLoader(true);
    const { error, response } = await updateProfile(
      UpdateFirstName,
      UpdateLastName,
      getImageShow,
      UpdateDefaultSpecialMomentShow
    );

    if (response.data.StatusCode == "1") {
      // console.log("response===>", response.data);
      setLoader(false);
      // navigation.navigate("MyProfile");
    } else {
      setLoader(false);
      console.log("APIUpdateProfile ===>>", error);
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
      <SafeAreaView>
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
                <Image
                  source={imgBackleftWhite}
                  style={CommonStyle.imgIconSize}
                />
              </TouchableOpacity>
              <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>
                Edit Profile
              </Text>
              <TouchableOpacity onPress={() => ImageChange()}>
                <Image source={imgWhiteEdit} style={CommonStyle.imgIconSize} />
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
            <View style={CommonStyle.imgmask}>
              <ImageBackground
                source={
                  getImage != ""
                    ? { uri: getImage }
                    : { uri: user.userProfileImage }
                }
                style={CommonStyle.imgProfileBackground}
              ></ImageBackground>
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
          </View>

          {getHighlightMomentModel == true ? (
            <Modal
              testID={"modal"}
              isVisible={getHighlightMomentModel}
              onBackdropPress={() => CloseItem()}
            >
              <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
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
      </SafeAreaView>
    </View>
  );
};

export default EditProfile;
