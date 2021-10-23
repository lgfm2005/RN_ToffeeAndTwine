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
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import { imgbirthdayCakeGary } from "../../../Assets/utils/Image";
import CommonStyle, {
  fontsize12,
  fontsize18,
} from "../../../Assets/Style/CommonStyle";
import { COLORS } from "../../../Assets/utils/COLORS";
import {
  FilledButton,
  ImagePOPLinkButton,
  POPLinkButton,
  POPOutLinkButton,
} from "../../../Components/Button/Button";
import {
  Mediumbtn,
  Smallbtn,
  UnFollowMediumbtn,
} from "../../../Components/Button/ButtonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { UserProfileScreenStyle } from "./UserProfileScreenStyle";
import {
  imgUserBlock,
  imgPlaceHolder,
  imgCheckCircle,
  imgNavNotification,
  imgBackleftWhite,
  imgProfileBackground,
  imgGiftNotification,
  imgWhiteDot,
} from "../../../Assets/utils/Image";
import { MainScreenStyle } from "../MainScreenStyle";
import {
  CalendarList,
  Column3CalendarList,
} from "../../../Components/AllListVIew/CalendarList";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { EditShowSimpleView } from "../../../Components/FormInput";
import { useActions } from "../../../redux/actions";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { ImageUrl } from "../../../Assets/utils/ImageUrl";
import { FONT } from "../../../Assets/utils/FONT";
import Purchases from "react-native-purchases";
import Moment from "moment";
import { trim } from "lodash";

