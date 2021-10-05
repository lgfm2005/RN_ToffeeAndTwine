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
} from "react-native";

// Lib
import LinearGradient from "react-native-linear-gradient";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";
import DatePicker from "react-native-date-picker";
import { useSelector } from "react-redux";
import { useActions } from "../../../redux/actions";

// Asset
import {
  imgbirthdayCakeGary,
  imgImport,
  imgDelete,
} from "../../../Assets/utils/Image";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import { ToolbarMain } from "../../../Components/ToolbarMain/ToolbarMain";
import { COLORS } from "../../../Assets/utils/COLORS";
import {
  FilledButton,
  POPLinkButton,
  POPOutLinkButton,
} from "../../../Components/Button/Button";
import { Mediumbtn, Smallbtn } from "../../../Components/Button/ButtonStyle";
import { AppString } from "../../../Assets/utils/AppString";
import { ProfileScreenStyle } from "./ProfileScreenStyle";
import {
  imgWhiteShare,
  imgBackleftWhite,
  imgPlaceHolder,
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
import { FONT } from "../../../Assets/utils/FONT";
import { ShareAppLink } from "../../../Assets/utils/ShareLink";
import { CalSelectCategoriesList } from "../CalendarScreen/CalSelectCategoriesList";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { SelectCategoriesList } from "../../../Components/AllListVIew/SelectCategoriesList";
import {
  EditShowBtnSimpleView,
  EditShowSimpleView,
  SimpleInputEditView,
} from "../../../Components/FormInput";
import Purchases from "react-native-purchases";
import Moment from "moment";

const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

var temp,
  temp2 = [];
const MyProfile = ({ navigation }) => {
  const {
    addCategoryQuestion,
    getUserCategoryQuestion,
    updateCategoryQuestion,
    deleteUserCategoryQuestion,

    deleteUserCategorySpecialDay,
    updateCategorySpecialMoment,
    getUserCategorySpecialMoment,
    addCategoryspecialDay,
  } = useActions();

  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);
  const categories = useSelector((state) => state.categories);
  const userCategoryQuestion = useSelector(
    (state) => state.UserCategoryQuestion
  );
  // Payment for upgrade
  const [getupgradeItemModal, setupgradeItemModal] = useState(false);

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getShowOldQuestion, setShowOldQuestion] = useState([]);
  const [getFilterCat, setFilterCat] = useState(categories);
  // getAddNewItemModal
  const [getAddNewItemModal, setAddNewItemModal] = useState(false);
  const [getAddNewItem, setAddNewItem] = useState("");
  // getEditItemModal
  const [getEditItemModal, setEditItemModal] = useState(false);
  const [getQuestions, setQuestions] = useState("");
  const [getQuestionsData, setQuestionsData] = useState([]);
  // Update Data Modal
  const [getUpdateDataModal, setUpdateDataModal] = useState(false);
  const [getUpdateDataItem, setUpdateDataItem] = useState("");
  const [getUpdateQuestionData, setUpdateQuestionData] = useState([]);
  const [getIdItem, setIdItem] = useState("");
  const [getLoader, setLoader] = useState(false);

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
  const [getImageStatus, setImageStatus] = useState("");

  const [getDateModal, setDateModal] = useState(false);
  const [getUpdateDateModal, setUpdateDateModal] = useState("");
  const [getFinalSepDate, setFinalSepDate] = useState("");
  const [date, setDate] = useState(new Date());

  const [getFilterSepCat, setFilterSepCat] = useState(specialMoment);
  const [getDefaultSpecialMometData, setDefaultSpecialMometData] = useState([]);

  const [getPrevData, setPrevData] = useState({});
  const [getId, seGetId] = useState("0");

  const [setFinalDataShow, getFinalDataShow] = useState("");

  useEffect(() => {
    if (userSpecialMoment) {
      console.log(
        "========== userSpecialMoment ==========>",
        userSpecialMoment
      );
      const defaultSpecialMometData = userSpecialMoment.filter((item) => {
        return item.special_moment_id == userData.defaultSpecialMoment;
      });
      console.log(
        "=========== defaultSpecialMometData =========>",
        defaultSpecialMometData
      );
      setDefaultSpecialMometData(defaultSpecialMometData);
    }
    getFilterSepCatgories(userSpecialMoment);
    getFilterCatgories(userCategoryQuestion);
  }, [userSpecialMoment]);

  const getFilterCatgories = (data) => {
    var dataCategory = categories;
    if (data.length > 0) {
      data.map((items, indexs) => {
        dataCategory = dataCategory.filter((item) => {
          return item.category_id !== items.category_id;
        });
      });
    }
    setFilterCat(dataCategory);
    // console.log(getFilterCat);
  };

  // Close All Item
  const CloseItem = () => {
    setAddItemShowModal(false);
    setAddNewItemModal(false);
    setEditItemModal(false);
    setUpdateDataModal(false);
    setPrevData({});
    setupgradeItemModal(false);
    setFinalSepDate("");
    setuserSpecialMomentDate("");
  };

  // Close All Item
  const CloseSepItem = () => {
    setEditItemSepModal(false);
    setUserNewSpecialMomentModal(false);
    setUserOldSpecialMomentModal(false);
    setDateModal(false);
    setupgradeItemModal(false);
    setPrevData({});
    setAddItemShowSepModal(false);
    setFinalSepDate("");
    setuserSpecialMomentDate("");
  };

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      setImage(image.path);
      setImageurl(image);
      debugger;
      console.log("image===>", image);
    });
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

      debugger;
      // console.log("image===>", image);
    });
  };
  // Select Item Categories --> Open
  const ShowOldItem = (Name, Image, id, key, questions) => {
    temp = [];
    console.log("ShowOldItem Name", Name);
    console.log("ShowOldItem Image", Image);
    console.log("ShowOldItem id", id);
    console.log("ShowOldItem key", key);
    setAddNewItemModal(true);
    setImageurl(Image);
    setAddNewItem(Name);
    setIdItem(id);
    setShowOldQuestion(questions);
    debugger;
  };

  // All categories Select show (Show All Item)
  const AddItemShow = () => {
    console.log("All categories Select show (Show All Item)");
    setAddItemShowModal(true);
  };

  // All categories Select show  ---> Add Save item
  const SelectCategoriesItem = (Name, Image, id, questions, key) => {
    console.log(" Select categories ===>>>", Name, Image, id, questions);
    setAddItemShowModal(false);
    // console.log("Key  ===>", key);

    // setAddNewFreshItemModal(true)
    AddNewFreshItem(Name, Image, id, questions);
  };

  // Add --> Select Categories --> New Item
  const AddNewFreshItem = (Name, Image, id, questions) => {
    console.log(
      "Select Categories --> New Item ===>>>",
      Name,
      Image,
      id,
      questions
    );
    setAddNewItemModal(false);
    setEditItemModal(true);
    setAddNewItem(Name);
    setQuestions(questions);
    setQuestionsData(questions);
  };

  const setSecondTemp = (categoryId, categoryQuestionId, value, key) => {
    temp2[key] = {
      category_id: categoryId,
      category_question_id: categoryQuestionId,
      value,
      key,
    };
    temp = temp2;
  };

  // Add New Categories Question
  const HandelQuestionData = (categoryId, categoryQuestionId, value, key) => {
    temp[key] = {
      category_id: categoryId,
      category_question_id: categoryQuestionId,
      value,
      key,
    };
    setQuestionsData(temp);
  };

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getAddNewItem) => {
    temp = [];
    setAddNewItemModal(false);
    setUpdateDataModal(true);
    setUpdateDataItem(getAddNewItem);
    // setEditItemModal(true);
    // setEditItem(getAddNewItem);
  };

  // Update Categories Question
  const UpdateQuestionData2 = (categoryQuestionId, value, key) => {
    temp2[key] = { categoryQuestionId, value };
    temp = temp2;
    // temp = [];
  };
  const UpdateQuestionData = (categoryQuestionId, value, key) => {
    temp[key] = { categoryQuestionId, value };
    var getIds = getId == "0" ? "1" : "0";
    var dataList = getShowOldQuestion;
    dataList[key].question_value = value;
    setShowOldQuestion(dataList);
    seGetId(getIds);
    setUpdateQuestionData(temp);

    // temp = [];
  };
  // Submit Update Data Categories Question
  const SubmitUpdateQuestionData = async () => {
    setLoader(true);
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);

    console.log("getUpdateQuestionData", getUpdateQuestionData);
    // API
    const { updateCategoryQuestionResponse, updateCategoryQuestionError } =
      await updateCategoryQuestion(
        userData,
        getUpdateQuestionData,
        getImageurl
      );

    debugger;
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();
    debugger;
    if (
      updateCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      debugger;
      getFilterCatgories(UserCategoryQuestionResponse.data.Result);
      // setAddNewFreshItemModal(false);
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      // console.log(
      //   "User Category Question Response Done  ===>>>",
      //   UserCategoryQuestionResponse
      // );
      // console.log("Question Response ==>>>", updateCategoryQuestionResponse);
    } else {
      setUpdateDataModal(false);
      getFilterCatgories("");
      console.log("Question Error ==>>>", updateCategoryQuestionError);
      console.log(
        "User Category Question Response Error  ===>>>",
        UserCategoryQuestionError
      );
    }
    // setLoader(false);
  };
  // Submit Add New Categories Question
  const SaveItem = async () => {
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    // API
    const { addCategoryQuestionError, addCategoryQuestionResponse } =
      await addCategoryQuestion(userData, 0, getQuestionsData, getImageurl);
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();
    debugger;
    if (
      addCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      debugger;
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      setImage("");
      setImageurl("");
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   UserCategoryQuestionResponse
      // );
      // console.log("Question Response ==>>>", addCategoryQuestionResponse);
    } else {
      // setAddNewFreshItemModal(true);
      setImage("");
      setImageurl("");
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      // console.log("Question Error ==>>>", addCategoryQuestionError);
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   UserCategoryQuestionError
      // );
    }
    setLoader(false);
  };

  const DeletedExplore = async () => {
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    const {
      deleteUserCategoryQuestionResponse,
      deleteUserCategoryQuestionError,
    } = await deleteUserCategoryQuestion(getIdItem);
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();

    if (
      deleteUserCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      console.log("Add Category Special Moment Done");
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      setFinalSepDate("");
      setuserSpecialMomentDate("");
    } else {
      setFinalSepDate("");
      setuserSpecialMomentDate("");
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      console.log(
        "deleteUserCategoryQuestion",
        deleteUserCategoryQuestionError
      );
      console.log("UserCategoryQuestionError", UserCategoryQuestionError);
    }
    console.log("fewf", getIdItem);
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
    debugger;
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
      debugger;
    } else {
      debugger;
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

  // Special Moment Day
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

  const EditSubmitData = () => {
    setEditItemSepModal(false);
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

  const EnterDate = () => {
    setUserNewSpecialMomentModal(false);
    setDateModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
  };
  const SubmitDate = () => {
    setDateModal(false);
    setUserNewSpecialMomentModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
  };
  const UpdateEnterDate = () => {
    setEditItemSepModal(false);
    setUpdateDateModal(true);
    var DateSubstring =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();
    setFinalSepDate(DateSubstring);
    // setuserSpecialMomentDate(DateSubstring);
  };
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
    console.log("EWfewfewfwfewf=>>>>>>>>>>", getuserSpecialMomentDate);
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
    debugger;
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

    // if (!getFinalSepDate) {
    //   getFinalDataShow("");
    //   debugger;
    // } else {
    //   getFinalDataShow(getFinalSepDate);
    //   debugger;
    // }
    debugger;
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
    debugger;
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
      getFilterSepCatgories(getUserCategorySpecialMomentResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setLoader(false);
    } else {
      setLoader(false);
      setPrevData({});
      setImage("");
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

    debugger;
    const {
      updateCategorySpecialMomentResponse,
      updateCategorySpecialMomentError,
    } = await updateCategorySpecialMoment(
      getuserSpecialMomentId,
      getuserSpecialMomentTitle,
      // getuserSpecialMomentUpdateTitle,
      getFinalSepDate,
      // getspecialMomentUpdateLink,
      getspecialMomentLink,
      getspecialMomentOtherInfo,
      // getspecialMomentUpdateOtherInfo,
      JSON.stringify(getImageurl)
    );
    debugger;
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
      setFinalSepDate("");
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

  // Payment for upgrade
  const upgradeItem = () => {
    setupgradeItemModal(true);
  };

  const handleSubmitPayment = async () => {
    // setLoading(true);
    // HapticFeedback.trigger("impactLight");
    try {
      const offerings = await Purchases.getOfferings();
      console.log("offerings:", offerings);
      const monthlyPackage = offerings.current.monthly;
      const { purchaserInfo } = await Purchases.purchasePackage(monthlyPackage);
      const { latestExpirationDate } = purchaserInfo;
      console.log("latestExpirationDate:", latestExpirationDate, purchaserInfo);
      // const { error } = await SendReceipt(latestExpirationDate, purchaserInfo);
      // if (error)
      //   throw new Error(
      //     error?.response?.data?.error || error.message || "Unkown error."
      //   );
      // await UserProfile(userId);
      // onClose?.();
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

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
  }, []);

  return (
    <View style={[CommonStyle.BgColorWhite]}>
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
            <TouchableOpacity>
              <Image source={{}} style={{}} />
            </TouchableOpacity>
            <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>
              {/* My Profile */}
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
              source={
                userData.userProfileImage != ""
                  ? { uri: userData.userProfileImage }
                  : imgPlaceHolder
              }
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
                    {getDefaultSpecialMometData.length > 0 &&
                    getDefaultSpecialMometData[0].user_special_moment_date !=
                      "" ? (
                      <>
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
                          {"  "}
                          {getDefaultSpecialMometData[0].special_moment_name}
                          {"  "}
                          {
                            getDefaultSpecialMometData[0]
                              .user_special_moment_date_display
                          }
                        </Text>
                      </>
                    ) : null}
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
                  {userSpecialMoment.length == undefined
                    ? "0"
                    : userSpecialMoment.length}
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
                {userCategoryQuestion.length > 0 &&
                  userCategoryQuestion.map((item, index) => {
                    return (
                      <CalendarList
                        ImageUrl={imgBook}
                        ExploreName={item.category_name}
                        Id={item.category_id}
                        index={index}
                        key={index}
                        DataLength={userCategoryQuestion.length}
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
                        AddNewOnPress={() => AddItemShow(index)}
                      />
                    );
                  })}
                <CalendarList
                  ShowBtn={true}
                  key={1}
                  AddNewOnPress={() => {
                    userCategoryQuestion.length != 5
                      ? AddItemShow(0)
                      : upgradeItem();
                  }}
                />
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
                {userSpecialMoment.length > 0 &&
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
                          item.user_category_image
                        )
                      }
                    />
                  ))}
                <CalendarList
                  ShowBtn={true}
                  key={1}
                  AddNewOnPress={() => {
                    userSpecialMoment.length != 2
                      ? AddItemSepShow(0)
                      : upgradeItem();
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </View>

        {/* All categories Select show ( Show All Item) */}
        {getAddItemShowModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getAddItemShowModal}
            onBackdropPress={() => CloseItem()}
          >
            <SafeAreaView>
              <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                <Text
                  style={[
                    CommonStyle.txtTitle,
                    CommonStyle.pb16,
                    { textAlign: "center" },
                  ]}
                >
                  {AppString.SelectCategories}
                </Text>
                <View key={getId}>
                  <ScrollView
                    contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
                  >
                    {getFilterCat.length > 0 &&
                      getFilterCat.map((item, index) => (
                        <SelectCategoriesList
                          ImageUrl={imgBook}
                          ExploreName={item.category_name}
                          Id={item.category_id}
                          index={index}
                          key={index}
                          // DataLength={Data.length}
                          onPress={() =>
                            SelectCategoriesItem(
                              item.category_name,
                              item.Image,
                              item.category_id,
                              item.questions,
                              index
                            )
                          }
                        />
                      ))}
                  </ScrollView>
                </View>
              </View>
            </SafeAreaView>
          </Modal>
        ) : null}
        {/* Show User Category Question */}
        {getAddNewItemModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getAddNewItemModal}
            onBackdropPress={() => CloseItem()}
          >
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                <View style={CommonStyle.Row}>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity disabled={true}>
                      {getImageurl != "" ? (
                        <Image
                          source={{ uri: getImageurl }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
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
                      {getAddNewItem}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity
                      style={{
                        alignItems: "flex-end",
                      }}
                      onPress={() => DeletedExplore()}
                    >
                      <Image
                        source={imgDelete}
                        style={CommonStyle.imgIconSize}
                      />
                    </TouchableOpacity>
                  </View>
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

                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <POPOutLinkButton
                    buttonName={AppString.Cancel}
                    onPress={() => CloseItem()}
                  />

                  <POPLinkButton
                    buttonName={AppString.Edit}
                    onPress={() => AddEditItem(getAddNewItem)}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        ) : null}

        {/* Old categories Update */}
        {getUpdateDataModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getUpdateDataModal}
            onBackdropPress={() => CloseItem()}
          >
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <View style={[CommonStyle.p24, TutorialStyle.popbg]}>
                <View style={CommonStyle.Row}>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity onPress={() => ImageChange()}>
                      {getImageurl != "" ? (
                        <Image
                          source={{ uri: getImageurl }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={CommonStyle.PopModalWidth60}>
                    <Text
                      style={[CommonStyle.txtTitle, { textAlign: "center" }]}
                    >
                      {getUpdateDataItem}
                    </Text>
                  </View>
                </View>

                <View style={CommonStyle.my16}>
                  {getShowOldQuestion.length > 0 &&
                    getShowOldQuestion.map((item, key) => {
                      UpdateQuestionData2(
                        item.user_category_question_id,
                        item.question_value,
                        key
                      );
                      return (
                        <SimpleInputEditView
                          TitleName={item.category_question}
                          buttonName={item.category_placeholder}
                          value={item.question_value}
                          onChangeText={(value) => {
                            UpdateQuestionData(
                              item.user_category_question_id,
                              value,
                              key
                            );
                          }}
                        />
                      );
                    })}
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
                    onPress={() => SubmitUpdateQuestionData()}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        ) : null}

        {getEditItemModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getEditItemModal}
            onBackdropPress={() => CloseItem()}
          >
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                <View style={CommonStyle.Row}>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity onPress={() => ImageChange()}>
                      {getImage != "" ? (
                        <Image
                          source={{ uri: getImage }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
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
                    <Text style={[CommonStyle.txtTitle, CommonStyle.p16]}>
                      {getAddNewItem}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}></View>
                </View>

                <View style={CommonStyle.my16}>
                  {getQuestions.length > 0 &&
                    getQuestions.map((item, key) => {
                      setSecondTemp(
                        item.category_id,
                        item.category_question_id,
                        "",
                        key
                      );
                      return (
                        <SimpleInputEditView
                          TitleName={item.category_question}
                          placeholder={item.category_placeholder}
                          onChangeText={(value) =>
                            HandelQuestionData(
                              item.category_id,
                              item.category_question_id,
                              value,
                              key
                            )
                          }
                        />
                      );
                    })}

                  {/* <SimpleInputEditView
                        TitleName={getQuestions[0].category_question}
                        placeholder={getQuestions[0].category_placeholder}
                        onChangeText={(FirstName) => setFirstName(FirstName)}
                      />
                      <SimpleInputEditView
                        TitleName={getQuestions[1].category_question}
                        placeholder={getQuestions[1].category_placeholder}
                        onChangeText={(SecondName) => setSecondName(SecondName)}
                      />
                      <SimpleInputEditView
                        TitleName={getQuestions[2].category_question}
                        placeholder={getQuestions[2].category_placeholder}
                        onChangeText={(ThirdName) => setThirdName(ThirdName)}
                      />
                      <SimpleInputEditView
                        TitleName={getQuestions[3].category_question}
                        placeholder={getQuestions[3].category_placeholder}
                        onChangeText={(FourName) => setFourName(FourName)}
                      /> */}
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
                    onPress={() => SaveItem()}
                  />
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        ) : null}

        {/* Select Moment Date */}
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
                  <Text style={[CommonStyle.txtTitle, { textAlign: "center" }]}>
                    {getspecialMomentName}
                  </Text>
                </View>
                <View style={{ width: "20%" }}>
                  <TouchableOpacity
                    style={{
                      alignItems: "flex-end",
                    }}
                    onPress={() => DeleteItem(getuserSpecialMomentId)}
                  >
                    <Image source={imgDelete} style={CommonStyle.imgIconSize} />
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

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                          <Image source={imgImport} style={Styles.popupImage} />
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
                    buttonCheck={getuserSpecialMomentDate == "" ? false : true}
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

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <POPLinkButton
                  buttonName={AppString.Select}
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
                  locale="en"
                  mode={"date"}
                  date={date}
                  onDateChange={setDate}
                />
              </View>

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                  {AppString.SelectMoment}
                </Text>
                <View>
                  <ScrollView
                    contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
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
                          <Image source={imgImport} style={Styles.popupImage} />
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
                    buttonCheck={getuserSpecialMomentDate == "" ? false : true}
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

        {/* Payment for upgrade */}
        {getupgradeItemModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getupgradeItemModal}
            onBackdropPress={() => CloseItem()}
          >
            <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
              <View>
                <Text
                  style={[
                    CommonStyle.txtTitle,
                    CommonStyle.p16,
                    CommonStyle.textUpperCase,
                    { textAlign: "center" },
                  ]}
                >
                  {AppString.UpgradeProfile}
                </Text>
              </View>

              <View>
                <Text
                  style={
                    (CommonStyle.Row, CommonStyle.p16, CommonStyle.txtContent)
                  }
                >
                  {AppString.txtUpgradecategories1}
                  <Text style={{ color: COLORS.gold }}>{AppString.price}</Text>
                  <Text>{AppString.txtUpgradecategories2}</Text>
                </Text>
              </View>
              <View style={CommonStyle.centerRow}>
                <POPOutLinkButton
                  buttonName={AppString.Later}
                  onPress={() => CloseItem()}
                />

                <POPLinkButton
                  buttonName={AppString.Upgrade}
                  onPress={() => CloseItem()}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </ScrollView>
      <Spinner visible={getLoader} />
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

export default MyProfile;
