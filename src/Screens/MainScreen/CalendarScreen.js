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
import { imgPlaceHolder, imgImport, imgDelete } from "../../Assets/utils/Image";
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
import {
  CalendarList,
  Column3CalendarList,
} from "../../Components/AllListVIew/CalendarList";
import { MyBlackStatusbar } from "../../Components/MyStatusBar/MyBlackStatusbar";
import { FONT } from "../../Assets/utils/FONT";
import { CalSelectCategoriesList } from "./CalendarScreen/CalSelectCategoriesList";
import { useActions } from "../../redux/actions";
import {
  PopUpSelectCategoriesList,
  SelectCategoriesList,
} from "../../Components/AllListVIew/SelectCategoriesList";
import Purchases from "react-native-purchases";
import Moment from "moment";
import { ImageUrl } from "../../Assets/utils/ImageUrl";
import { trim } from "lodash";
const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

const CalendarScreen = ({ navigation }) => {
  const {
    deleteUserCategorySpecialDay,
    updateCategorySpecialMoment,
    getUserCategorySpecialMoment,
    addCategoryspecialDay,
    getFriendCategorySpecialMoment,
    userSubscription,
    getProfile,
  } = useActions();

  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);
  const [specialDayLimit, setSpecialDayLimits] = useState(2);
  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState("0");

  // Payment for upgrade
  const [getupgradeItemModal, setupgradeItemModal] = useState(false);

  // console.log("specialMoment ===>", specialMoment);
  // CalenderDate
  const [getLoader, setLoader] = useState(false);

  // Calender
  const [getCalenderDateModal, setCalenderDateModal] = useState(false);
  const [getCalenderDateItem, setCalenderDateItem] = useState([]);
  const [getCalenderDateFriend, setCalenderDateFriend] = useState({});
  const [getCalenderDateFriendList, setCalenderDateFriendList] = useState([]);

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

  const [getImage, setImage] = useState("");
  const [getImageurl, setImageurl] = useState("");

  const [getDateModal, setDateModal] = useState(false);
  const [getUpdateDateModal, setUpdateDateModal] = useState("");
  const [getFinalSepDate, setFinalSepDate] = useState("");
  const [date, setDate] = useState(new Date());

  const [getFilterSepCat, setFilterSepCat] = useState(specialMoment);

  const [getPrevData, setPrevData] = useState({});

  useEffect(() => {
    if (userSpecialMoment == "") {
      return;
    }
    getFilterSepCatgories(userSpecialMoment);
  }, []);

  const handleSubmitPayment = async () => {
    // setLoading(true);
    // HapticFeedback.trigger("impactLight");
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
      CloseSepItem();
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
        CloseSepItem();
        getProfileLoad();
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

  const getFriendCategorySpecialMoments = async (date) => {
    const { friendCategorySpeciaResponse, friendCategorySpeciaError } =
      await getFriendCategorySpecialMoment(date);
    if (friendCategorySpeciaResponse.data.StatusCode == "1") {
      var data = friendCategorySpeciaResponse.data.Result;
      setCalenderDateFriendList(data);
      const sortedActivities = data.sort(
        (a, b) =>
          b.user_special_moment_current_year_value -
          a.user_special_moment_current_year_value
      );

      var objectWithGroupByName = {};

      for (var key in sortedActivities) {
        var dateInfo =
          sortedActivities[key].user_special_moment_current_year_value;
        objectWithGroupByName[dateInfo] = {
          customStyles: {
            container: {
              backgroundColor: "black",
            },
            text: {
              color: "white",
              fontWeight: "bold",
            },
          },
        };
      }

      if (objectWithGroupByName) {
        setCalenderDateFriend(objectWithGroupByName);
      }
      console.log(sortedActivities);
    }
  };

  const onChangeDate = (date) => {
    var dateString = Moment(date.dateString).format("YYYY-MM-DD").toString();
    getFriendCategorySpecialMoments(dateString);
  };

  useEffect(() => {
    var dateString = Moment(new Date()).format("YYYY-MM-DD").toString();
    getFriendCategorySpecialMoments(dateString);
  }, []);

  // Close All Item

  const CloseSepItem = () => {
    setPrevData({});
    setImage("");
    setImageurl("");
    setFinalSepDate("");
    setAddItemShowSepModal(false);
    setEditItemSepModal(false);
    setCalenderDateModal(false);
    setUserNewSpecialMomentModal(false);
    setUserOldSpecialMomentModal(false);
    setDateModal(false);
    setuserSpecialMomentDate("");
    setupgradeItemModal(false);
  };

  // Image Sep Change
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

  // Delete Item Moment
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
      getFilterSepCatgories(getUserCategorySpecialMomentResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setUserOldSpecialMomentModal(false);
      setFinalSepDate("");
      setuserSpecialMomentDate("");
      setLoader(false);
    } else {
      setFinalSepDate("");
      setuserSpecialMomentDate("");
      setLoader(false);
      setUserOldSpecialMomentModal(false);
      console.log(
        "NEW deleteUserCategorySpecialDay Error",
        deleteUserCategorySpecialDayError
      );
      console.log(
        "NEW getUserCategorySpecialMoment Error",
        getUserCategorySpecialMomentError
      );
    }
  };

  //  Show All Select Moment List (Select Only one) --- 1.Select Moment
  const SelectMoment = (specialMomentName, specialMomentId) => {
    setAddItemShowSepModal(false);
    AddNewItemSepShow(specialMomentName, specialMomentId);
    setFinalSepDate("");
  };

  //  Show Moment (Select Only one) --- 2.Select Moment
  const AddNewItemSepShow = (specialMomentName, specialMomentId) => {
    setUserNewSpecialMomentModal(true);
    // console.log("specialMomentName", specialMomentName);
    // console.log("specialMomentId", specialMomentId);
    setUserNewSpecialMomentItem(specialMomentName);
    setSpecialMomentId(specialMomentId);
  };

  // Date - 1
  const EnterDate = () => {
    setUserNewSpecialMomentModal(false);
    setDateModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
  };
  // Date - 2
  const SubmitDate = () => {
    setDateModal(false);
    setUserNewSpecialMomentModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
  };
  // Date - 3
  const UpdateEnterDate = () => {
    setEditItemSepModal(false);
    setUpdateDateModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
    // setuserSpecialMomentDate(DateSubstring);
  };
  // Date - 4
  const UpdateSubmitDate = () => {
    setUpdateDateModal(false);
    setEditItemSepModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
  };

  // Old Select Categories -- > Edit Item
  const AddEditSepItem = (getspecialMomentName) => {
    setUserOldSpecialMomentModal(false);
    setEditItemSepModal(true);
    setEditSepItem(getspecialMomentName);
    setFinalSepDate(getuserSpecialMomentDate);
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
    setImage(Imageurl);
    // setImageurl(Imageurl);
    setspecialMomentLink(specialMomentLink);
    setspecialMomentOtherInfo(specialMomentOtherInfo);
  };

  const onClearSpecialMoment = () => {
    setFinalSepDate("");
    setSpecialMomentId("");
    setuserSpecialMomentTitle("");
    setspecialMomentLink("");
    setspecialMomentOtherInfo("");
    setImage("");
    setImageurl("");
  };

  //  Show Moment (Select Only one) --- 3.Submit Data
  const addNewUserSpecialMoment = async () => {
    setUserNewSpecialMomentModal(false);
    setLoader(true);

    // if (!getFinalSepDate) {
    //   getFinalDataShow("");
    //      ;
    // } else {
    //   getFinalDataShow(getFinalSepDate);
    //      ;
    // }
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
      setFinalSepDate("");
      onClearSpecialMoment();
      getFilterSepCatgories(getUserCategorySpecialMomentResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setLoader(false);
    } else {
      setLoader(false);
      setPrevData({});
      setImage("");
      onClearSpecialMoment();
      setImageurl("");
      setFinalSepDate("");
      setUserNewSpecialMomentModal(false);
      console.log(
        "NEW addCategoryspecialDayError Error",
        addCategoryspecialDayError
      );
      console.log(
        "NEW getUserCategorySpecialMomentError Error",
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
      getuserSpecialMomentTitle,
      getFinalSepDate,
      getspecialMomentLink,
      getspecialMomentOtherInfo,
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
      onClearSpecialMoment();
      setImageurl("");
      setFinalSepDate("");
      setuserSpecialMomentDate("");
    } else {
      setUserNewSpecialMomentModal(false);
      setUserOldSpecialMomentModal(false);
      setLoader(false);
      setPrevData({});
      setImage("");
      setImageurl("");
      onClearSpecialMoment();
      setFinalSepDate("");
      setuserSpecialMomentDate("");
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

  // AddItemSepShow
  const AddItemSepShow = () => {
    setAddItemShowSepModal(true);
    setFinalSepDate("");
  };

  const CalendarModule = (date) => {
    var dateString = date.dateString;
    var dataCategory = getCalenderDateFriendList;
    var calenderDateFriendList = [];
    if (dataCategory.length > 0) {
      dataCategory = dataCategory.filter((item) => {
        return item.user_special_moment_current_year_value == dateString;
      });
      calenderDateFriendList = dataCategory;
    }

    if (calenderDateFriendList.length > 0) {
      setCalenderDateItem(calenderDateFriendList);
      setCalenderDateModal(true);
    }

    // Object.keys(CalenderDate).forEach(function (key) {
    //   // setCalenderDateModal(true)
    //   // CalenderDate[key][date.dateString]["dots"]
    //   // console.log("===>>>", CalenderDate[key][date.dateString])
    //   if (CalenderDate[key][date.dateString] != null) {
    //     setCalenderDateItem(CalenderDate[key][date.dateString]["dots"]);
    //     setCalenderDateModal(true);
    //     console.log("True");
    //   } else {
    //     console.log("False");
    //   }
    // });
  };

  // Payment for upgrade

  const upgradeItem = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode) {
      var isActive =
        profileResponse.data.Result[0].user_details[0].user_subscription_status;
      if (isActive == "1") {
        AddItemSepShow(0);
      } else {
        setupgradeItemModal(true);
      }
    }
  };

  const getProfileLoad = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode == "1") {
      var userDetails = profileResponse.data.Result[0].user_details[0];
      setUserSubscriptionStatus(userDetails.user_subscription_status);
      setSpecialDayLimits(userDetails.special_day_limit);
    }
    var dateString = Moment(new Date()).format("YYYY-MM-DD").toString();
    getFriendCategorySpecialMoments(dateString);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getProfileLoad();
    });
  }, []);

  const CalendarOpenProfile = (userSpecialMomentId) => {
    console.log("userSpecialMomentId ====>", userSpecialMomentId);
    // userInfo
    setCalenderDateModal(false);
    navigation.navigate("FriendFollowersList", {
      userID: userSpecialMomentId,
    });
  };

  return (
    <View style={[CommonStyle.BgColorWhite]}>
      {/* <MyBlackStatusbar /> */}
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
                  source={
                    userData.userProfileImage == "" ||
                    userData.userProfileImage == undefined
                      ? imgPlaceHolder
                      : { uri: userData.userProfileImage }
                  }
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
                {AppString.Mymoments}
              </Text>
            </View>

            {/* user Special Moment */}
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
                  CommonStyle.toppadding16,
                ]}
              >
                {userSpecialMoment.length > 0 &&
                  userSpecialMoment.map((item, index) => (
                    // <CalendarList
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
                  ))}

                <View>
                  {userSubscriptionStatus == "1" &&
                  userSpecialMoment.length == specialDayLimit ? (
                    <View />
                  ) : (
                    <CalendarList
                      ShowBtn={true}
                      key={1}
                      AddNewOnPress={() => {
                        userSpecialMoment.length < specialDayLimit
                          ? AddItemSepShow(0)
                          : upgradeItem();
                      }}
                    />
                  )}
                </View>
              </ScrollView>
            </View>

            {/* Friend Special Moments */}
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
                markingType={"custom"}
                onMonthChange={(date) => onChangeDate(date)}
                markedDates={getCalenderDateFriend}
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
                        {Moment(
                          getCalenderDateItem[0].user_special_moment_value
                        ).format("MMM DD") + "th"}
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
                                source={
                                  item.user_profile_image == "" ||
                                  item.user_profile_image == undefined ||
                                  item.user_profile_image == null
                                    ? imgPlaceHolder
                                    : { uri: item.user_profile_image }
                                }
                                style={[
                                  CommonStyle.bottomBarImg,
                                  { borderRadius: 34 },
                                ]}
                              />
                              <TouchableOpacity
                                style={{
                                  flex: 1,
                                  marginRight: 15,
                                  justifyContent: "center",
                                }}
                                onPress={() =>
                                  CalendarOpenProfile(item.user_id)
                                }
                              >
                                <Text
                                  multiline={true}
                                  style={[CommonStyle.txtFrienduserName]}
                                >
                                  {item.user_fname + " " + item.user_lname}
                                  <Text
                                    style={
                                      (CommonStyle.txtFrienduserName,
                                      CommonStyle.textUpperCase,
                                      {
                                        color: COLORS.PrimaryLight,
                                        marginLeft: 16,
                                        paddingRight: 10,

                                        flex: 0.4,
                                      })
                                    }
                                  >
                                    {" "}
                                    {item.special_moment_name}
                                  </Text>{" "}
                                </Text>
                              </TouchableOpacity>
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
                    }}
                  >
                    <View style={{ width: "20%" }}>
                      {getImage != "" ? (
                        <Image
                          source={{ uri: getImage }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
                      )}
                    </View>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          CommonStyle.txtTitle,
                          {
                            textAlign: "center",
                          },
                        ]}
                      >
                        {getspecialMomentName}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: "20%",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          alignItems: "flex-end",
                        }}
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
                      placeholder={"Title"}
                      value={getuserSpecialMomentTitle}
                    />
                    <EditShowSimpleView
                      TitleName={"Date"}
                      placeholder={"Date"}
                      value={getuserSpecialMomentDate}
                    />
                    <EditShowSimpleView
                      TitleName={"Link"}
                      placeholder={"Link"}
                      value={getspecialMomentLink}
                    />
                    <EditShowSimpleView
                      TitleName={"Other Info"}
                      placeholder={"Other Info"}
                      value={getspecialMomentOtherInfo}
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
                      onPress={() => AddEditSepItem(getspecialMomentName)}
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
                        <View>
                          <Text
                            style={[
                              CommonStyle.txtTitle,
                              CommonStyle.p16,
                              { textAlign: "center" },
                            ]}
                          >
                            {getEditSepItem}
                          </Text>
                        </View>
                        <View style={{ width: "20%" }}></View>
                      </View>
                    </View>
                    <View style={CommonStyle.my16}>
                      <SimpleInputEditView
                        TitleName={"Title"}
                        buttonName={"Title"}
                        defaultValue={getuserSpecialMomentTitle}
                        textChange={(Title) => {
                          setuserSpecialMomentTitle(Title);
                          setPrevData({
                            ...getPrevData,
                            // ...getuserSpecialMomentTitle,
                            Title: Title,
                          });
                        }}
                      />
                      <EditShowBtnSimpleView
                        TitleName={"Date"}
                        buttonName={
                          getFinalSepDate
                            ? getFinalSepDate
                            : getuserSpecialMomentDate
                            ? getuserSpecialMomentDate
                            : "Date"
                        }
                        buttonCheck={
                          getuserSpecialMomentDate == "" ? false : true
                        }
                        onPress={() => UpdateEnterDate()}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        buttonName={"Link"}
                        defaultValue={getspecialMomentLink}
                        onChangeText={(Link) => {
                          setspecialMomentLink(Link);
                          // setspecialMomentUpdateLink(Link);
                          setPrevData({
                            ...getPrevData,
                            // ...getspecialMomentLink,
                            Link: Link,
                          });
                        }}
                      />
                      <SimpleInputEditView
                        TitleName={"Other Info"}
                        buttonName={"Other Info"}
                        defaultValue={getspecialMomentOtherInfo}
                        onChangeText={(OtherInfo) => {
                          // setspecialMomentUpdateOtherInfo(OtherInfo);
                          setspecialMomentOtherInfo(OtherInfo);
                          setPrevData({
                            ...getPrevData,
                            // ...getspecialMomentOtherInfo,
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

            {/* getDateModal */}
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
                      locale="en"
                      date={date}
                      onDateChange={setDate}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <POPLinkButton
                      buttonName={AppString.Select}
                      onPress={() => SubmitDate()}
                    />
                  </View>
                </View>
              </Modal>
            ) : null}

            {/* getUpdateDateModal */}
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
                      locale="en"
                      date={date}
                      onDateChange={setDate}
                    />
                  </View>

                  <View
                    style={{ flexDirection: "row", justifyContent: "center" }}
                  >
                    <POPLinkButton
                      buttonName={AppString.Select}
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
                style={[
                  CommonStyle.MainPopStyle,
                  TutorialStyle.popbg,
                  CommonStyle.HiddenPopStyle,
                  {
                    paddingHorizontal: 4,
                  },
                ]}
                onBackdropPress={() => CloseSepItem()}
              >
                <View style={{ overflow: "hidden" }}>
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
                      keyboardShouldPersistTaps={"always"}
                      bounces={false}
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={[
                        MainScreenStyle.scrollItemStyle,
                        { paddingBottom: 50 },
                      ]}
                    >
                      {getFilterSepCat.length > 0 &&
                        getFilterSepCat.map((item, index) => (
                          <PopUpSelectCategoriesList
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
                        <View
                          style={{
                            width: "60%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={[
                              CommonStyle.txtTitle,
                              CommonStyle.p16,
                              { textAlign: "center" },
                            ]}
                          >
                            {getUserNewSpecialMomenItem}
                          </Text>
                        </View>
                        <View style={{ width: "20%" }}></View>
                      </View>
                    </View>
                    <View style={CommonStyle.my16}>
                      <SimpleInputEditView
                        TitleName={"Title"}
                        placeholder={"Title"}
                        defaultValue={getPrevData.Title}
                        placeholderTextColor={COLORS.gray}
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
                        buttonName={
                          getFinalSepDate
                            ? getFinalSepDate
                            : getuserSpecialMomentDate
                            ? getuserSpecialMomentDate
                            : "Date"
                        }
                        buttonCheck={
                          getuserSpecialMomentDate == "" ? false : true
                        }
                        onPress={() => EnterDate()}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        placeholder={"Link"}
                        defaultValue={getPrevData.Link}
                        placeholderTextColor={COLORS.gray}
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
                        placeholderTextColor={COLORS.gray}
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

          {/* Payment for upgrade */}
          {getupgradeItemModal == true ? (
            <Modal
              testID={"modal"}
              isVisible={getupgradeItemModal}
              onBackdropPress={() => CloseSepItem()}
            >
              <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                <View>
                  <View>
                    <Text
                      style={[
                        CommonStyle.txtTitle,
                        // CommonStyle.p16,
                        { paddingBottom: 16, textAlign: "center" },
                      ]}
                    >
                      {AppString.UpgradeProfile}
                    </Text>
                  </View>

                  <Text
                    style={[
                      CommonStyle.Row,
                      CommonStyle.txtContent,
                      CommonStyle.formLabel,
                      { lineHeight: 24 },
                    ]}
                  >
                    {AppString.txtUpgradecategories1}
                    <Text style={{ color: COLORS.gold }}>
                      {AppString.price}
                    </Text>
                    <Text style={CommonStyle.formLabel}>
                      {AppString.txtUpgradecategories2}
                    </Text>
                  </Text>
                </View>

                <View
                  style={[
                    // CommonStyle.my16,
                    CommonStyle.txtContent,
                    { lineHeight: 24, marginLeft: 10 },
                  ]}
                >
                  <Text style={[CommonStyle.txtContent, { lineHeight: 24 }]}>
                    {"\u2022"} {AppString.txtUpgradecategoriesp1}
                  </Text>

                  <Text style={[CommonStyle.txtContent, { lineHeight: 15 }]}>
                    {"\u2022"} {AppString.txtUpgradecategoriesp2}
                  </Text>
                  <Text style={[CommonStyle.txtContent, { lineHeight: 15 }]}>
                    {"\u2022"} {AppString.txtUpgradecategoriesp3}
                  </Text>
                </View>

                <View style={CommonStyle.centerRow}>
                  <POPOutLinkButton
                    buttonName={AppString.Later}
                    onPress={() => CloseSepItem()}
                  />

                  <POPLinkButton
                    buttonName={AppString.Upgrade}
                    onPress={() => handleSubmitPayment()}
                  />
                </View>
              </View>
            </Modal>
          ) : null}
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
