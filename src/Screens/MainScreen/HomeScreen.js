import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

// Lib
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import CommonStyle from "../../Assets/Style/CommonStyle";
import TutorialStyle from "../Signup/Tutorial/TutorialStyle";
import { ToolbarMain } from "../../Components/ToolbarMain/ToolbarMain";
import { MainScreenStyle } from "./MainScreenStyle";
import { AppString } from "../../Assets/utils/AppString";
import {
  demodp,
  imgExploreaNShare,
  imgPlaceHolder,
  imgDesserts,
  imgFlowers,
  imgLaptop,
  imgRing,
  imgBook,
  imgCandy,
  imgDelete,
  imgJewelry,
  imgShoes,
  imgImport,
} from "../../Assets/utils/Image";
import { COLORS } from "../../Assets/utils/COLORS";
import {
  SimpleInputEditView,
  EditShowSimpleView,
} from "../../Components/FormInput";
import {
  POPLinkButton,
  POPOutLinkButton,
} from "../../Components/Button/Button";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { ExploreShareList } from "../../Components/AllListVIew/ExploreShareList";
import { UpgradeCategoriesList } from "../../Components/AllListVIew/UpgradeCategoriesList";
import { SelectCategoriesList } from "../../Components/AllListVIew/SelectCategoriesList";

import { MyBlackStatusbar } from "../../Components/MyStatusBar/MyBlackStatusbar";
import { MyWhiteStatusbar } from "../../Components/MyStatusBar/MyWhiteStatusbar";
import { FONT } from "../../Assets/utils/FONT";
import { useActions } from "../../redux/actions";
import Purchases from "react-native-purchases";

const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;
var temp,
  temp2 = [];
