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
  imgRing,
  imgBook,
  imgDelete,
  imgWhiteChristmas,
  imgWhiteAnniversary,
  imgWhiteBirthday,
  demodp,
} from "../../Assets/utils/Image";
import { COLORS } from "../../Assets/utils/COLORS";
import {
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

  const [getCalenderDateModal, setCalenderDateModal] = useState(false);
  const [getCalenderDateItem, setCalenderDateItem] = useState([]);

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getAddItemShowItem, setAddItemShowItem] = useState("");

  // getEditItemModal
  const [getEditItemModal, setEditItemModal] = useState(false);
  const [getEditItem, setEditItem] = useState("");

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
  const [getUserOldSpecialMomenItem, setUserOldSpecialMomentItem] =
    useState("");
  const [getUserOldSpecialMomentDate, setUserOldSpecialMomentDate] =
    useState("");
  const [getUserOldSpecialMomentId, setUserOldSpecialMomentId] = useState("");
  const [getFinaldate, setFinalDate] = useState();
  const [date, setDate] = useState(new Date());

  const [getFilterCat, setFilterCat] = useState(specialMoment);

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

  // Close All Item
  const CloseItem = () => {
    setAddItemShowModal(false);
    setEditItemModal(false);
    setUserOldSpecialMomentModal(false);
    setCalenderDateModal(false);
    setUserNewSpecialMomentModal(false);
    setUserOldSpecialMomentModal(false);
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

  const addNewUserSpecialMoment = async () => {
    setUserNewSpecialMomentModal(false);
    setLoader(true);
    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalDate(DateSubstring);

    const { addCategoryspecialDayResponse, addCategoryspecialDayError } =
      await addCategoryspecialDay(
        getUserNewSpecialMomenIdItem,
        getFinaldate,
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
      getFilterCatgories(getUserCategorySpecialMomentResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setLoader(false);
    } else {
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

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getUserOldSpecialMomenItem) => {
    setUserOldSpecialMomentModal(false);
    setEditItemModal(true);
    setEditItem(getUserOldSpecialMomenItem);
  };

  // oldUserSpecialMoment --> 1.Open
  const oldUserSpecialMoment = (
    userSpecialMomentname,
    userSpecialMomentDate,
    userSpecialMomentId
  ) => {
    console.log("oldUserSpecialMoment Name", userSpecialMomentname);
    console.log("oldUserSpecialMoment Date", userSpecialMomentDate);
    console.log("oldUserSpecialMoment Id", userSpecialMomentId);
    setUserOldSpecialMomentModal(true);
    setUserOldSpecialMomentItem(userSpecialMomentname);
    setUserOldSpecialMomentDate(userSpecialMomentDate);
    setUserOldSpecialMomentId(userSpecialMomentId);
  };
  // oldUserSpecialMoment --> 2.Save (API)
  const updateUserSpecialMoment = async () => {
    setLoader(true);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setUserOldSpecialMomentModal(false);

    var DateSubstring =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    setFinalDate(DateSubstring);

    const {
      updateCategorySpecialMomentResponse,
      updateCategorySpecialMomentError,
    } = await updateCategorySpecialMoment(
      getUserOldSpecialMomentId,
      getFinaldate
    );
    const {
      getUserCategorySpecialMomentResponse,
      getUserCategorySpecialMomentError,
    } = await getUserCategorySpecialMoment();

    if (
      updateCategorySpecialMomentResponse.data.StatusCode == "1" &&
      getUserCategorySpecialMomentResponse
    ) {
      console.log("update Category Special Moment Done");
      getFilterCatgories(updateCategorySpecialMomentResponse.data.Result);
      setUserNewSpecialMomentModal(false);
      setUserOldSpecialMomentModal(false);
      setLoader(false);
    } else {
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

  const AddItemShow = () => {
    setAddItemShowModal(true);
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
                  ? userSpecialMoment.map((item, index) => (
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
                            item.special_moment_name,
                            item.user_special_moment_value,
                            item.user_special_moment_id
                          )
                        }
                      />
                    ))
                  : null}
                <CalendarList
                  ShowBtn={true}
                  key={1}
                  AddNewOnPress={() => AddItemShow(0)}
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
                onBackdropPress={() => CloseItem()}
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
                onBackdropPress={() => CloseItem()}
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
                      <View style={{ width: "80%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            { textAlign: "center" },
                          ]}
                        >
                          {getUserOldSpecialMomenItem}
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <TouchableOpacity
                          onPress={() => DeleteItem(getUserOldSpecialMomentId)}
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
                        TitleName={"Date"}
                        placeholder={getUserOldSpecialMomentDate}
                      />
                    </View>

                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseItem()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Edit}
                        onPress={() => AddEditItem()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}
            {/* Show Select Moment Date List --- 2. Update new date */}
            {getEditItemModal == true ? (
              <Modal testID={"modal"} isVisible={getEditItemModal}>
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            CommonStyle.textUpperCase,
                            { textAlign: "center", marginTop: 10 },
                          ]}
                        >
                          {getUserOldSpecialMomenItem}
                        </Text>
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
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseItem()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Save}
                        onPress={() => updateUserSpecialMoment()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

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

            {/* Show All Select Moment List ---- 1.Add New Select Moment*/}
            {getUserNewSpecialMomentModal == true ? (
              <Modal testID={"modal"} isVisible={getUserNewSpecialMomentModal}>
                <KeyboardAvoidingView
                  behavior="position"
                  keyboardVerticalOffset={keyboardVerticalOffset}
                >
                  <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "100%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            CommonStyle.textUpperCase,
                            { textAlign: "center", marginTop: 10 },
                          ]}
                        >
                          {getUserNewSpecialMomenItem}
                        </Text>
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
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseItem()}
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

export default CalendarScreen;
