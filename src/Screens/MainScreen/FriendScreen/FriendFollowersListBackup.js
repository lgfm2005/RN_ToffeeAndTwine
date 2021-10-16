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
  imgBackleftWhite,
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

const Data = [
  {
    id: 1,
    Name: AppString.Coffee,
    Image: imgCoffee,
  },
  {
    id: 2,
    Name: AppString.Dessert,
    Image: imgDesserts,
  },
];

const SprecialMOmentsData = [
  {
    id: 1,
    Name: AppString.Birthday,
    Image: imgWhiteBirthday,
  },
  {
    id: 2,
    Name: AppString.Anniversary,
    Image: imgWhiteAnniversary,
  },
];
var temp,
  temp2 = [];
const FriendFollowersList = ({ route, navigation }) => {
  const { userID } = route.params;
  const { getProfile, RemoveFollowerFriend, blockFriend } = useActions();
  const [getUserBlockModal, setUserBlockModal] = useState(false);
  const [getFavoriteThingsModal, setFavoriteThingsModal] = useState(false);
  const [getNotificationSendModal, setNotificationSendModal] = useState(false);
  const [getAwesomeShowModal, setAwesomeShowModal] = useState(false);
  const [getMomentsCount, setMomentsCount] = useState(0);
  const [getFollowerCount, setFollowerCount] = useState(0);
  const [getFollowingCount, setFollowingCount] = useState(0);
  const [getUserName, setUserName] = useState("");

  const [getAddNewItem, setAddNewItem] = useState(false);

  const [friendSpecialMoments, setFriendSpecialMoments] = useState([]);
  const [friendCategoryQuestions, setFriendCategoryQuestions] = useState([]);

  const CloseItem = () => {
    setUserBlockModal(false);
    setFavoriteThingsModal(false);
    setNotificationSendModal(false);
    setAwesomeShowModal(false);
  };
  const UserBlock = () => {
    console.log("===>>>11111");
    setUserBlockModal(true);
  };
  const FavoriteThings = (favItem) => {
    console.log("favItem", favItem);
    setAddNewItem(favItem);
    setFavoriteThingsModal(true);
  };
  const SendNotificationFav = () => {
    setFavoriteThingsModal(false);
    setNotificationSendModal(true);
  };

  const AwesomeShowModal = () => [
    setNotificationSendModal(false),
    setAwesomeShowModal(true),
  ];

  const blockFriendAction = async () => {
    const { blockFriendResponse, blockFriendError } = await blockFriend(
      userID,
      1
    );
  };
  const removeFollowerFriend = async () => {
    const { RemoveFriendResponse, RemoveFriendError } =
      await RemoveFollowerFriend(userID);
  };

  const getProfiles = async () => {
    const { profileResponse, profileError } = await getProfile(userID);
    if (profileResponse.data.StatusCode == "1") {
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
    }
  };

  // Select Item Categories --> Open
  const ShowOldItem = (Name, Image, id, key, questions) => {
    temp = [];
    console.log("ShowOldItem Name", Name);
    console.log("ShowOldItem Image", Image);
    console.log("ShowOldItem Id", id);
    console.log("ShowOldItem key", key);

    // var questionList = userCategoryQuestion[key];
    // console.log("SquestionList", questionList);
    // setImageOld(Image);
    // setShowOldQuestion([]);
    // setTimeout(() => {
    //   setShowOldQuestion(questions);
    //   setAddNewItemModal(true);
    //   setAddNewItem(Name);
    //   setIdItem(id);
    // }, 1000);
  };

  useEffect(() => {
    getProfiles();
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
              source={demofaceman}
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
                      {" "}
                      Birthday: April, 14th
                    </Text>
                  </View>
                </View>
                <FilledButton
                  buttonName={AppString.Remove}
                  styleBtn={[Mediumbtn, { marginHorizontal: 10 }]}
                  onPress={() => removeFollowerFriend()}
                />
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
                        // ShowOldItem(
                        //   item.category_name,
                        //   item.user_category_image,
                        //   item.category_id,
                        //   index,
                        //   item.questions
                        // )
                        console.log("ddfdf")
                      }
                      AddNewOnPress={
                        () => console.log("ddfdf")
                        //  AddItemShow(index)
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

            {getFavoriteThingsModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getFavoriteThingsModal}
                onBackdropPress={() => CloseItem()}
              >
                <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                  <View style={CommonStyle.Row}>
                    <View style={{ width: "20%" }}>
                      {/* <Image source={{ uri: getImage }} style={CommonStyle.popupProfileImage} /> */}
                      <Image
                        source={imgImport}
                        style={CommonStyle.popupProfileImage}
                      />
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          CommonStyle.p16,
                          CommonStyle.textUpperCase,
                          { textAlign: "center" },
                        ]}
                      >
                        {getAddNewItem}
                      </Text>
                    </View>
                  </View>

                  <View style={CommonStyle.my16}>
                    <EditShowSimpleView
                      TitleName={"Color"}
                      buttonName={"Demo"}
                    />
                    <EditShowSimpleView
                      TitleName={"Type"}
                      buttonName={"Demo"}
                    />
                    <EditShowSimpleView
                      TitleName={"Amount"}
                      buttonName={"Demo"}
                    />
                    <EditShowSimpleView
                      TitleName={"Vase"}
                      buttonName={"Demo"}
                    />
                    <EditShowSimpleView
                      TitleName={"Link"}
                      buttonName={"Demo"}
                    />
                    <EditShowSimpleView
                      TitleName={"Other Info"}
                      buttonName={"Demo"}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <ImagePOPLinkButton
                      buttonName={AppString.Giftit}
                      buttonImage={imgWhitegift}
                      onPress={() => SendNotificationFav()}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}
            {getNotificationSendModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getNotificationSendModal}
                onBackdropPress={() => CloseItem()}
              >
                <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                  <View style={CommonStyle.Row}>
                    <View style={{ width: "20%" }}>
                      {/* <Image source={{ uri: getImage }} style={CommonStyle.popupProfileImage} /> */}
                      <Image
                        source={imgImport}
                        style={CommonStyle.popupProfileImage}
                      />
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          CommonStyle.p16,
                          CommonStyle.textUpperCase,
                          { textAlign: "center" },
                        ]}
                      >
                        {getAddNewItem}
                      </Text>
                    </View>
                  </View>

                  <Text style={CommonStyle.txtTitle}>{AppString.planning}</Text>

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

                  <Text style={[CommonStyle.txtTitle, { marginTop: 10 }]}>
                    {AppString.FriendsAwesome}
                  </Text>
                </View>
              </Modal>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FriendFollowersList;