var items, list, userData;
const HomeScreen = () => {
  const {
    addCategoryQuestion,
    CategoryList,
    getUserCategoryQuestion,
    updateCategoryQuestion,
    GetSpecialMoment,
    getUserCategorySpecialMoment,
    deleteUserCategoryQuestion,
  } = useActions();

  var userData = useSelector((state) => state.session);
  const session = useSelector((state) => state.session);

  const categories = useSelector((state) => state.categories);
  const userCategoryQuestion = useSelector(
    (state) => state.UserCategoryQuestion
  );

  useEffect(() => {
    Purchases.setDebugLogsEnabled(true);
    Purchases.setup("RGUvSPPiJYGkYZldmAbMRbTyNJrHUlWs");
  }, []);
  useEffect(async () => {
    setLoader(true);
    const { GetCategoryListerror, GetCategoryListresponse } =
      await CategoryList(30);
    if (GetCategoryListresponse.data.StatusCode == "1") {
      // console.log("Category List Response Done");
    } else {
      setLoader(false);
      // console.log("Category List Error", GetCategoryListerror);
    }

    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();
    if (UserCategoryQuestionResponse.data.StatusCode == "1") {
      getFilterCatgories(UserCategoryQuestionResponse.data.Result);

      // console.log(
      //   "User Category Question Response Done  ===>>>",
      //   UserCategoryQuestionResponse
      // );
    } else {
      setLoader(false);

      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   GetCategoryListerror
      // );
    }

    const { specialMomentResponse, specialMomentError } =
      await GetSpecialMoment();
    if (specialMomentResponse.data.StatusCode == "1") {
      console.log("special MomentResponse Done");
    } else {
      setLoader(false);
      console.log(" special Moment Error");
    }

    const {
      getUserCategorySpecialMomentResponse,
      getUserCategorySpecialMomentError,
    } = await getUserCategorySpecialMoment();
    if (getUserCategorySpecialMomentResponse.data.StatusCode == "1") {
      console.log("special User Moment Response Done ");
      setLoader(false);
    } else {
      setLoader(false);
      console.log(
        " special User Moment Response Error",
        getUserCategorySpecialMomentError
      );
    }
  }, []);

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getAddItemShowItem, setAddItemShowItem] = useState("");

  // getEditItemModal
  const [getEditItemModal, setEditItemModal] = useState(false);
  const [getEditItem, setEditItem] = useState("");

  // getAddNewItemModal
  const [getAddNewItemModal, setAddNewItemModal] = useState(false);
  const [getAddNewItem, setAddNewItem] = useState("");

  // Update Data Modal
  const [getUpdateDataModal, setUpdateDataModal] = useState(false);
  const [getUpdateDataItem, setUpdateDataItem] = useState("");

  // Payment for upgrade
  const [getupgradeItemModal, setupgradeItemModal] = useState(false);

  const [getQuestions, setQuestions] = useState("");
  const [getImage, setImage] = useState("");
  const [getQuestionsData, setQuestionsData] = useState([]);
  const [getShowOldQuestion, setShowOldQuestion] = useState([]);
  const [getUpdateQuestionData, setUpdateQuestionData] = useState([]);
  const [getIdItem, setIdItem] = useState("");
  const [getLoader, setLoader] = useState(false);
  const [getId, seGetId] = useState("0");

  const [getFilterCat, setFilterCat] = useState(categories);

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

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      // includeBase64: true,
    }).then((image) => {
      setImage(image.path);
      console.log("image===>", image);
    });
  };

  // Close All Item
  const CloseItem = () => {
    // setAddNewFreshItemModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setupgradeItemModal(false);
    setUpdateDataModal(false);
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
    setQuestionsData(temp);
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    // API
    const { addCategoryQuestionError, addCategoryQuestionResponse } =
      await addCategoryQuestion(userData, 0, getQuestionsData);
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
      console.log(
        "User Category Question Response Error  ===>>>",
        UserCategoryQuestionResponse
      );
      console.log(
        "Question Response ==>>>",
        UserCategoryQuestionResponse.data.Result
      );
    } else {
      // setAddNewFreshItemModal(true);
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

    // API
    const { updateCategoryQuestionResponse, updateCategoryQuestionError } =
      await updateCategoryQuestion(userData, getUpdateQuestionData);

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

  // Payment for upgrade
  const upgradeItem = () => {
    console.log("111");
    setupgradeItemModal(true);
  };

  return (
    <View style={CommonStyle.BgColorWhite}>
      <MyBlackStatusbar />
      <SafeAreaView>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[CommonStyle.BgColorWhite]}
          keyboardShouldPersistTaps={"always"}
        >
          <View style={CommonStyle.authPage}>
            <View style={CommonStyle.Container}>
              <View style={[CommonStyle.my16, CommonStyle.Row]}>
                <Image
                  source={
                    userData.userProfileImage != ""
                      ? { uri: userData.userProfileImage }
                      : imgPlaceHolder
                  }
                  style={CommonStyle.ProfileImage}
                />
                <Text style={[CommonStyle.userName]}>
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
                {AppString.ExploreShare}
              </Text>
            </View>

            <View style={{ backgroundColor: COLORS.Secondary }}>
              <Image
                source={imgExploreaNShare}
                style={MainScreenStyle.homeImg}
              />
              <View style={{ paddingHorizontal: 15 }}>
                <ScrollView
                  keyboardShouldPersistTaps={"always"}
                  contentContainerStyle={[
                    MainScreenStyle.scrollItemStyle,
                    CommonStyle.p8,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  {userCategoryQuestion.length > 0 &&
                    userCategoryQuestion.map((item, index) => {
                      return (
                        <ExploreShareList
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
                              item.Image,
                              item.category_id,
                              index,
                              item.questions
                            )
                          }
                          // AddNewOnPress={() => AddItemShow(index)}
                        />
                      );
                    })}
                  <ExploreShareList
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
            </View>

            <View style={[CommonStyle.Container, CommonStyle.BgColorWhite]}>
              <Text
                style={[
                  CommonStyle.txtTitle,
                  CommonStyle.textUpperCase,
                  CommonStyle.my16,
                  { fontFamily: FONT.NotoSans },
                ]}
              >
                {AppString.Upgradeformorecategories}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: COLORS.Secondary,
                paddingHorizontal: 15,
              }}
            >
              <ScrollView
                keyboardShouldPersistTaps={"always"}
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.p8,
                  { justifyContent: "flex-start" },
                ]}
              >
                {getFilterCat.length > 0 &&
                  getFilterCat.map((item, index) => (
                    <UpgradeCategoriesList
                      ImageUrl={imgBook}
                      ExploreName={item.category_name}
                      Id={item.category_id}
                      index={index}
                      key={index}
                      DataLength={item.category_id}
                      onPress={() => {
                        userCategoryQuestion.length != 5
                          ? SelectCategoriesItem(
                              item.category_name,
                              item.Image,
                              item.category_id,
                              item.questions,
                              index
                            )
                          : upgradeItem();
                      }}
                      // onPress={() => upgradeItem()}
                      // AddNewOnPress={() => upgradeItem()}
                    />
                  ))}
              </ScrollView>
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
                        keyboardShouldPersistTaps={"always"}
                        contentContainerStyle={[
                          MainScreenStyle.scrollItemStyle,
                        ]}
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
                      <View style={{ width: "60%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            { textAlign: "center", marginTop: 10 },
                          ]}
                        >
                          m111 {getUpdateDataItem}
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
                      <View style={{ width: "60%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            CommonStyle.p16,
                            { textAlign: "center" },
                          ]}
                        >
                          m222 {getAddNewItem}
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
                        (CommonStyle.Row,
                        CommonStyle.p16,
                        CommonStyle.txtContent)
                      }
                    >
                      {AppString.txtUpgradecategories1}
                      <Text style={{ color: COLORS.gold }}>
                        {AppString.price}
                      </Text>
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
          </View>
        </ScrollView>
      </SafeAreaView>
      <Spinner visible={getLoader} />
    </View>
  );
};
const Styles = StyleSheet.create({
  listIconbg: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeListbg: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
  },
  listIcon: {
    width: 25,
    height: 25,
  },
  listfontbg: {
    // flexDirection: 'row',
  },
  listfont: {
    fontSize: 14,
    marginTop: 5,
    alignItems: "center",
  },
  popupImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
  scrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default HomeScreen;
