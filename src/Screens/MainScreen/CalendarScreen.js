import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

// Lib
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import DatePicker from "react-native-date-picker";
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import CommonStyle from "../../Assets/Style/CommonStyle";
import TutorialStyle from "../Signup/Tutorial/TutorialStyle";
import { ToolbarMain } from "../../Components/ToolbarMain/ToolbarMain";
import { MainScreenStyle } from "./MainScreenStyle";
import { AppString } from "../../Assets/utils/AppString";
import {
  imgCoffee,
  imgDesserts,
  imgFlowers,
  imgLaptop,
  imgImport,
  imgBook,
  imgDelete,
  imgWhiteChristmas,
  imgWhiteAnniversary,
  imgWhiteBirthday,
  demodp,
} from "../../Assets/utils/Image";
import { COLORS } from "../../Assets/utils/COLORS";
import {
  EditShowBtnSimpleView,
  EditShowSimpleView,
  SimpleInputEditView,
} from "../../Components/FormInput";
import {
  POPLinkButton,
  POPOutLinkButton,
} from "../../Components/Button/Button";
import { CalendarList } from "../../Components/AllListVIew/CalendarList";
import { MyBlackStatusbar } from "../../Components/MyStatusBar/MyBlackStatusbar";
import { FONT } from "../../Assets/utils/FONT";
import { CalSelectCategoriesList } from "./CalendarScreen/CalSelectCategoriesList";
import { useActions } from "../../redux/actions";
import { SelectCategoriesList } from "../../Components/AllListVIew/SelectCategoriesList";

const CalenderDate = [
  {
    "2021-09-25": {
      dots: [
        {
          id: 1,
          key: "vacation",
          color: "blue",
          Name: "Jessica Rockwell",
          NameType: "Birthday",
          selectedDotColor: "blue",
          Name: "Jessica Rockwell",
          NameType: "Birthday",
        },
        {
          id: 2,
          key: "massage",
          color: "blue",
          selectedDotColor: "blue",
          Name: "Gregory Thomson",
          NameType: "Anniversary",
        },
        {
          id: 3,
          key: "workout",
          color: "green",
          Name: "Robert Bob Thomson",
          NameType: "Graduation",
        },
        {
          id: 4,
          key: "workout",
          color: "green",
          Name: "Robert Bob Thomson",
          NameType: "Graduation",
        },
      ],
    },
    "2021-09-26": {
      dots: [
        {
          id: 1,
          key: "vacation",
          color: "blue",
          selectedDotColor: "blue",
          Name: "Jessica Rockwell",
          NameType: "Birthday",
        },
      ],
    },
  },
];

const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

