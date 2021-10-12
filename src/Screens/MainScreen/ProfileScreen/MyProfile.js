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
  StatusBar,
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
import {
  CalendarList,
  Column3CalendarList,
} from "../../../Components/AllListVIew/CalendarList";
import { MyBlackStatusbar } from "../../../Components/MyStatusBar/MyBlackStatusbar";
import { MyWhiteStatusbar } from "../../../Components/MyStatusBar/MyWhiteStatusbar";
import { ProfileToolBar } from "../../../Components/ProfileToolBar/ProfileToolBar";
import { FONT } from "../../../Assets/utils/FONT";
import { ShareAppLink } from "../../../Assets/utils/ShareLink";
import { CalSelectCategoriesList } from "../CalendarScreen/CalSelectCategoriesList";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import {
  PopUpSelectCategoriesList,
  SelectCategoriesList,
} from "../../../Components/AllListVIew/SelectCategoriesList";
import {
  EditShowBtnSimpleView,
  EditShowSimpleView,
  SimpleInputEditView,
} from "../../../Components/FormInput";
import Purchases from "react-native-purchases";
import Moment from "moment";
import { ImageUrl } from "../../../Assets/utils/ImageUrl";

const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;
var temp = [];
var temp2 = [];
const MyProfile = ({ navigation }) => {
  const {
    addCategoryQuestion,
    getUserCategoryQuestion,
    updateCategoryQuestion,
    deleteUserCategoryQuestion,
    getProfile,
    GetSpecialMoment,
    deleteUserCategorySpecialDay,
    updateCategorySpecialMoment,
    getUserCategorySpecialMoment,
    addCategoryspecialDay,
    userSubscription,
  } = useActions();

  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);
  const categories = useSelector((state) => state.categories);
  const userCategoryQuestion = useSelector(
    (state) => state.UserCategoryQuestion
  );

  const [categoryQuestionLimit, setCategoryQuestionLimit] = useState(5);
  const [specialDayLimit, setSpecialDayLimit] = useState(2);
  const [userSubscriptionStatus, setUserSubscriptionStatus] = useState("0");
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
  const [getQuestions, setQuestions] = useState([]);
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

  const [getImageOld, setImageOld] = useState("");
  const [getImageNew, setImageNew] = useState("");
  const [getImageAPI, setImageAPI] = useState("");
  const [getImageStatus, setImageStatus] = useState(0);

  const [getDateModal, setDateModal] = useState(false);
  const [getUpdateDateModal, setUpdateDateModal] = useState("");
  const [getFinalSepDate, setFinalSepDate] = useState("");
  const [date, setDate] = useState(new Date());

  const [getFilterSepCat, setFilterSepCat] = useState(specialMoment);
  const [getDefaultSpecialMometData, setDefaultSpecialMometData] = useState([]);

  const [getPrevData, setPrevData] = useState({});
  const [getId, seGetId] = useState("0");

  const [getcheck, setCheck] = useState("");
  // set Image Sep
  // const [getImageSepOld, setImageSepOld] = useState("");
  // const [getImageSepNew, setImageSepNew] = useState("");
  // const [getImageSepAPI, setImageSepAPI] = useState("");
  // const [getImageSepStatus, setImageSepStatus] = useState(0);

  const [getMomentsCount, setMomentsCount] = useState(0);
  const [getFollowerCount, setFollowerCount] = useState("0");
  const [getFollowingCount, setFollowingCount] = useState("0");

  const updateSpecialMoment = () => {
    debugger;
    if (userSpecialMoment) {
      console.log(
        "========== userSpecialMoment ==========>",
        userSpecialMoment
      );
      debugger;
      const defaultSpecialMometData = userSpecialMoment.filter((item) => {
        return item.default_moment == "1";
      });
      console.log(
        "=========== defaultSpecialMometData =========>",
        defaultSpecialMometData
      );

      if (defaultSpecialMometData.length > 0) {
        setDefaultSpecialMometData(defaultSpecialMometData);
      } else {
        setDefaultSpecialMometData([]);
      }
    }
    if (userSpecialMoment.length == 0) {
      setDefaultSpecialMometData([]);
    }
    getFilterSepCatgories(userSpecialMoment);
    getFilterCatgories(userCategoryQuestion);
  };

  useEffect(() => {
    updateSpecialMoment();
  }, [userSpecialMoment]);

  useEffect(() => {
    updateSpecialMoment();
  }, [userSpecialMoment.length]);

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
    setImageurl("");
    setuserSpecialMomentDate("");
    setQuestionsData([]);
    temp = [];
    temp2 = [];
  };

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      // setImage(image.path);
      // setImageurl(image);

      setImageAPI(image);
      setImageNew(image.path);
      setImage(image.path);
      setImageStatus(1);
      // console.log("image===>", image);
    });
  };

  // All categories Select show (Show All Item)
  const AddItemShow = () => {
    temp = [];
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

  // Add New Categories Question
  const HandelQuestionData = (categoryId, categoryQuestionId, value, key) => {
    temp[key] = {
      category_id: categoryId,
      category_question_id: categoryQuestionId,
      value,
      key,
    };
    setQuestionsData(temp);
    // console.log("setQuestionsData ====>>>>", getQuestionsData);
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

  // Submit Add New Categories Question
  const SaveItem = async () => {
    // setQuestionsData(temp);
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    var questionsList = getQuestionsData;
    if (getQuestions.length > 0) {
      if (questionsList.length == 0) {
        getQuestions.map((item, key) => {
          questionsList.push(item);
        });
      } else {
        getQuestions.map((items, key) => {
          var dataCategory = questionsList.filter((item) => {
            return item.category_question_id == items.category_question_id;
          });
          if (dataCategory.length == 0) {
            questionsList.push(items);
          }
        });
      }
    }

    // API
    const { addCategoryQuestionError, addCategoryQuestionResponse } =
      await addCategoryQuestion(userData, 0, questionsList, getImageAPI);
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();
    if (
      addCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      getFilterCatgories(UserCategoryQuestionResponse.data.Result);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      onClearSpecialMoment();
      console.log(
        "User Category Question Response Error  ===>>>",
        UserCategoryQuestionResponse
      );
      console.log(
        "Question Response ==>>>",
        UserCategoryQuestionResponse.data.Result
      );
    } else {
      onClearSpecialMoment();
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      console.log("Question Error ==>>>", addCategoryQuestionError);
      console.log(
        "User Category Question Response Error  ===>>>",
        UserCategoryQuestionError
      );
    }
    setLoader(false);
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
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    var questionsList = getUpdateQuestionData;
    if (getShowOldQuestion.length > 0) {
      if (questionsList.length == 0) {
        getShowOldQuestion.map((item, key) => {
          var items = item;
          items.categoryQuestionId = item.user_category_question_id;
          items.value = item.question_value;
          questionsList.push(items);
        });
      } else {
        getShowOldQuestion.map((items, key) => {
          var dataCategory = questionsList.filter((item) => {
            return item.user_category_question_id == items.categoryQuestionId;
          });
          if (dataCategory.length == 0) {
            var items = item;
            items.categoryQuestionId = item.user_category_question_id;
            items.value = item.question_value;
            questionsList.push(items);
          }
        });
      }
    }
    // API
    const { updateCategoryQuestionResponse, updateCategoryQuestionError } =
      await updateCategoryQuestion(
        userData,
        questionsList,
        getIdItem,
        getImageAPI
      );
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();
    if (
      updateCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      getFilterCatgories(UserCategoryQuestionResponse.data.Result);
      // setAddNewFreshItemModal(false);
      setLoader(false);
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      onClearSpecialMoment();
      // console.log(
      //   "User Category Question Response Done  ===>>>",
      //   UserCategoryQuestionResponse
      // );
      // console.log("Question Response ==>>>", updateCategoryQuestionResponse);
    } else {
      setLoader(false);
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      onClearSpecialMoment();
      setImageNew("");
      setImageOld("");
      setImageAPI("");
      setImageStatus("");
      setIdItem("");
      setUpdateQuestionData([]);
      (temp = []), (temp2 = []);
      // console.log("Question Error ==>>>", updateCategoryQuestionError);
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   GetCategoryListerror
      // );
    }
  };

  // Select Item Categories --> Open
  const ShowOldItem = (Name, Image, id, key, questions) => {
    temp = [];
    console.log("ShowOldItem Name", Name);
    console.log("ShowOldItem Image", Image);
    console.log("ShowOldItem Id", id);
    console.log("ShowOldItem key", key);
    var questionList = userCategoryQuestion[key];
    console.log("SquestionList", questionList);
    setImageOld(Image);
    setShowOldQuestion([]);
    setTimeout(() => {
      setShowOldQuestion(questions);
      setAddNewItemModal(true);
      setAddNewItem(Name);
      setIdItem(id);
    }, 1000);
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

  // setSecondTemp
  const setSecondTemp = (categoryId, categoryQuestionId, value, key) => {
    temp2[key] = {
      category_id: categoryId,
      category_question_id: categoryQuestionId,
      value,
      key,
    };
    temp = temp2;
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
      getFilterCatgories(UserCategoryQuestionResponse.data.Result);
      console.log("Add Category Special Moment Done");
      setUpdateDataModal(false);
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
    } else {
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

  // ------------------ Explore Share List Completed ----------------

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

  // Close All Item
  const CloseSepItem = () => {
    setPrevData({});
    setImage("");
    setImageurl("");
    setImageNew("");
    setImageOld("");
    setImageAPI("");
    setImageStatus("");
    setFinalSepDate("");
    setAddItemShowSepModal(false);
    setEditItemSepModal(false);
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
      // setImage(image.path);
      // setImageurl(image);
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
    await GetSpecialMoment;
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
    setImage(Imageurl);
    // setImage(Imageurl);
    setspecialMomentLink(specialMomentLink);
    setspecialMomentOtherInfo(specialMomentOtherInfo);
    debugger;
  };

  const onClearSpecialMoment = () => {
    setUpdateQuestionData([]);
    setFinalSepDate("");
    setSpecialMomentId("");
    setuserSpecialMomentTitle("");
    setspecialMomentLink("");
    setspecialMomentOtherInfo("");
    setPrevData({});
    setImage("");
    setImageurl("");
    setImageOld("");
    setImageNew("");
    setImageAPI("");
    setImageStatus("");
    setuserSpecialMomentDate("");
    (temp = []), (temp2 = []);
    debugger;
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

    // debugger;
    // if (
    //   getuserSpecialMomentTitle == null ||
    //   getuserSpecialMomentTitle == undefined
    // ) {
    //   debugger;
    //   setuserSpecialMomentTitle("");
    //   console.log("getuserSpecialMomentTitle ==>", getuserSpecialMomentTitle);
    //   debugger;
    // } else if (getspecialMomentLink == null) {
    //   setspecialMomentLink("");
    //   console.log("getspecialMomentLink ==>", getspecialMomentLink);
    //   debugger;
    // } else if (getspecialMomentOtherInfo == null) {
    //   setspecialMomentOtherInfo("");
    //   console.log("getspecialMomentOtherInfo ==>", getspecialMomentOtherInfo);
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
    debugger;
    if (
      addCategoryspecialDayResponse.data.StatusCode == "1" &&
      getUserCategorySpecialMomentResponse.data.StatusCode == "1"
    ) {
      debugger;
      getFilterSepCatgories(getUserCategorySpecialMomentResponse.data.Result);
      onClearSpecialMoment();
      console.log("Add Category Special Moment Done");
      setLoader(false);
    } else {
      setLoader(false);
      onClearSpecialMoment();
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
      onClearSpecialMoment();
    } else {
      setUserNewSpecialMomentModal(false);
      setUserOldSpecialMomentModal(false);
      setLoader(false);
      onClearSpecialMoment();
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
    onClearSpecialMoment();
    debugger;
  };
  //  --------------------- Special Moment Completed -----------------

  // Payment for upgrade
  const upgradeItem = async () => {
    if (userSubscriptionStatus == "1") {
      AddItemShow(0);
    } else {
      setupgradeItemModal(true);
    }
  };

  const upgradePayment = async () => {
    if (userSubscriptionStatus == "1") {
      AddItemSepShow(0);
    } else {
      setupgradeItemModal(true);
    }
  };

  const handleSubmitPayment = async () => {
    // setLoading(true);
    // HapticFeedback.trigger("impactLight");

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
        var latestExpirationDates = Moment(info.latestExpirationDate)
          .format("YYYY-MM-DD")
          .toString();
        var cuttentDate = Moment(new Date()).format("YYYY-MM-DD").toString();
        const { UserSubscriptionResponse, UserSubscriptionError } =
          await userSubscription("1.99", latestExpirationDates, cuttentDate);
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

  useEffect(() => {
    setMomentsCount(userSpecialMoment.length);
  }, [userSpecialMoment]);

  const getProfiles = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode == "1") {
      setFollowerCount(profileResponse.data.Result[0].follower_count);
      setFollowingCount(profileResponse.data.Result[0].following_count);
    }
  };

  useEffect(() => {
    getProfiles();
  }, []);

  const getProfileLoad = async () => {
    const { profileResponse, profileError } = await getProfile();
    if (profileResponse.data.StatusCode == "1") {
      setFollowerCount(profileResponse.data.Result[0].follower_count);
      setFollowingCount(profileResponse.data.Result[0].following_count);
      setCategoryQuestionLimit(
        profileResponse.data.Result[0].user_details[0].category_question_limit
      );
      setUserSubscriptionStatus(
        profileResponse.data.Result[0].user_details[0].user_subscription_status
      );
      setSpecialDayLimit(
        profileResponse.data.Result[0].user_details[0].special_day_limit
      );
      const defaultSpecialMometData = userSpecialMoment.filter((item) => {
        return (
          item.special_moment_id ==
          profileResponse.data.Result[0].user_details[0].default_special_moment
        );
      });
      if (defaultSpecialMometData.length > 0) {
        setDefaultSpecialMometData(defaultSpecialMometData);
      }
    }
    await getUserCategorySpecialMoment();
    await GetSpecialMoment;
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      getProfileLoad();
    });
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
        style={{ marginBottom: 10 }}
      >
        <View style={CommonStyle.authPage}>
          <View style={CommonStyle.imgmask}>
            <ImageBackground
              source={
                userData.userProfileImage == "" ||
                userData.userProfileImage == undefined
                  ? imgPlaceHolder
                  : { uri: userData.userProfileImage }
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
                <View style={{ width: "80%" }}>
                  <Text
                    style={[ProfileScreenStyle.userName, { paddingRight: 15 }]}
                  >
                    {userData.userFname + " " + userData.userLname}
                  </Text>
                  <View style={CommonStyle.alignItemsBaseLine}>
                    {getDefaultSpecialMometData.length > 0 &&
                    getDefaultSpecialMometData[0].user_special_moment_date !=
                      "" ? (
                      <>
                        <Image
                          source={{
                            uri:
                              ImageUrl.MomentsWhite +
                              getDefaultSpecialMometData[0].special_moment_name.replace(
                                " ",
                                "%20"
                              ) +
                              ImageUrl.Png,
                          }}
                          style={[
                            CommonStyle.imgIconSize,
                            { tintColor: "gray" },
                          ]}
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
                <View style={{ width: "20%", right: 10 }}>
                  <POPLinkButton
                    buttonName={AppString.Edit}
                    styleBtn={Mediumbtn}
                    onPress={() => navigation.navigate("EditProfile")}
                  />
                </View>
              </View>
            </View>

            <View style={[ProfileScreenStyle.MomentStatus]}>
              <View>
                <Text
                  style={[CommonStyle.txtTitle, { fontFamily: FONT.NotoSans }]}
                >
                  {getMomentsCount == 0 ? "--" : getMomentsCount}
                  {/* {userSpecialMoment.length == undefined
                    ? "0"
                    : userSpecialMoment.length} */}
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
              <TouchableOpacity
                disabled={getFollowerCount == "0" ? true : false}
                onPress={() =>
                  navigation.navigate("NavFriendScreen", { isFollowing: false })
                }
              >
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
              </TouchableOpacity>
              <TouchableOpacity
                disabled={getFollowingCount == "0" ? true : false}
                onPress={() =>
                  navigation.navigate("NavFriendScreen", { isFollowing: true })
                }
              >
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
              </TouchableOpacity>
            </View>

            {/* Favorite Things */}
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

              {/* Favorite Things List */}
              <ScrollView
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.toppadding16,
                ]}
              >
                {userCategoryQuestion.length > 0 &&
                  userCategoryQuestion.map((item, index) => {
                    return (
                      // <CalendarList
                      <Column3CalendarList
                        ImageUrl={{
                          uri:
                            ImageUrl.Categories +
                            item.category_name.trim() +
                            ImageUrl.Png,
                        }}
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
                        // AddNewOnPress={() => AddItemShow(index)}
                      />
                    );
                  })}
                <View>
                  {userSubscriptionStatus == "1" &&
                  userCategoryQuestion.length == categoryQuestionLimit ? (
                    <View />
                  ) : (
                    <Column3CalendarList
                      ShowBtn={true}
                      key={1}
                      AddNewOnPress={() => {
                        userCategoryQuestion.length < categoryQuestionLimit
                          ? AddItemShow(0)
                          : upgradeItem();
                      }}
                    />
                  )}
                </View>
              </ScrollView>
            </View>

            {/* Special Moments */}
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
                    // <CalendarList
                    <Column3CalendarList
                      ImageUrl={{
                        uri:
                          ImageUrl.MomentsWhite +
                          item.special_moment_name.trim() +
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
                    <Column3CalendarList
                      ShowBtn={true}
                      key={1}
                      AddNewOnPress={() => {
                        userSpecialMoment.length < specialDayLimit
                          ? AddItemSepShow(0)
                          : upgradePayment();
                      }}
                    />
                  )}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        {/* All categories Select show ( Show All Item) */}
        {getAddItemShowModal == true ? (
          <Modal
            testID={"modal"}
            isVisible={getAddItemShowModal}
            style={CommonStyle.MainPopStyle}
            onBackdropPress={() => CloseItem()}
          >
            <SafeAreaView>
              <View
                style={[
                  CommonStyle.p24,
                  TutorialStyle.popbg,
                  CommonStyle.HiddenPopStyle,
                ]}
              >
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
                    keyboardShouldPersistTaps={"always"}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
                  >
                    {getFilterCat.length > 0 &&
                      getFilterCat.map((item, index) => (
                        <PopUpSelectCategoriesList
                          ImageUrl={{
                            uri:
                              ImageUrl.Categories +
                              item.category_name.trim() +
                              ImageUrl.Png,
                          }}
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
                      {getImageOld == "" || getImageOld == undefined ? (
                        <Image source={imgImport} style={Styles.popupImage} />
                      ) : getImageStatus == 0 ? (
                        <Image
                          source={{ uri: getImageOld }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image
                          source={{ uri: getImageNew }}
                          style={Styles.popupImage}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text
                      style={[
                        CommonStyle.txtTitle,
                        { textAlign: "center", marginTop: 10 },
                      ]}
                    >
                      {getUpdateDataItem}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}></View>
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
                      {getImageOld != "" ? (
                        <Image
                          source={{ uri: getImageOld }}
                          style={Styles.popupImage}
                        />
                      ) : (
                        <Image source={imgImport} style={Styles.popupImage} />
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
                      {getImageNew != "" ? (
                        <Image
                          source={{ uri: getImageNew }}
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
                }}
              >
                <View style={{ width: "20%" }}>
                  {getImage == "" ||
                  getImage == null ||
                  getImage == undefined ? (
                    <Image source={imgImport} style={Styles.popupImage} />
                  ) : (
                    <Image
                      source={{ uri: getImage }}
                      style={Styles.popupImage}
                    />
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
                    <Image source={imgDelete} style={CommonStyle.imgIconSize} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={CommonStyle.my16}>
                <EditShowSimpleView
                  TitleName={"Title"}
                  placeholder={"Title"}
                  value={getuserSpecialMomentTitle}
                  multiline={true}
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
                  multiline={true}
                />
                <EditShowSimpleView
                  TitleName={"Other Info"}
                  placeholder={"Other Info"}
                  value={getspecialMomentOtherInfo}
                  multiline={true}
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
                    alignContent: "center",
                  }}
                >
                  <View style={CommonStyle.Row}>
                    <View style={{ width: "20%" }}>
                      <TouchableOpacity onPress={() => ImageSepChange()}>
                        {getImage == "" ||
                        getImage == null ||
                        getImage == undefined ? (
                          <Image source={imgImport} style={Styles.popupImage} />
                        ) : (
                          <Image
                            source={{ uri: getImage }}
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

              <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            style={CommonStyle.MainPopStyle}
            onBackdropPress={() => CloseSepItem()}
          >
            <KeyboardAvoidingView
              behavior="position"
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <View
                style={[
                  CommonStyle.p24,
                  TutorialStyle.popbg,
                  CommonStyle.HiddenPopStyle,
                ]}
              >
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
                    contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
                  >
                    {getFilterSepCat.length > 0 &&
                      getFilterSepCat.map((item, index) => (
                        <PopUpSelectCategoriesList
                          ImageUrl={{
                            uri:
                              ImageUrl.MomentsWhite +
                              item.special_moment_name.trim() +
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
                        {getImage == "" ||
                        getImage == null ||
                        getImage == undefined ? (
                          <Image source={imgImport} style={Styles.popupImage} />
                        ) : (
                          <Image
                            source={{ uri: getImage }}
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

        {/* Payment for upgrade  categories*/}
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
                  onPress={() => handleSubmitPayment()}
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
