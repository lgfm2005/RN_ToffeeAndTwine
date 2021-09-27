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
  imgCoffee,
  imgDesserts,
  imgFlowers,
  imgLaptop,
  imgRing,
  imgBook,
  imgCandy,
  imgClothes,
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
var temp = [];
var data = new FormData();
var items, list, userData;
const HomeScreen = () => {
  const {
    addCategoryQuestion,
    CategoryList,
    getUserCategoryQuestion,
    updateCategoryQuestion,
    GetSpecialMoment,
    getUserCategorySpecialMoment,
  } = useActions();

  userData = useSelector((state) => state.session);
  const categories = useSelector((state) => state.categories);
  const userCategoryQuestion = useSelector(
    (state) => state.UserCategoryQuestion
  );

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
  const [getLoader, setLoader] = useState(false);
  debugger;
  const [getFilterCat, setFilterCat] = useState(categories);

  const getFilterCatgories = (data) => {
    debugger;
    var dataCategory = categories;
    data.map((items, indexs) => {
      dataCategory = dataCategory.filter((item) => {
        return item.category_id !== items.category_id;
      });
    });
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

  // Add New Categories Question
  const HandelQuestionData = (categoryId, categoryQuestionId, value, key) => {
    temp[key] = { categoryId, categoryQuestionId, value, key };
    setQuestionsData(temp);
  };

  // Submit Add New Categories Question
  const SaveItem = async () => {
    setUpdateDataModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    getQuestionsData.map((item) => {
      data.append("IsFirst", 1);
      data.append("CategoryID[]", item.categoryId);
      data.append("CategoryQuestionID[]", item.categoryQuestionId);
      data.append("CategoryQuestionValue[]", item.value);
    });

    // API
    const { addCategoryQuestionError, addCategoryQuestionResponse } =
      await addCategoryQuestion(userData.token, data);
    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();

    if (
      addCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      setAddItemShowModal(false);
      setEditItemModal(false);
      setAddNewItemModal(false);
      setLoader(false);
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   UserCategoryQuestionResponse
      // );
      // console.log("Question Response ==>>>", addCategoryQuestionResponse);
    } else {
      // setAddNewFreshItemModal(true);
      setAddItemShowModal(true);
      setEditItemModal(true);
      setAddNewItemModal(true);
      // console.log("Question Error ==>>>", addCategoryQuestionError);
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   UserCategoryQuestionError
      // );
    }
    setLoader(false);
  };

  // Update Categories Question
  const UpdateQuestionData = (categoryQuestionId, value, key) => {
    temp[key] = { categoryQuestionId, value };
    setUpdateQuestionData(temp);
  };
  // Submit Update Data Categories Question
  const SubmitUpdateQuestionData = async () => {
    setUpdateDataModal(true);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setLoader(true);

    console.log("getUpdateQuestionData", getUpdateQuestionData);
    getUpdateQuestionData.map((item) => {
      data.append("UserCategoryQuestionID[]", item.categoryQuestionId);
      data.append("CategoryQuestionValue[]", item.value);
    });
    // API
    const { updateCategoryQuestionResponse, updateCategoryQuestionError } =
      await updateCategoryQuestion(userData.token, data);

    const { UserCategoryQuestionError, UserCategoryQuestionResponse } =
      await getUserCategoryQuestion();

    if (
      updateCategoryQuestionResponse.data.StatusCode == "1" &&
      UserCategoryQuestionResponse.data.StatusCode == "1"
    ) {
      // setAddNewFreshItemModal(false);
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
      setUpdateDataModal(true);
      // console.log("Question Error ==>>>", updateCategoryQuestionError);
      // console.log(
      //   "User Category Question Response Error  ===>>>",
      //   GetCategoryListerror
      // );
    }
    setLoader(false);
  };

  // Select Item Categories --> Open
  const ShowOldItem = (Name, Image, id, key, questions) => {
    console.log("Name", Name);
    console.log("Image", Image);
    console.log("id", id);
    console.log("key", key);
    setAddNewItemModal(true);
    setAddNewItem(Name);
    setShowOldQuestion(questions);
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
  };

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getAddNewItem) => {
    setAddNewItemModal(false);
    setUpdateDataModal(true);
    setUpdateDataItem(getAddNewItem);

    // setEditItemModal(true);
    // setEditItem(getAddNewItem);
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
        >
          <View style={CommonStyle.authPage}>
            <View style={CommonStyle.Container}>
              <View style={[CommonStyle.my16, CommonStyle.Row]}>
                <Image
                  source={{ uri: userData.userProfileImage }}
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
                  contentContainerStyle={[
                    MainScreenStyle.scrollItemStyle,
                    CommonStyle.p8,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  {userCategoryQuestion.map((item, index) => {
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
                        AddNewOnPress={() => AddItemShow(index)}
                      />
                    );
                  })}
                  <ExploreShareList
                    ShowBtn={true}
                    key={1}
                    AddNewOnPress={() => AddItemShow(0)}
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
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.p8,
                  { justifyContent: "flex-start" },
                ]}
              >
                {getFilterCat.map((item, index) => (
                  <UpgradeCategoriesList
                    ImageUrl={imgBook}
                    ExploreName={item.category_name}
                    Id={item.category_id}
                    index={index}
                    key={index}
                    DataLength={item.category_id}
                    onPress={() => upgradeItem()}
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
                    <View>
                      <ScrollView
                        contentContainerStyle={[
                          MainScreenStyle.scrollItemStyle,
                        ]}
                      >
                        {getFilterCat.map((item, index) => (
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
                      <View style={CommonStyle.PopModalWidth60}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            { textAlign: "center", marginTop: 10 },
                          ]}
                        >
                          {getUpdateDataItem}
                        </Text>
                      </View>
                    </View>

                    <View style={CommonStyle.my16}>
                      {getShowOldQuestion.map((item, key) => {
                        return (
                          <SimpleInputEditView
                            TitleName={item.category_question}
                            buttonName={item.category_placeholder}
                            onChangeText={(value) =>
                              UpdateQuestionData(
                                item.user_category_question_id,
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
                    </View>
                    <View style={CommonStyle.my16}>
                      {getShowOldQuestion.map((item, index) => {
                        return (
                          <EditShowSimpleView
                            TitleName={item.category_question}
                            buttonName={item.question_value}
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
                      <View style={CommonStyle.PopModalWidth60}>
                        <Text style={[CommonStyle.txtTitle, CommonStyle.p16]}>
                          {getAddNewItem}
                        </Text>
                      </View>
                    </View>

                    <View style={CommonStyle.my16}>
                      {getQuestions.map((item, key) => {
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
                      onPress={() => CloseItem()}
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
