import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";

// Lib
import LinearGradient from "react-native-linear-gradient";
import Modal from "react-native-modal";

// Asset
import { imgbirthdayCakeGary } from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { ToolbarMain } from "../../../Components/ToolbarMain/ToolbarMain";
import { COLORS } from "../../../Assets/utils/COLORS";
import {
  FilledButton,
  ImagePOPLinkButton,
  POPLinkButton,
  POPOutLinkButton,
} from "../../../Components/Button/Button";
import { Mediumbtn } from "../../../Components/Button/ButtonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import {
  imgWhitegift,
  imgUserBlock,
  iimgprofiledemo3,
  imgImport,
  imgCheckCircle,
  profileimgdemo,
  imgProfileBackground,
  imgCoffee,
  imgDesserts,
  imgWhiteBirthday,
  imgWhiteAnniversary,
  imgWhiteChristmas,
  imgWhiteDot,
  imgBook,
  demofaceman,
  imgPlaceHolder,
  imgBackleftWhite,
  imgGiftNotification,
} from "../../../Assets/utils/Image";
import { MainScreenStyle } from "../MainScreenStyle";
import { CalendarList } from "../../../Components/AllListVIew/CalendarList";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { ProfileToolBar } from "../../../Components/ProfileToolBar/ProfileToolBar";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { EditShowSimpleView } from "../../../Components/FormInput";
import { FriendScreenStyle } from "./FriendScreenStyle";
import { FONT } from "../../../Assets/utils/FONT";
import { useActions } from "../../../redux/actions";
import Spinner from "react-native-loading-spinner-overlay";

var temp,
  temp2 = [];
