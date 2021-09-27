import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from "react-native";

// Lib
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";

// Asset
import { imgbirthdayCakeGary } from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { ToolbarMain } from "../../../Components/ToolbarMain/ToolbarMain";
import { COLORS } from "../../../Assets/utils/COLORS";
import { FilledButton, POPLinkButton } from "../../../Components/Button/Button";
import { Mediumbtn } from "../../../Components/Button/ButtonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { ProfileScreenStyle } from "./ProfileScreenStyle";
import {
  imgWhiteShare,
  imgBackleftWhite,
  imgWhiteBirthday,
  imgProfileBackground,
  imgCoffee,
  imgDesserts,
  imgFlowers,
  imgLaptop,
  imgRing,
  imgBook,
} from "../../../Assets/utils/Image";
import { MainScreenStyle } from "../MainScreenStyle";
import { CalendarList } from "../../../Components/AllListVIew/CalendarList";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { ProfileToolBar } from "../../../Components/ProfileToolBar/ProfileToolBar";
import { useActions } from "../../redux/actions";
import { FONT } from "../../../Assets/utils/FONT";
import { ShareAppLink } from "../../../Assets/utils/ShareLink";
import { CalSelectCategoriesList } from "../CalendarScreen/CalSelectCategoriesList";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";

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
  {
    id: 3,
    Name: AppString.Flowers,
    Image: imgFlowers,
  },
  {
    id: 4,
    Name: AppString.Laptop,
    Image: imgLaptop,
  },
  {
    id: 5,
    Name: AppString.Ring,
    Image: imgRing,
  },
  {
    id: 6,
    Name: AppString.Book,
    Image: imgBook,
  },
  {
    id: 7,
    Name: AppString.Dessert,
    Image: imgDesserts,
  },
];
const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

const MyProfile = ({ navigation }) => {
  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);

  useEffect(() => {
    if (userSpecialMoment == "") {
      return;
    }
    getFilterCatgories(userSpecialMoment);
  }, []);

  const getFilterCatgories = (data) => {
    var dataCategory = specialMoment;
    data.map((items, indexs) => {
      dataCategory = dataCategory.filter((item) => {
        return item.special_moment_id !== items.special_moment_id;
      });
    });
    setFilterCat(dataCategory);
    // console.log(getFilterCat);
  };

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getUserNewSpecialMomenItem, setUserNewSpecialMomentItem] =
    useState("");
  // User New Special Moment ---> 1.Add New
  const [getUserNewSpecialMomentModal, setUserNewSpecialMomentModal] =
    useState(false);

  const [getFilterCat, setFilterCat] = useState(specialMoment);

  //  Show All Select Moment List (Select Only one)
  const AddItemShow = () => {
    setAddItemShowModal(true);
  };
  //  Show All Select Moment List (Select Only one) --- 1.Select Moment
  const SelectMoment = (specialMomentName, specialMomentId) => {
    setAddItemShowModal(false);
    AddNewItemShow(specialMomentName, specialMomentId);
  };
  //  Show Moment (Select Only one) --- 2.Select Moment
  const AddNewItemShow = (specialMomentName, specialMomentId) => {
    setUserNewSpecialMomentModal(true);
    console.log("specialMomentName", specialMomentName);
    console.log("specialMomentId", specialMomentId);
    setUserNewSpecialMomentItem(specialMomentName);
    setUserNewSpecialMomenIdItem(specialMomentId);
  };

  return (
    <View style={[CommonStyle.BgColorWhite, CommonStyle.mb10]}>
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
            <TouchableOpacity>
              <Image
                // source={imgBackleftWhite}
                // style={CommonStyle.imgIconSize}
                source={{}}
                style={{}}
              />
            </TouchableOpacity>
            <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>
              MyProfile
            </Text>
            <TouchableOpacity onPress={() => ShareAppLink()}>
              <Image source={imgWhiteShare} style={CommonStyle.imgIconSize} />
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
              source={{ uri: userData.userProfileImage }}
              style={CommonStyle.imgProfileBackground}
            ></ImageBackground>
            <Image
              source={imgProfileBackground}
              style={CommonStyle.imgmaskbg}
            />
          </View>

          <View style={[CommonStyle.Container]}>
            <View style={[CommonStyle.my16, CommonStyle.Row]}>
              <View style={ProfileScreenStyle.NameAndEditbg}>
                <View>
                  <Text style={ProfileScreenStyle.userName}>
                    {userData.userFname + " " + userData.userLname}
                  </Text>
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
                <POPLinkButton
                  buttonName={AppString.Edit}
                  styleBtn={Mediumbtn}
                  onPress={() => navigation.navigate("EditProfile")}
                />
              </View>
            </View>

            <View style={[ProfileScreenStyle.MomentStatus]}>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  1
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
                  10k
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
                  920
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
                {Data.map((item, index) => (
                  <CalendarList
                    ImageUrl={item.Image}
                    ExploreName={item.Name}
                    Id={item.id}
                    index={index}
                    key={index}
                    DataLength={Data.length}
                    onPress={() => {}}
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
                {userSpecialMoment != ""
                  ? userSpecialMoment.map((item, index) => (
                      <CalendarList
                        ImageUrl={imgWhiteBirthday}
                        ExploreName={item.special_moment_name}
                        Id={item.special_moment_id}
                        index={index}
                        key={index}
                        DataLength={userSpecialMoment.length}
                        ShowBtn={false}
                        onPress={
                          () => {}
                          // oldUserSpecialMoment(
                          //   item.special_moment_name,
                          //   item.user_special_moment_value,
                          //   item.user_special_moment_id
                          // )
                        }
                      />
                    ))
                  : null}
                <CalendarList
                  ShowBtn={true}
                  key={1}
                  AddNewOnPress={() => AddItemShow(0)}
                />

                {/* Show All Select Moment List ---- 1. Select Moment*/}
                {getAddItemShowModal == true ? (
                  <Modal
                    testID={"modal"}
                    isVisible={getAddItemShowModal}
                    onBackdropPress={() => CloseItem()}
                  >
                    <KeyboardAvoidingView
                      behavior="position"
                      keyboardVerticalOffset={keyboardVerticalOffset}
                    >
                      <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            CommonStyle.pb16,
                            CommonStyle.textUpperCase,
                            { textAlign: "center" },
                          ]}
                        >
                          {AppString.SelectMoment}
                        </Text>
                        <View>
                          <ScrollView
                            contentContainerStyle={[
                              MainScreenStyle.scrollItemStyle,
                            ]}
                          >
                            {getFilterCat.map((item, index) => (
                              <CalSelectCategoriesList
                                ImageUrl={imgWhiteBirthday}
                                ExploreName={item.special_moment_name}
                                Id={item.special_moment_id}
                                index={index}
                                key={index}
                                DataLength={specialMoment.length}
                                style={{ width: "23%" }}
                                onPress={() => {
                                  SelectMoment(
                                    item.special_moment_name,
                                    item.special_moment_id
                                  );
                                }}
                              />
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    </KeyboardAvoidingView>
                  </Modal>
                ) : null}
                {/* {Data.map((item, index) => (
                  <CalendarList
                    ImageUrl={item.Image}
                    ExploreName={item.Name}
                    Id={item.id}
                    index={index}
                    key={index}
                    DataLength={Data.length}
                    onPress={() => {}}
                  />
                ))} */}
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const Styles = StyleSheet.create({});

export default MyProfile;