const UserProfile = ({ route, navigation }) => {
  const { userInfo } = route.params;
  const {
    getProfile,
    followUser,
    blockFriend,
    AddGiftNotication,
    RemoveFollowerFriend,
    getUnfollowFriendList,
    NotifyFriend,
    userSubscription,
  } = useActions();

  const [getUserBlockModal, setUserBlockModal] = useState(false);
  const [getFavoriteThingsModal, setFavoriteThingsModal] = useState(false);
  const [getNotificationSendModal, setNotificationSendModal] = useState(false);
  const [getAwesomeShowModal, setAwesomeShowModal] = useState(false);
  const [getAddNewItem, setAddNewItem] = useState(false);
  const [friendSpecialMoments, setFriendSpecialMoments] = useState([]);
  const [friendCategoryQuestions, setFriendCategoryQuestions] = useState([]);

  const [getMomentsCount, setMomentsCount] = useState(0);
  const [getFollowerCount, setFollowerCount] = useState("0");
  const [getFollowingCount, setFollowingCount] = useState("0");

  const [getProfileImage, setProfileImage] = useState("");
  const [getResult, setResult] = useState("");
  const [getLoader, setLoader] = useState(false);

  const [getImageNew, setImageNew] = useState("");
  const [getShowOldQuestion, setShowOldQuestion] = useState("");
  const [getAddNewItemModal, setAddNewItemModal] = useState("");
  const [getTitleName, setTitleName] = useState("");
  const [getCategoryId, setCategoryId] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");

  //SpecialMoment
  const [getSpecialMomentName, setSpecialMomentName] = useState("");
  const [getSpecialMomentNameProfile, SetSpecialMomentNameProfile] =
    useState("");
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
  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState("0");
  const [getNotifyThankYouPaymentModal, setNotifyThankYouPaymentModal] =
    useState(false);

  const CloseItem = () => {
    setUserBlockModal(false);
    setFavoriteThingsModal(false);
    setNotificationSendModal(false);
    setAwesomeShowModal(false);
    setAddNewItemModal(false);
    setImageNew("");
    setSpecialMomentImage("");
    setNotifyThankYouPaymentModal(false);
  };

  const ThankYouPaymentCheck = () => {
    setFavoriteThingsModal(false);
    setNotifyThankYouPaymentModal(true);
  };
  const ThankYouPayment = () => {
    setNotifyThankYouPaymentModal(false);
  };

  const UserBlock = () => {
    console.log("===>>>11111");
    setUserBlockModal(true);
  };

  const blockFriendAction = async () => {
    setLoader(true);
    const { blockFriendResponse, blockFriendError } = await blockFriend(
      userInfo.user_id,
      1
    );
    if (blockFriendResponse.data.StatusCode == "1") {
      setLoader(false);
    } else {
      setLoader(false);
    }
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
      await AddGiftNotication(userInfo.user_id, getCategoryId);

    if (addgiftnoticationResponse.data.StatusCode == "1") {
      var GiftTo = addgiftnoticationResponse.data.Result[0].gift_to;
      var GiftID = addgiftnoticationResponse.data.Result[0].user_gift_id;
      console.log("GiftTo ===>", GiftTo);
      console.log("GiftID ===>", GiftID);
      const { notifyFriendResponse, notifyFriendError } = await NotifyFriend(
        GiftTo,
        GiftID,
        1
      );
      console.log("add gift notication Response", addgiftnoticationResponse);
      if (notifyFriendResponse.data.StatusCode == "1") {
        console.log("notify Friend Response", notifyFriendResponse);
        setLoader(false);
      } else {
        setLoader(false);
        setNotificationSendModal(true);
        console.log("notify Friend Error", notifyFriendError);
      }
    } else {
      setLoader(false);
      setNotificationSendModal(true);
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
    // setUserSpecialMomentTitle(userSpecialMomentTitle);
    // setUserSpecialMomentDate(userSpecialMomentDate);
    // setSpecialMomentLink(specialMomentLink);
    // setSpecialMomentOtherInfo(specialMomentOtherInfo);
    setSpecialMomentImage(Image);
    setUserSpecialMomentId(userSpecialMomentId);
    setSpecialMomentId(specialMomentId);

    // Title
    if (
      userSpecialMomentTitle == null ||
      userSpecialMomentTitle == "" ||
      userSpecialMomentTitle == undefined
    ) {
      setUserSpecialMomentTitle("-");
    } else {
      setUserSpecialMomentTitle(userSpecialMomentTitle);
    }
    // Date
    if (
      userSpecialMomentDate == null ||
      userSpecialMomentDate == "" ||
      userSpecialMomentDate == undefined
    ) {
      setUserSpecialMomentDate("-");
    } else {
      setUserSpecialMomentDate(userSpecialMomentDate);
    }

    // Link
    if (
      specialMomentLink == null ||
      specialMomentLink == "" ||
      specialMomentLink == undefined
    ) {
      setSpecialMomentLink("-");
    } else {
      setSpecialMomentLink(specialMomentLink);
    }

    // Link
    if (
      specialMomentOtherInfo == null ||
      specialMomentOtherInfo == "" ||
      specialMomentOtherInfo == undefined
    ) {
      setSpecialMomentOtherInfo("-");
    } else {
      setSpecialMomentOtherInfo(specialMomentOtherInfo);
    }
  };

  const getProfiles = async () => {
    setLoader(true);
    const { profileResponse, profileError } = await getProfile(
      userInfo.user_id
    );

    if (profileResponse.data.StatusCode == "1") {
      setResult(profileResponse.data.Result[0].user_details);
      setProfileImage(
        profileResponse.data.Result[0].user_details[0].user_profile_image
      );

      // SetSpecialMomentNameProfile
      if (profileResponse.data.Result[0].friend_special_moments.length > 0) {
        SetSpecialMomentNameProfile(
          profileResponse.data.Result[0].friend_special_moments[0]
            .special_moment_name
        );
      } else {
        SetSpecialMomentNameProfile([]);
      }

      // SetSpecialMomentNameProfile(
      //   profileResponse.data.Result[0].friend_special_moments[0]
      //     .special_moment_name
      // );

      //setFriendSpecialMoments
      setFriendSpecialMoments(
        profileResponse.data.Result[0].friend_special_moments
      );

      setFriendStatus(
        profileResponse.data.Result[0].user_details[0].friend_status
      );
      setFollowerCount(profileResponse.data.Result[0].follower_count);
      setFollowingCount(profileResponse.data.Result[0].following_count);
      setFriendDefaultSpecialMomentText(
        profileResponse.data.Result[0].friend_default_special_moment_text
      );
      setFirstName(profileResponse.data.Result[0].user_details[0].user_fname);
      setLastName(profileResponse.data.Result[0].user_details[0].user_lname);

      setMomentsCount(profileResponse.data.Result[0].special_moment_count);
      setFriendCategoryQuestions(
        profileResponse.data.Result[0].friend_category_questions
      );

      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  // Friend API
  const FollowAction = async () => {
    setLoader(true);
    const { followUserResponse, followUserError } = await followUser(
      userInfo.user_id
    );
    if (followUserResponse.data.StatusCode == "1") {
      setFriendStatus("1");
      setLoader(false);
      console.log("followUserResponse =====>>>", followUserResponse);
    } else {
      setLoader(false);
      console.log("followUserError =====>>>", followUserError);
    }
  };

  const UnFollowAction = async () => {
    setLoader(true);
    const { UnfollowFriendListResponse, UnfollowFriendListError } =
      await getUnfollowFriendList(userInfo.user_id);
    if (UnfollowFriendListResponse.data.StatusCode == "1") {
      setFriendStatus("0");
      setLoader(false);
      console.log(
        "UnfollowFriendListResponse =====>>>",
        UnfollowFriendListResponse
      );
    } else {
      console.log("UnfollowFriendListError =====>>>", UnfollowFriendListError);
      setLoader(false);
    }
  };

  const RemoveAction = async () => {
    setLoader(true);
    const { RemoveFriendResponse, RemoveFriendError } =
      await RemoveFollowerFriend(userInfo.user_id);
    if (RemoveFriendResponse.data.StatusCode == "1") {
      setFriendStatus("0");
      console.log("RemoveFriendResponse =====>>>", RemoveFriendResponse);
      setLoader(false);
    } else {
      console.log("RemoveFriendError =====>>>", RemoveFriendError);
      setLoader(false);
    }
  };

  const handleSubmitPayment = async () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 4000);
    var currentDate = Moment(new Date(), "DD/MM/YYYY");
    try {
      const purchaserInfo1 = await Purchases.getPurchaserInfo();
      var latestExpirationDates = Moment(
        purchaserInfo1.latestExpirationDate,
        "DD/MM/YYYY"
      );

      var isBefore = currentDate.isBefore(latestExpirationDates);
      if (!isBefore) {
        if (
          typeof purchaserInfo1.entitlements.active.pro_monthly !== "undefined"
        ) {
          // Grant user "pro" access
        }
        const offerings = await Purchases.getOfferings();
        console.log("offerings:", offerings);
        const monthlyPackage = offerings.current.monthly;
        const { purchaserInfo } = await Purchases.purchasePackage(
          monthlyPackage
        );
        const { latestExpirationDate } = purchaserInfo;
        userSubscriptions(purchaserInfo);

        console.log("latestExpirationDate:", latestExpirationDate);
      } else {
      }
      CloseItem();
    } catch (e) {
      console.log("Error:", e);
      // setLoading(false);
      // if (e.userCancelled) return;
      // setError(
      //   "Something went wrong.\nPlease restart the app and start the purchase process again.",
      // );
      // setErrorDetails(e.message);
      // HapticFeedback.trigger("impactHeavy");
    }
  };

  const userSubscriptions = async (info) => {
    if (info.latestExpirationDate != null) {
      if (typeof info.entitlements.active.pro_monthly !== "undefined") {
        // var latestExpirationDates = Moment(info.latestExpirationDate)
        //   .format("YYYY-MM-DD")
        //   .toString();
        var cuttentDate = Moment(new Date()).format("YYYY-MM-DD").toString();
        var latestExpirationDates = Moment(Moment(cuttentDate).add(1, "M"))
          .format("YYYY-MM-DD")
          .toString();

        const { UserSubscriptionResponse, UserSubscriptionError } =
          await userSubscription("1.99", cuttentDate, latestExpirationDates);
        getProfilesLoad();
      }
    }
  };

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
    Purchases.syncPurchases();
    Purchases.addPurchaserInfoUpdateListener((info) => {
      // handle any changes to purchaserInfo
    });
  }, []);

  const getProfilesLoad = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode == "1") {
      setUserSubscriptionStatus(
        profileResponse.data.Result[0].user_details[0].user_subscription_status
      );
    } else {
    }
  };

  useEffect(() => {
    getProfiles();
    getProfilesLoad();
  }, []);

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
            style={[
              CommonStyle.ProfileToolbarbg,
              {
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                bottom: 10,
              },
            ]}
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
                {getFirstName + " " + getLastName}
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
      >
        <View style={CommonStyle.authPage}>
          <View style={CommonStyle.imgmask}>
            <ImageBackground
              source={
                getProfileImage == "" || getProfileImage == undefined
                  ? imgPlaceHolder
                  : { uri: getProfileImage }
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
              <View style={UserProfileScreenStyle.NameAndEditbg}>
                <View>
                  <Text style={UserProfileScreenStyle.userName}>
                    {userInfo.user_fname + " " + userInfo.user_lname}
                  </Text>
                  {getFriendDefaultSpecialMomentText.length > 0 ? (
                    <View style={CommonStyle.alignItemsBaseLine}>
                      <Image
                        // source={imgbirthdayCakeGary}
                        source={{
                          uri:
                            ImageUrl.MomentsGray +
                            getSpecialMomentNameProfile +
                            ImageUrl.Png,
                        }}
                        style={[CommonStyle.imgIconSize]}
                      />
                      <Text
                        style={[
                          CommonStyle.txtContent,
                          { color: COLORS.PrimaryLight, marginLeft: 10 },
                        ]}
                      >
                        {getFriendDefaultSpecialMomentText}
                      </Text>
                    </View>
                  ) : null}
                </View>
                {getFriendStatus == "1" ? (
                  <POPLinkButton
                    buttonName={AppString.UnFollow}
                    styleBtn={UnFollowMediumbtn}
                    onPress={() => UnFollowAction()}
                  />
                ) : getFriendStatus == "2" ? (
                  <POPLinkButton
                    buttonName={AppString.Follow}
                    styleBtn={Mediumbtn}
                    onPress={() => FollowAction()}
                  />
                ) : getFriendStatus == "3" ? (
                  <POPLinkButton
                    buttonName={AppString.UnFollow}
                    styleBtn={UnFollowMediumbtn}
                    onPress={() => UnFollowAction()}
                  />
                ) : (
                  // ) : getFriendStatus == "3" ? (
                  //   <POPLinkButton
                  //     buttonName={AppString.Remove}
                  //     styleBtn={[Mediumbtn]}
                  //     onPress={() => RemoveAction()}
                  //   />
                  <POPLinkButton
                    buttonName={AppString.Follow}
                    styleBtn={Mediumbtn}
                    onPress={() => FollowAction()}
                  />
                )}
              </View>
            </View>

            <View style={[UserProfileScreenStyle.MomentStatus]}>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  {getMomentsCount == 0 ? "--" : getMomentsCount}
                </Text>
                <Text
                  style={
                    (CommonStyle.txtContent,
                    { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight })
                  }
                >
                  Moments
                </Text>
              </View>
              <TouchableOpacity
                disabled={
                  getFollowerCount == "0" || getFollowerCount == 0
                    ? true
                    : false
                }
                onPress={() =>
                  navigation.push("NavUserFriendScreen", {
                    isFollowing: false,
                    isUserFollowerFriendId: userInfo.user_id,
                    isUserFollowingFriendId: userInfo.user_id,
                    Usename: getFirstName,
                    isMyProfile: false,
                  })
                }
              >
                <View>
                  <Text
                    style={[
                      CommonStyle.txtTitle,
                      { fontFamily: FONT.NotoSans },
                    ]}
                  >
                    {" "}
                    {getFollowerCount == "0" ? "--" : getFollowerCount}
                  </Text>
                  <Text
                    style={
                      (CommonStyle.txtContent,
                      { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight })
                    }
                  >
                    Followers
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={getFollowingCount == "0" ? true : false}
                onPress={() =>
                  navigation.push("NavUserFriendScreen", {
                    isFollowing: true,
                    isUserFollowerFriendId: userInfo.user_id,
                    isUserFollowingFriendId: userInfo.user_id,
                    Usename: getFirstName,
                    isMyProfile: false,
                  })
                }
              >
                <View>
                  <Text
                    style={[
                      CommonStyle.txtTitle,
                      { fontFamily: FONT.NotoSans },
                    ]}
                  >
                    {" "}
                    {getFollowingCount == "0" ? "--" : getFollowingCount}
                  </Text>
                  <Text
                    style={
                      (CommonStyle.txtContent,
                      { fontFamily: FONT.Gilroy, color: COLORS.PrimaryLight })
                    }
                  >
                    Following
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <Text
                style={[
                  CommonStyle.txtTitle,
                  CommonStyle.textUpperCase,
                  { fontFamily: FONT.NotoSans, marginTop: 40 },
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
                {friendCategoryQuestions.length > 0 ? (
                  friendCategoryQuestions.length > 0 &&
                  friendCategoryQuestions.map((item, index) => (
                    <Column3CalendarList
                      ImageUrl={{
                        uri:
                          ImageUrl.Categories +
                          item.category_name +
                          ImageUrl.Png,
                      }}
                      ExploreName={item.category_name}
                      Id={item.category_id}
                      index={index}
                      key={index}
                      DataLength={friendCategoryQuestions.length}
                      ShowBtn={false}
                      onPress={() =>
                        ShowOldItem(
                          item.category_name,
                          item.user_category_image,
                          item.category_id,
                          index,
                          item.questions
                        )
                      }
                      // AddNewOnPress={
                      //   () => console.log("ddfdf")
                      //   //  AddItemShow(index)
                      // }
                    />
                  ))
                ) : (
                  <View style={CommonStyle.centerRow}>
                    <Text style={CommonStyle.txtContent}>
                      {AppString.NoGifthintsAddedyet}
                    </Text>
                  </View>
                )}
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
                {friendSpecialMoments.length > 0 ? (
                  friendSpecialMoments.length > 0 &&
                  friendSpecialMoments.map((item, index) => (
                    <Column3CalendarList
                      ImageUrl={{
                        uri:
                          ImageUrl.MomentsWhite +
                          trim(item.special_moment_name) +
                          ImageUrl.Png,
                      }}
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
                  ))
                ) : (
                  <View style={CommonStyle.centerRow}>
                    <Text style={CommonStyle.txtContent}>
                      {AppString.Nospecialmomentsaddedyet}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>

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
                      {getSpecialMomentImage == "" ||
                      getSpecialMomentImage == null ||
                      getSpecialMomentImage == undefined ? (
                        <Image
                          source={{
                            uri:
                              ImageUrl.MomentsBlack +
                              getSpecialMomentName +
                              ImageUrl.Png,
                          }}
                          style={[CommonStyle.popupImage]}
                        />
                      ) : (
                        <Image
                          source={{ uri: getSpecialMomentImage }}
                          style={CommonStyle.popupImage}
                        />
                      )}
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text style={[CommonStyle.txtTitle, CommonStyle.p16]}>
                        {getSpecialMomentName}
                      </Text>
                    </View>
                    <View style={{ width: "20%" }} />
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

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    {userSubscriptionStatus == "0" ? (
                      <ImagePOPLinkButton
                        buttonName={AppString.Notify}
                        buttonImage={imgNavNotification}
                        onPress={() => handleSubmitPayment()}
                      />
                    ) : (
                      <ImagePOPLinkButton
                        buttonName={AppString.Notify}
                        buttonImage={imgNavNotification}
                        onPress={() => ThankYouPaymentCheck()}
                      />
                    )}
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
                        {getImageNew == "" ||
                        getImageNew == null ||
                        getImageNew == undefined ? (
                          <Image
                            source={{
                              uri:
                                ImageUrl.Categories +
                                getTitleName +
                                ImageUrl.Png,
                            }}
                            style={[
                              CommonStyle.popupImage,
                              { tintColor: "black" },
                            ]}
                          />
                        ) : (
                          <Image
                            source={{ uri: getImageNew }}
                            style={CommonStyle.popupImage}
                          />
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
                            // buttonName={item.category_placeholder}
                            buttonName={"-"}
                            value={item.question_value}
                          />
                        );
                      })}
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
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
                        {getImageNew == "" ||
                        getImageNew == null ||
                        getImageNew == undefined ? (
                          <Image
                            source={{
                              uri:
                                ImageUrl.Categories +
                                getTitleName +
                                ImageUrl.Png,
                            }}
                            style={[
                              CommonStyle.popupImage,
                              { tintColor: "black" },
                            ]}
                          />
                        ) : (
                          <Image
                            source={{ uri: getImageNew }}
                            style={CommonStyle.popupImage}
                          />
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
                      Do you wish to let {userInfo.user_fname}'s friends know
                      you are planning to get this gift for{" "}
                      {userInfo.user_fname}?
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
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
                    Awesome!…, {getFirstName}'s Friends now know you plan to get{" "}
                    {getTitleName} as a gift.
                  </Text>
                </View>
              </Modal>
            ) : null}

            {/* NotifyThankYouPaymentModal  */}
            {getNotifyThankYouPaymentModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getNotifyThankYouPaymentModal}
                onBackdropPress={() => CloseItem()}
              >
                <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                  <View style={CommonStyle.Row}>
                    <Text style={[CommonStyle.txtContent, CommonStyle.p16]}>
                      {AppString.notifySpecialMoment}
                    </Text>
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <ImagePOPLinkButton
                      buttonName={AppString.Ok}
                      onPress={() => ThankYouPayment()}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <Spinner visible={getLoader} />
    </View>
  );
};

export default UserProfile;