const CalendarScreen = () => {
  const {
    deleteUserCategorySpecialDay,
    updateCategorySpecialMoment,
    getUserCategorySpecialMoment,
    addCategoryspecialDay,
  } = useActions();

  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);
  // console.log("specialMoment ===>", specialMoment);
  // CalenderDate
  const [getLoader, setLoader] = useState(false);

  // Calender
  const [getCalenderDateModal, setCalenderDateModal] = useState(false);
  const [getCalenderDateItem, setCalenderDateItem] = useState([]);

  // specialMoment

  // AddItemSepShow
  const [getAddItemShowSepModal, setAddItemShowSepModal] = useState(false);
  // getEditItemSepModal
  const [getEditItemSepModal, setEditItemSepModal] = useState(false);
  const [getEditSepItem, setEditSepItem] = useState("");

  // User New Special Moment ---> 1.Add New
  const [getUserNewSpecialMomentModal, setUserNewSpecialMomentModal] =
    useState(false);
  const [getUserNewSpecialMomenItem, setUserNewSpecialMomentItem] =
    useState("");
  const [getUserNewSpecialMomenIdItem, setUserNewSpecialMomenIdItem] =
    useState("");

  // UserOldSpecialMoment ---> 1.Edit
  const [getUserOldSpecialMomentModal, setUserOldSpecialMomentModal] =
    useState(false);
  const [getSpecialMomentId, setSpecialMomentId] = useState("");
  const [getuserSpecialMomentId, setuserSpecialMomentId] = useState("");
  const [getspecialMomentName, setspecialMomentName] = useState("");
  const [getuserSpecialMomentTitle, setuserSpecialMomentTitle] = useState("");
  const [getuserSpecialMomentDate, setuserSpecialMomentDate] = useState("");
  const [getspecialMomentLink, setspecialMomentLink] = useState("");
  const [getspecialMomentOtherInfo, setspecialMomentOtherInfo] = useState("");

  const [getSpecialMomentUpdateId, setSpecialMomentUpdateId] = useState("");
  const [getuserSpecialMomentUpdateId, setuserSpecialMomentUpdateId] =
    useState("");
  const [getspecialMomentUpdateName, setspecialMomentUpdateName] = useState("");
  const [getuserSpecialMomentUpdateTitle, setuserSpecialMomentUpdateTitle] =
    useState("");
  const [getuserSpecialMomentUpdateDate, setuserSpecialMomentUpdateDate] =
    useState("");
  const [getspecialMomentUpdateLink, setspecialMomentUpdateLink] = useState("");
  const [getspecialMomentUpdateOtherInfo, setspecialMomentUpdateOtherInfo] =
    useState("");

  const [getImage, setImage] = useState("");
  const [getImageurl, setImageurl] = useState("");

  const [getDateModal, setDateModal] = useState(false);
  const [getUpdateDateModal, setUpdateDateModal] = useState("");
  const [getFinalSepDate, setFinalSepDate] = useState();
  const [date, setDate] = useState(new Date());

  const [getFilterSepCat, setFilterSepCat] = useState(specialMoment);

  const [getPrevData, setPrevData] = useState({});
  useEffect(() => {
    if (userSpecialMoment == "") {
      return;
    }
    getFilterSepCatgories(userSpecialMoment);
  }, []);

  const getFilterSepCatgories = (data) => {
    var dataCategory = specialMoment;
    if (data.length > 0) {
      data.map((items, indexs) => {
        dataCategory = dataCategory.filter((item) => {
          return item.special_moment_id !== items.special_moment_id;
        });
      });
    }
    setFilterSepCat(dataCategory);
    // console.log(getFilterSepCat);
  };
  // const getFilterSepCatgories = (data) => {
  //   var dataCategory = specialMoment;
  //   // data.map((items, indexs) => {
  //   //   dataCategory = dataCategory.filter((item) => {
  //   if (data.length > 0) {
  //     data.map((items, indexs) => {
  //       dataCategory = dataCategory.filter((item) => {
  //         return item.special_moment_id !== items.special_moment_id;
  //       });
  //       return item.special_moment_id !== items.special_moment_id;
  //     });
  //   }
  //   // });

  //   setFilterSepCat(dataCategory);
  //   // console.log(getFilterSepCat);
  // };

  // Close All Item

  const CloseSepItem = () => {
    setAddItemShowSepModal(false);
    setEditItemSepModal(false);
    setCalenderDateModal(false);
    setUserNewSpecialMomentModal(false);
    setUserOldSpecialMomentModal(false);
    setDateModal(false);
    setPrevData({});
  };

  const ImageSepChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImage(image.path);
      setImageurl(image);
      // console.log("image===>", image);
    });
  };

  const EditSubmitData = () => {
    setEditItemSepModal(false);
  };

  const DeleteItem = async (DeletedId) => {
    setUserOldSpecialMomentModal(false);
    setLoader(true);
    const {
      deleteUserCategorySpecialDayResponse,
      deleteUserCategorySpecialDayError,
    } = await deleteUserCategorySpecialDay(DeletedId);
    const {
      getUserCategorySpecialMomentResponse,
      getUserCategorySpecialMomentError,
    } = await getUserCategorySpecialMoment();

    if (
      deleteUserCategorySpecialDayResponse.data.StatusCode == "1" &&
      getUserCategorySpecialMomentResponse.data.StatusCode == "1"
    ) {
      console.log("Add Category Special Moment Done");
      setUserOldSpecialMomentModal(false);
      setLoader(false);
    } else {
      setUserOldSpecialMomentModal(true);
      console.log(
        "NEW CategorySpecialMoment Error",
        deleteUserCategorySpecialDayError
      );
      console.log(
        "NEW CategorySpecialMoment Error",
        getUserCategorySpecialMomentError
      );
    }
  };

  //  Show All Select Moment List (Select Only one) --- 1.Select Moment
  const SelectMoment = (specialMomentName, specialMomentId) => {
    setAddItemShowSepModal(false);
    AddNewItemSepShow(specialMomentName, specialMomentId);
  };

  //  Show Moment (Select Only one) --- 2.Select Moment
  const AddNewItemSepShow = (specialMomentName, specialMomentId) => {
    setUserNewSpecialMomentModal(true);
    // console.log("specialMomentName", specialMomentName);
    // console.log("specialMomentId", specialMomentId);
    setUserNewSpecialMomentItem(specialMomentName);
    setSpecialMomentId(specialMomentId);
  };

  const EnterDate = () => {
    setUserNewSpecialMomentModal(false);
    setDateModal(true);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalSepDate(DateSubstring);
  };
  const SubmitDate = () => {
    setDateModal(false);
    setUserNewSpecialMomentModal(true);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalSepDate(DateSubstring);
  };
  const UpdateEnterDate = () => {
    setEditItemSepModal(false);

    setUpdateDateModal(true);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalSepDate(DateSubstring);
  };
  const UpdateSubmitDate = () => {
    setUpdateDateModal(false);
    setEditItemSepModal(true);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalSepDate(DateSubstring);
  };

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getspecialMomentName) => {
    setUserOldSpecialMomentModal(false);
    setEditItemSepModal(true);
    setEditSepItem(getspecialMomentName);
  };

  // oldUserSpecialMoment --> 1.Open
  const oldUserSpecialMoment = (
    userSpecialMomentId,
    specialMomentId,
    specialMomentName,
    userSpecialMomentTitle,
    userSpecialMomentDate,
    specialMomentLink,
    specialMomentOtherInfo,
    Imageurl
  ) => {
    // console.log("userSpecialMomentId", userSpecialMomentId);
    // console.log("specialMomentId", specialMomentId);
    // console.log("specialMomentName", specialMomentName);
    // console.log("userSpecialMomentTitle", userSpecialMomentTitle);
    // console.log("userSpecialMomentDate", userSpecialMomentDate);
    // console.log("specialMomentLink", specialMomentLink);
    // console.log("specialMomentOtherInfo", specialMomentOtherInfo);
    // console.log("Imageurl", Imageurl);
    setUserOldSpecialMomentModal(true);
    setuserSpecialMomentId(userSpecialMomentId);
    setSpecialMomentId(specialMomentId);
    setspecialMomentName(specialMomentName);
    setuserSpecialMomentTitle(userSpecialMomentTitle);
    setuserSpecialMomentDate(userSpecialMomentDate);
    setImageurl(Imageurl);
    setspecialMomentLink(specialMomentLink);
    setspecialMomentOtherInfo(specialMomentOtherInfo);
  };

  //  Show Moment (Select Only one) --- 3.Submit Data
  const addNewUserSpecialMoment = async () => {
    setUserNewSpecialMomentModal(false);
    setLoader(true);

    const { addCategoryspecialDayResponse, addCategoryspecialDayError } =
      await addCategoryspecialDay(
        getSpecialMomentId,
        getuserSpecialMomentTitle,
        getFinalSepDate,
        getspecialMomentLink,
        getspecialMomentOtherInfo,
        JSON.stringify(getImageurl),
        "0"
      );
    const {
      getUserCategorySpecialMomentResponse,
      getUserCategorySpecialMomentError,
    } = await getUserCategorySpecialMoment();
    if (
      addCategoryspecialDayResponse.data.StatusCode == "1" &&
      getUserCategorySpecialMomentResponse.data.StatusCode == "1"
    ) {
      setPrevData({});
      setImage("");
      setImageurl("");
      getFilterSepCatgories(getUserCategorySpecialMomentResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setLoader(false);
    } else {
      setLoader(false);
      setPrevData({});
      setImage("");
      setImageurl("");
      setUserNewSpecialMomentModal(true);
      console.log(
        "NEW CategorySpecialMoment Error",
        addCategoryspecialDayError
      );
      console.log(
        "NEW CategorySpecialMoment Error",
        getUserCategorySpecialMomentError
      );
    }
  };

  // oldUserSpecialMoment --> 2.Save (API)
  const updateUserSpecialMoment = async () => {
    setLoader(true);
    setAddItemShowSepModal(false);
    setEditItemSepModal(false);
    setUserOldSpecialMomentModal(false);

    const {
      updateCategorySpecialMomentResponse,
      updateCategorySpecialMomentError,
    } = await updateCategorySpecialMoment(
      getuserSpecialMomentId,
      getuserSpecialMomentUpdateTitle,
      getFinalSepDate,
      getspecialMomentUpdateLink,
      getspecialMomentUpdateOtherInfo,
      JSON.stringify(getImageurl)
    );
    const {
      getUserCategorySpecialMomentResponse,
      getUserCategorySpecialMomentError,
    } = await getUserCategorySpecialMoment();

    if (
      updateCategorySpecialMomentResponse.data.StatusCode == "1" &&
      getUserCategorySpecialMomentResponse.data.StatusCode == "1"
    ) {
      console.log("update Category Special Moment Done");
      getFilterSepCatgories(updateCategorySpecialMomentResponse.data.Result);
      setUserNewSpecialMomentModal(false);
      setUserOldSpecialMomentModal(false);
      setLoader(false);
      setPrevData({});
      setImage("");
      setImageurl("");
    } else {
      setUserNewSpecialMomentModal(false);
      setUserOldSpecialMomentModal(false);
      setLoader(false);
      setPrevData({});
      setImage("");
      setImageurl("");
      console.log(
        "updateCategorySpecialMoment Error",
        updateCategorySpecialMomentError
      );
      console.log(
        "getUserCategorySpecialMoment Error",
        getUserCategorySpecialMomentError
      );
    }
  };

  const AddItemSepShow = () => {
    setAddItemShowSepModal(true);
  };

  const CalendarModule = (date) => {
    // console.log("date 1 ==>", date.dateString)

    // console.log("date.dateString 2 ==>", getCalenderDateItem)

    // console.log("Show", getCalenderDateItem == null)

    Object.keys(CalenderDate).forEach(function (key) {
      // setCalenderDateModal(true)
      // CalenderDate[key][date.dateString]["dots"]
      // console.log("===>>>", CalenderDate[key][date.dateString])
      if (CalenderDate[key][date.dateString] != null) {
        setCalenderDateItem(CalenderDate[key][date.dateString]["dots"]);
        setCalenderDateModal(true);
        console.log("True");
      } else {
        console.log("False");
      }
    });
  };

  return (
    <View style={[CommonStyle.BgColorWhite]}>
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={[CommonStyle.BgColorWhite]}
        >
          <View style={CommonStyle.authPage}>
            <View style={[CommonStyle.Container]}>
              <View style={[CommonStyle.my16, CommonStyle.Row]}>
                <Image
                  source={{ uri: userData.userProfileImage }}
                  style={CommonStyle.ProfileImage}
                />
                <Text style={CommonStyle.userName}>
                  {userData.userFname + " " + userData.userLname}
                </Text>
              </View>

              <Text
                style={[
                  CommonStyle.txtTitle,
                  CommonStyle.textUpperCase,
                  { fontFamily: FONT.NotoSans },
                ]}
              >
                {AppString.ExploreMoments}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: COLORS.Secondary,
                paddingHorizontal: 15,
                paddingTop: 15,
              }}
            >
              <ScrollView
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.p8,
                  { justifyContent: "flex-start" },
                ]}
              >
                {userSpecialMoment != ""
                  ? // ? userSpecialMoment.map((item, index) => (
                    userSpecialMoment.length > 0 &&
                    userSpecialMoment.map((item, index) => (
                      <CalendarList
                        ImageUrl={imgWhiteBirthday}
                        ExploreName={item.special_moment_name}
                        Id={item.special_moment_id}
                        index={index}
                        key={index}
                        DataLength={userSpecialMoment.length}
                        ShowBtn={false}
                        onPress={() =>
                          oldUserSpecialMoment(
                            item.user_special_moment_id,
                            item.special_moment_id,
                            item.special_moment_name,
                            item.user_special_moment_title,
                            item.user_special_moment_date,
                            item.special_moment_link,
                            item.special_moment_other_info,
                            item.image
                          )
                        }
                      />
                    ))
                  : null}
                <CalendarList
                  ShowBtn={true}
                  key={1}
                  AddNewOnPress={() => AddItemSepShow(0)}
                />
              </ScrollView>
            </View>

            <View>
              <View style={[CommonStyle.Container, { paddingBottom: 10 }]}>
                <Text
                  style={[
                    CommonStyle.txtTitle,
                    CommonStyle.textUpperCase,
                    { fontFamily: FONT.NotoSans, fontWeight: "100" },
                  ]}
                >
                  {AppString.FriendSpecialMoments}
                </Text>
              </View>

              <Calendar
                // Specify style for calendar container element. Default = {}
                // style={{
                //     borderWidth: 1,
                //     borderColor: 'gray',
                //     height: 350
                // }}
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                onDayPress={(date) => CalendarModule(date)}
                // Handler which gets executed on day long press. Default = undefined
                // onDayLongPress={(day) => { console.log('selected day', day) }}
                // MarkedDates
                markedDates={CalenderDate[0]}
                // markedDates={{
                //     '2021-09-25': {
                //         dots: [
                //             {
                //                 key: 'vacation',
                //                 color: 'blue',
                //                 selectedDotColor: 'blue'
                //             },
                //             // {
                //             //     key: 'massage',
                //             //     color: 'blue',
                //             //     selectedDotColor: 'blue'
                //             // },
                //             // {
                //             //     key: 'workout',
                //             //     color: 'green'
                //             // }
                //         ]
                //     },
                // }}

                markingType={"multi-dot"}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
                theme={{
                  backgroundColor: COLORS.Secondary,
                  calendarBackground: COLORS.Secondary,
                  textSectionTitleColor: "#b6c1cd",
                  textSectionTitleDisabledColor: "#d9e1e8",
                  selectedDayBackgroundColor: COLORS.Secondary,
                  selectedDayTextColor: COLORS.white,
                  todayTextColor: COLORS.gold,
                  dayTextColor: "#2d4150",
                  textDisabledColor: "#d9e1e8",
                  dotColor: "#00adf5",
                  selectedDotColor: COLORS.Primary,
                  arrowColor: COLORS.black,
                  disabledArrowColor: COLORS.PrimaryLight,
                  monthTextColor: COLORS.black,
                  indicatorColor: COLORS.black,
                  textDayFontFamily: FONT.Gilroy,
                  textMonthFontFamily: FONT.Gilroy,
                  textDayHeaderFontFamily: FONT.Gilroy,
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  // textDayFontSize: 16,
                  // textMonthFontSize: 16,
                  // textDayHeaderFontSize: 16
                }}
              />
            </View>

            {/* Calendar Date Model */}
            {getCalenderDateModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getCalenderDateModal}
                onBackdropPress={() => CloseSepItem()}
              >
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          CommonStyle.textUpperCase,
                          { textAlign: "center", paddingBottom: 16 },
                        ]}
                      >
                        Sep 25th
                      </Text>
                    </View>
                    {/* <View> */}
                    {
                      getCalenderDateItem.length ? (
                        getCalenderDateItem.map((item, index) => {
                          return (
                            <View
                              style={[
                                CommonStyle.Row,
                                // CommonStyle.pb16,
                                { paddingBottom: 16 },
                              ]}
                            >
                              <Image
                                source={demodp}
                                style={CommonStyle.bottomBarImg}
                              />
                              <Text style={CommonStyle.txtFrienduserName}>
                                {item.Name}
                              </Text>
                              <Text
                                style={
                                  (CommonStyle.txtFrienduserName,
                                  CommonStyle.textUpperCase,
                                  {
                                    color: COLORS.PrimaryLight,
                                    marginLeft: 16,
                                  })
                                }
                              >
                                {item.NameType}
                              </Text>
                            </View>
                          );
                        })
                      ) : (
                        <Text>null</Text>
                      )
                      // null
                    }
                    {/* </View> */}
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

            {/* Show Select Moment Date List --- 1. Show */}
            {getUserOldSpecialMomentModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getUserOldSpecialMomentModal}
                onBackdropPress={() => CloseSepItem()}
              >
                <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <View style={{ width: "20%" }}>
                      {getImageurl != "" ? (
                        <Image
                          source={{ uri: getImageurl }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
                      )}
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[CommonStyle.txtTitle, { textAlign: "center" }]}
                      >
                        {getspecialMomentName}
                      </Text>
                    </View>
                    <View style={{ width: "20%" }}>
                      <TouchableOpacity
                        onPress={() => DeleteItem(getuserSpecialMomentId)}
                      >
                        <Image
                          source={imgDelete}
                          style={CommonStyle.imgIconSize}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={CommonStyle.my16}>
                    <EditShowSimpleView
                      TitleName={"Title"}
                      placeholder={getuserSpecialMomentTitle}
                    />
                    <EditShowSimpleView
                      TitleName={"Date"}
                      placeholder={getuserSpecialMomentDate}
                    />
                    <EditShowSimpleView
                      TitleName={"Link"}
                      placeholder={getspecialMomentLink}
                    />
                    <EditShowSimpleView
                      TitleName={"Other Info"}
                      placeholder={getspecialMomentOtherInfo}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <POPOutLinkButton
                      buttonName={AppString.Cancel}
                      onPress={() => CloseSepItem()}
                    />

                    <POPLinkButton
                      buttonName={AppString.Edit}
                      onPress={() => AddEditItem(getspecialMomentName)}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}

            {/* Show Select Moment Date List --- 2. Update new date */}
            {getEditItemSepModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getEditItemSepModal}
                onBackdropPress={() => CloseSepItem()}
              >
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <View style={CommonStyle.Row}>
                        <View style={{ width: "20%" }}>
                          <TouchableOpacity onPress={() => ImageSepChange()}>
                            {getImage != "" ? (
                              <Image
                                source={{ uri: getImage }}
                                style={Styles.popupImage}
                              />
                            ) : (
                              <Image
                                source={imgImport}
                                style={Styles.popupImage}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={{ width: "80%" }}>
                          <Text
                            style={[
                              CommonStyle.txtTitle,
                              CommonStyle.p16,
                              { textAlign: "center" },
                            ]}
                          >
                            EDIT {getEditSepItem}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={CommonStyle.my16}>
                      <SimpleInputEditView
                        TitleName={"Title"}
                        placeholder={"Title"}
                        defaultValue={getPrevData.Title}
                        onChangeText={(Title) => {
                          setuserSpecialMomentUpdateTitle(Title);
                          setPrevData({
                            ...getPrevData,
                            Title: Title,
                          });
                        }}
                      />
                      <EditShowBtnSimpleView
                        TitleName={"Date"}
                        placeholder={
                          getFinalSepDate != null ? getFinalSepDate : "Date"
                        }
                        onPress={() => UpdateEnterDate()}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        placeholder={"Link"}
                        defaultValue={getPrevData.Link}
                        onChangeText={(Link) => {
                          setspecialMomentUpdateLink(Link);
                          setPrevData({
                            ...getPrevData,
                            Link: Link,
                          });
                        }}
                      />
                      <SimpleInputEditView
                        TitleName={"Other Info"}
                        placeholder={"Other Info"}
                        defaultValue={getPrevData.OtherInfo}
                        onChangeText={(OtherInfo) => {
                          setspecialMomentUpdateOtherInfo(OtherInfo);
                          setPrevData({
                            ...getPrevData,
                            OtherInfo: OtherInfo,
                          });
                        }}
                      />
                    </View>

                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseSepItem()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Save}
                        // onPress={() => EditSubmitData()}
                        onPress={() => updateUserSpecialMoment()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}
            {getDateModal == true ? (
              <Modal testID={"modal"} isVisible={getDateModal}>
                <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          CommonStyle.textUpperCase,
                          { textAlign: "center", marginTop: 10 },
                        ]}
                      ></Text>
                    </View>
                  </View>

                  <View style={CommonStyle.my16}>
                    <DatePicker
                      mode={"date"}
                      date={date}
                      onDateChange={setDate}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <POPLinkButton
                      buttonName={AppString.Save}
                      onPress={() => SubmitDate()}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}

            {getUpdateDateModal == true ? (
              <Modal testID={"modal"} isVisible={getUpdateDateModal}>
                <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "100%" }}>
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          CommonStyle.textUpperCase,
                          { textAlign: "center", marginTop: 10 },
                        ]}
                      ></Text>
                    </View>
                  </View>

                  <View style={CommonStyle.my16}>
                    <DatePicker
                      mode={"date"}
                      date={date}
                      onDateChange={setDate}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <POPLinkButton
                      buttonName={AppString.Save}
                      onPress={() => UpdateSubmitDate()}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}

            {/* Show All Select Moment List ---- 1. Select Moment*/}
            {getAddItemShowSepModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getAddItemShowSepModal}
                onBackdropPress={() => CloseSepItem()}
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
                      SELECT {AppString.SelectMoment}
                    </Text>
                    <View>
                      <ScrollView
                        contentContainerStyle={[
                          MainScreenStyle.scrollItemStyle,
                        ]}
                      >
                        {getFilterSepCat.length > 0 &&
                          getFilterSepCat.map((item, index) => (
                            <SelectCategoriesList
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

                        {/* {getFilterSepCat.map((item, index) => (
                          <SelectCategoriesList
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
                        ))} */}
                      </ScrollView>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

            {/* Show All Select Moment List ---- 1.Add New Select Moment*/}
            {getUserNewSpecialMomentModal == true ? (
              <Modal testID={"modal"} isVisible={getUserNewSpecialMomentModal}>
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <View style={CommonStyle.Row}>
                        <View style={{ width: "20%" }}>
                          <TouchableOpacity onPress={() => ImageSepChange()}>
                            {getImage != "" ? (
                              <Image
                                source={{ uri: getImage }}
                                style={Styles.popupImage}
                              />
                            ) : (
                              <Image
                                source={imgImport}
                                style={Styles.popupImage}
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                        <View style={CommonStyle.PopModalWidth60}>
                          <Text
                            style={[
                              CommonStyle.txtTitle,
                              CommonStyle.p16,
                              { textAlign: "center" },
                            ]}
                          >
                            NEW {getUserNewSpecialMomenItem}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={CommonStyle.my16}>
                      <SimpleInputEditView
                        TitleName={"Title"}
                        placeholder={"Title"}
                        defaultValue={getPrevData.Title}
                        onChangeText={(Title) => {
                          setuserSpecialMomentTitle(Title);
                          setPrevData({
                            ...getPrevData,
                            Title: Title,
                          });
                        }}
                      />
                      <EditShowBtnSimpleView
                        TitleName={"Date"}
                        placeholder={
                          getFinalSepDate != null ? getFinalSepDate : "Date"
                        }
                        onPress={() => EnterDate()}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        placeholder={"Link"}
                        defaultValue={getPrevData.Link}
                        onChangeText={(Link) => {
                          setspecialMomentLink(Link);
                          setPrevData({
                            ...getPrevData,
                            Link: Link,
                          });
                        }}
                      />
                      <SimpleInputEditView
                        TitleName={"Other Info"}
                        placeholder={"Other Info"}
                        defaultValue={getPrevData.OtherInfo}
                        onChangeText={(OtherInfo) => {
                          setspecialMomentOtherInfo(OtherInfo);
                          setPrevData({
                            ...getPrevData,
                            OtherInfo: OtherInfo,
                          });
                        }}
                      />
                    </View>

                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseSepItem()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Save}
                        onPress={() => addNewUserSpecialMoment()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}
          </View>
        </ScrollView>
        <Spinner visible={getLoader} />
      </SafeAreaView>
    </View>
  );
};

const Styles = StyleSheet.create({
  popupImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
});

export default CalendarScreen;