const FriendFollowersList = ({ route, navigation }) => {
  const { userID } = route.params;
  const { getProfile, RemoveFollowerFriend, blockFriend, AddGiftNotication } =
    useActions();

  const [getUserBlockModal, setUserBlockModal] = useState(false);
  const [getMomentsCount, setMomentsCount] = useState(0);
  const [getFollowerCount, setFollowerCount] = useState(0);
  const [getFollowingCount, setFollowingCount] = useState(0);
  const [getUserName, setUserName] = useState("");
  const [friendSpecialMoments, setFriendSpecialMoments] = useState([]);
  const [friendCategoryQuestions, setFriendCategoryQuestions] = useState([]);

  const [getProfileImage, setProfileImage] = useState("");
  const [getResult, setResult] = useState("");
  const [getLoader, setLoader] = useState(false);

  const [getImageNew, setImageNew] = useState("");
  const [getShowOldQuestion, setShowOldQuestion] = useState("");
  const [getAddNewItemModal, setAddNewItemModal] = useState("");
  const [getTitleName, setTitleName] = useState("");
  const [getCategoryId, setCategoryId] = useState("");

  //SpecialMoment
  const [getSpecialMomentName, setSpecialMomentName] = useState("");
  const [getUserSpecialMomentTitle, setUserSpecialMomentTitle] = useState("");
  const [getUserSpecialMomentDate, setUserSpecialMomentDate] = useState("");
  const [getSpecialMomentLink, setSpecialMomentLink] = useState("");
  const [getSpecialMomentOtherInfo, setSpecialMomentOtherInfo] = useState("");
  const [getSpecialMomentImage, setSpecialMomentImage] = useState("");
  const [getUserSpecialMomentId, setUserSpecialMomentId] = useState("");
  const [getSpecialMomentId, setSpecialMomentId] = useState("");
  const [getFriendDefaultSpecialMomentText, setFriendDefaultSpecialMomentText] =
    useState("");

  const [getFriendStatus, setFriendStatus] = useState("");

  const [getFavoriteThingsModal, setFavoriteThingsModal] = useState(false);
  const [getNotificationSendModal, setNotificationSendModal] = useState(false);
  const [getAwesomeShowModal, setAwesomeShowModal] = useState(false);

  const CloseItem = () => {
    setUserBlockModal(false);
    setFavoriteThingsModal(false);
    setNotificationSendModal(false);
    setAddNewItemModal(false);
    setImageNew("");
    setSpecialMomentImage("");
    setAwesomeShowModal(false);
  };

  // Favorite Things
  const ShowOldItem = (Name, Image, CategoryId, key, questions) => {
    temp = [];
    console.log("ShowOldItem Name", Name);
    console.log("ShowOldItem Image", Image);
    console.log("ShowOldItem Id", CategoryId);
    console.log("ShowOldItem key", key);
    console.log("ShowOldItem questions", questions);

    setImageNew(Image);
    setShowOldQuestion(questions);
    setAddNewItemModal(true);
    setTitleName(Name);
    setCategoryId(CategoryId);
  };

  const Giftit = () => {
    setAddNewItemModal(false);
    setNotificationSendModal(true);
  };

  const AwesomeShowModal = async () => {
    setNotificationSendModal(false), setAwesomeShowModal(true), setLoader(true);
    const { addgiftnoticationResponse, addgiftnoticatioError } =
      await AddGiftNotication(userID, getCategoryId);
    if (addgiftnoticationResponse.data.StatusCode == "1") {
      console.log("add gift notication Response", addgiftnoticationResponse);
      setLoader(false);
    } else {
      setLoader(false);
      console.log("add gift notication Error", addgiftnoticatioError);
    }
  };

  // SpecialMoments
  const SpecialMomentsData = (
    specialMomentName,
    userSpecialMomentTitle,
    userSpecialMomentDate,
    specialMomentLink,
    specialMomentOtherInfo,
    Image,
    userSpecialMomentId,
    specialMomentId
  ) => {
    setFavoriteThingsModal(true);
    setSpecialMomentName(specialMomentName);
    setUserSpecialMomentTitle(userSpecialMomentTitle);
    setUserSpecialMomentDate(userSpecialMomentDate);
    setSpecialMomentLink(specialMomentLink);
    setSpecialMomentOtherInfo(specialMomentOtherInfo);
    setSpecialMomentImage(Image);
    setUserSpecialMomentId(userSpecialMomentId);
    setSpecialMomentId(specialMomentId);
  };

  const UserBlock = () => {
    console.log("===>>>11111");
    setUserBlockModal(true);
  };

  const blockFriendAction = async () => {
    setLoader(true);
    const { blockFriendResponse, blockFriendError } = await blockFriend(
      userID,
      1
    );
    setLoader(false);
  };

  const removeFollowerFriend = async () => {
    setLoader(true);
    const { RemoveFriendResponse, RemoveFriendError } =
      await RemoveFollowerFriend(userID);
    setLoader(false);
  };

  const getProfiles = async () => {
    setLoader(true);

    const { profileResponse, profileError } = await getProfile(userID);
    if (profileResponse.data.StatusCode) {
      setResult(profileResponse.data.Result[0].user_details);
      setProfileImage(
        profileResponse.data.Result[0].user_details[0].user_profile_image
      );
      setFriendDefaultSpecialMomentText(
        profileResponse.data.Result[0].friend_default_special_moment_text
      );
      setFriendStatus(
        profileResponse.data.Result[0].user_details[0].friend_status
      );
      setFollowerCount(profileResponse.data.Result[0].follower_count);
      setFollowingCount(profileResponse.data.Result[0].following_count);
      setMomentsCount(
        profileResponse.data.Result[0].user_details[0].default_special_moment
      );
      var name =
        profileResponse.data.Result[0].user_details[0].user_fname +
        " " +
        profileResponse.data.Result[0].user_details[0].user_lname;
      setUserName(name);

      setFriendCategoryQuestions(
        profileResponse.data.Result[0].friend_category_questions
      );
      setFriendSpecialMoments(
        profileResponse.data.Result[0].friend_special_moments
      );
      setLoader(false);
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  console.log("getSpecialMomentImage::", getSpecialMomentImage);

  return (
    <View style={CommonStyle.BgColorWhite}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("NavFriendScreen")}
            >
              <Image
                source={imgBackleftWhite}
                style={CommonStyle.imgIconSize}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => UserBlock()}>
              <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>
                {getUserName}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => UserBlock()}>
              <Image source={imgWhiteDot} style={CommonStyle.imgIconSize} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ marginBottom: 15 }}
      >
        <View style={CommonStyle.authPage}>
          <View style={CommonStyle.imgmask}>
            <ImageBackground
              source={
                getProfileImage != ""
                  ? { uri: getProfileImage }
                  : imgPlaceHolder
              }
              style={[CommonStyle.imgProfileBackground]}
            ></ImageBackground>
            <Image
              source={imgProfileBackground}
              style={CommonStyle.imgmaskbg}
            />
          </View>

          <View style={[CommonStyle.Container]}>
            <View style={[CommonStyle.my16, CommonStyle.Row]}>
              <View style={FriendScreenStyle.NameAndEditbg}>
                <View>
                  <Text style={FriendScreenStyle.userName}>{getUserName}</Text>
                  {/* <Text style={FriendScreenStyle.userName}>{userName}</Text> */}
                  {getFriendDefaultSpecialMomentText.length > 0 ? (
                    <View style={CommonStyle.alignItemsBaseLine}>
                      <Image
                        source={imgbirthdayCakeGary}
                        style={CommonStyle.imgIconSize}
                      />
                      <Text
                        style={[
                          CommonStyle.txtContent,
                          { color: COLORS.PrimaryLight },
                        ]}
                      >
                        {getFriendDefaultSpecialMomentText}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {getFriendStatus == "1" ? (
                  <POPLinkButton
                    buttonName={AppString.Follow}
                    styleBtn={Mediumbtn}
                    onPress={() => followUserAction()}
                  />
                ) : getFriendStatus == "2" ? (
                  <POPLinkButton
                    buttonName={AppString.Following}
                    // styleBtn={Mediumbtn}
                    // onPress={() => followUserAction()}
                  />
                ) : (
                  <POPLinkButton
                    buttonName={AppString.Remove}
                    styleBtn={[Mediumbtn]}
                    onPress={() => removeFollowerFriend()}
                  />
                )}
              </View>
            </View>

            <View style={[FriendScreenStyle.MomentStatus]}>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  {getMomentsCount == 0 ? "--" : getMomentsCount}
                </Text>
                <Text
                  style={[
                    CommonStyle.txtContent,
                    { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight },
                  ]}
                >
                  Moments
                </Text>
              </View>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  {getFollowerCount == "0" ? "--" : getFollowerCount}
                </Text>
                <Text
                  style={[
                    CommonStyle.txtContent,
                    { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight },
                  ]}
                >
                  Followers
                </Text>
              </View>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  {getFollowingCount == "0" ? "--" : getFollowingCount}
                </Text>
                <Text
                  style={[
                    CommonStyle.txtContent,
                    { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight },
                  ]}
                >
                  Following
                </Text>
              </View>
            </View>

            <View>
              <Text
                style={[
                  CommonStyle.txtTitle,
                  CommonStyle.textUpperCase,
                  { fontFamily: FONT.NotoSans, marginTop: 16 },
                ]}
              >
                {AppString.FavoriteThings}
              </Text>
              <ScrollView
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.toppadding16,
                ]}
              >
                {friendCategoryQuestions.length > 0 &&
                  friendCategoryQuestions.map((item, index) => (
                    <CalendarList
                      ImageUrl={imgBook}
                      ExploreName={item.category_name}
                      Id={item.category_id}
                      index={index}
                      key={index}
                      DataLength={friendCategoryQuestions.length}
                      ShowBtn={false}
                      onPress={
                        () =>
                          ShowOldItem(
                            item.category_name,
                            item.user_category_image,
                            item.category_id,
                            index,
                            item.questions
                          )

                        // item.category_name,
                        // item.user_category_image,
                        // item.category_id,
                        // index,
                        // item.questions
                      }
                    />
                  ))}
              </ScrollView>
            </View>

            <View>
              <Text
                style={[
                  CommonStyle.txtTitle,
                  CommonStyle.textUpperCase,
                  { fontFamily: FONT.NotoSans, marginTop: 16 },
                ]}
              >
                {AppString.SpecialMoments}
              </Text>
              <ScrollView
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.toppadding16,
                ]}
              >
                {friendSpecialMoments.length > 0 &&
                  friendSpecialMoments.map((item, index) => (
                    <CalendarList
                      ImageUrl={imgBook}
                      ExploreName={item.special_moment_name}
                      Id={item.special_moment_id}
                      index={index}
                      key={index}
                      DataLength={friendSpecialMoments.length}
                      ShowBtn={false}
                      onPress={() =>
                        SpecialMomentsData(
                          item.special_moment_name,
                          item.user_special_moment_title,
                          item.user_special_moment_date,
                          item.special_moment_link,
                          item.special_moment_other_info,
                          item.image,
                          item.user_special_moment_id,
                          item.special_moment_id
                        )
                      }
                    />
                  ))}
              </ScrollView>
            </View>

            {getUserBlockModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getUserBlockModal}
                onBackdropPress={() => CloseItem()}
              >
                <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                  <TouchableOpacity
                    onPress={() => blockFriendAction()}
                    style={CommonStyle.Row}
                  >
                    <Image
                      source={imgUserBlock}
                      style={CommonStyle.imgIconSize}
                    />
                    <Text style={[CommonStyle.txtTitle, { paddingLeft: 15 }]}>
                      Block
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            ) : null}
          </View>
        </View>
      </ScrollView>

      {/* Block */}
      {getUserBlockModal == true ? (
        <Modal
          testID={"modal"}
          isVisible={getUserBlockModal}
          onBackdropPress={() => CloseItem()}
        >
          <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
            <TouchableOpacity
              onPress={() => blockFriendAction()}
              style={CommonStyle.Row}
            >
              <Image source={imgUserBlock} style={CommonStyle.imgIconSize} />
              <Text style={[CommonStyle.txtTitle, { paddingLeft: 15 }]}>
                Block
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : null}

      {/* SpecialMoment  --- 1*/}
      {getFavoriteThingsModal == true ? (
        <Modal
          testID={"modal"}
          isVisible={getFavoriteThingsModal}
          onBackdropPress={() => CloseItem()}
        >
          <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
            <View style={CommonStyle.Row}>
              <View style={{ width: "20%" }}>
                {getImageNew == "" ? (
                  <Image
                    source={
                      getSpecialMomentImage == "" ||
                      getSpecialMomentImage == null
                        ? imgPlaceHolder
                        : { uri: getSpecialMomentImage }
                    }
                    style={CommonStyle.popupImage}
                  />
                ) : (
                  <Image source={imgImport} style={CommonStyle.popupImage} />
                )}
              </View>
              <View style={{ width: "80%" }}>
                <Text style={[CommonStyle.txtTitle, CommonStyle.p16]}>
                  {getSpecialMomentName}
                </Text>
              </View>
            </View>

            <View style={CommonStyle.my16}>
              <EditShowSimpleView
                TitleName={"Title"}
                value={getUserSpecialMomentTitle}
              />
              <EditShowSimpleView
                TitleName={"Date"}
                value={getUserSpecialMomentDate}
              />
              <EditShowSimpleView
                TitleName={"Link"}
                value={getSpecialMomentLink}
              />
              <EditShowSimpleView
                TitleName={"Other Info"}
                value={getSpecialMomentOtherInfo}
              />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              {/* <ImagePOPLinkButton
                      buttonName={AppString.Giftit}
                      buttonImage={imgWhitegift}
                      onPress={() => SendSpecialMoment()}
                    /> */}
            </View>
          </View>
        </Modal>
      ) : null}

      {/* Show User Category Question */}
      {getAddNewItemModal == true ? (
        <Modal
          testID={"modal"}
          isVisible={getAddNewItemModal}
          onBackdropPress={() => CloseItem()}
        >
          <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
            <View style={CommonStyle.Row}>
              <View style={{ width: "20%" }}>
                <TouchableOpacity disabled={true}>
                  {getImageNew == "" ? (
                    <Image
                      source={
                        getImageNew == "" || getImageNew == null
                          ? imgPlaceHolder
                          : { uri: getImageNew }
                      }
                      style={CommonStyle.popupImage}
                    />
                  ) : (
                    <Image source={imgImport} style={CommonStyle.popupImage} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ width: "60%" }}>
                <Text
                  style={[
                    CommonStyle.txtTitle,
                    CommonStyle.p16,
                    { textAlign: "center" },
                  ]}
                >
                  {getTitleName}
                </Text>
              </View>
              <View style={{ width: "20%" }}></View>
            </View>
            <View style={CommonStyle.my16}>
              {getShowOldQuestion.length > 0 &&
                getShowOldQuestion.map((item, index) => {
                  return (
                    <EditShowSimpleView
                      TitleName={item.category_question}
                      buttonName={item.category_placeholder}
                      value={item.question_value}
                    />
                  );
                })}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <ImagePOPLinkButton
                buttonName={AppString.Giftit}
                buttonImage={imgGiftNotification}
                onPress={() => Giftit()}
              />
            </View>
          </View>
        </Modal>
      ) : null}

      {/* getNotificationSendModal */}
      {getNotificationSendModal == true ? (
        <Modal
          testID={"modal"}
          isVisible={getNotificationSendModal}
          onBackdropPress={() => CloseItem()}
        >
          <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
            <View style={CommonStyle.Row}>
              <View style={{ width: "20%" }}>
                <TouchableOpacity disabled={true}>
                  {getImageNew == "" ? (
                    <Image
                      source={
                        getImageNew == "" || getImageNew == null
                          ? imgPlaceHolder
                          : { uri: getImageNew }
                      }
                      style={CommonStyle.popupImage}
                    />
                  ) : (
                    <Image source={imgImport} style={CommonStyle.popupImage} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ width: "60%" }}>
                <Text
                  style={[
                    CommonStyle.txtTitle,
                    CommonStyle.p16,
                    { textAlign: "center" },
                  ]}
                >
                  {getTitleName}
                </Text>
              </View>
              <View style={{ width: "20%" }}></View>
            </View>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text
                style={[
                  CommonStyle.txtContent,
                  { marginLeft: 10, marginRight: 10, fontSize: 18 },
                ]}
              >
                {AppString.planning}
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <POPOutLinkButton
                buttonName={AppString.NoThanks}
                onPress={() => CloseItem()}
              />

              <POPLinkButton
                buttonName={AppString.YesNotify}
                onPress={() => AwesomeShowModal()}
              />
            </View>
          </View>
        </Modal>
      ) : null}

      {/* getAwesomeShowModal */}
      {getAwesomeShowModal == true ? (
        <Modal
          testID={"modal"}
          isVisible={getAwesomeShowModal}
          onBackdropPress={() => CloseItem()}
        >
          <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
            <View style={[CommonStyle.centerRow, { width: "100%" }]}>
              <Image
                source={imgCheckCircle}
                style={CommonStyle.popupProfileImage}
              />
            </View>

            <Text
              style={[
                CommonStyle.txtTitle,
                {
                  margin: 10,
                  fontSize: 18,
                },
              ]}
            >
              {AppString.FriendsAwesome}
            </Text>
          </View>
        </Modal>
      ) : null}
      <Spinner visible={getLoader} />
    </View>
  );
};

export default FriendFollowersList;
