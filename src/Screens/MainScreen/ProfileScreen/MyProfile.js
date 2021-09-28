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
import { FONT } from "../../../Assets/utils/FONT";
import { ShareAppLink } from "../../../Assets/utils/ShareLink";
import { CalSelectCategoriesList } from "../CalendarScreen/CalSelectCategoriesList";
import TutorialStyle from "../../Signup/Tutorial/TutorialStyle";
import { SelectCategoriesList } from "../../../Components/AllListVIew/SelectCategoriesList";
import {
  EditShowSimpleView,
  SimpleInputEditView,
} from "../../../Components/FormInput";

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
const MyProfile = ({ navigation }) => {
  const {
    addCategoryQuestion,
    getUserCategoryQuestion,
    updateCategoryQuestion,
    deleteUserCategoryQuestion,
  } = useActions();

  const userData = useSelector((state) => state.session);
  const specialMoment = useSelector((state) => state.specialMoment);
  const userSpecialMoment = useSelector((state) => state.UserSpecialMoment);

  const categories = useSelector((state) => state.categories);
  const userCategoryQuestion = useSelector(
    (state) => state.UserCategoryQuestion
  );

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getShowOldQuestion, setShowOldQuestion] = useState([]);
  const [getFilterCat, setFilterCat] = useState(categories);
  // getAddNewItemModal
  const [getAddNewItemModal, setAddNewItemModal] = useState(false);
  const [getAddNewItem, setAddNewItem] = useState("");
  // getEditItemModal
  const [getEditItemModal, setEditItemModal] = useState(false);
  const [getImage, setImage] = useState("");
  const [getQuestions, setQuestions] = useState("");
  const [getQuestionsData, setQuestionsData] = useState([]);
  // Update Data Modal
  const [getUpdateDataModal, setUpdateDataModal] = useState(false);
  const [getUpdateDataItem, setUpdateDataItem] = useState("");
  const [getUpdateQuestionData, setUpdateQuestionData] = useState([]);
  const [getIdItem, setIdItem] = useState("");
  const [getLoader, setLoader] = useState(false);

  useEffect(() => {
    getFilterCatgories(userCategoryQuestion);
  }, []);

  const getFilterCatgories = (data) => {
    var dataCategory = categories;
    data.map((items, indexs) => {
      dataCategory = dataCategory.filter((item) => {
        return item.category_id !== items.category_id;
      });
    });
    setFilterCat(dataCategory);
    // console.log(getFilterCat);
  };

  // Close All Item
  const CloseItem = () => {
    setAddItemShowModal(false);
    setAddNewItemModal(false);
    setEditItemModal(false);
    setUpdateDataModal(false);
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

  // Select Item Categories --> Open
  const ShowOldItem = (Name, Image, id, key, questions) => {
    console.log("ShowOldItem Name", Name);
    console.log("ShowOldItem Image", Image);
    console.log("ShowOldItem id", id);
    console.log("ShowOldItem key", key);
    setAddNewItemModal(true);
    setAddNewItem(Name);
    setIdItem(id);
    setShowOldQuestion(questions);
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
  };

  // Add New Categories Question
  const HandelQuestionData = (categoryId, categoryQuestionId, value, key) => {
    temp[key] = { categoryId, categoryQuestionId, value, key };
    setQuestionsData(temp);
  };

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getAddNewItem) => {
    setAddNewItemModal(false);
    setUpdateDataModal(true);
    setUpdateDataItem(getAddNewItem);

    // setEditItemModal(true);
    // setEditItem(getAddNewItem);
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
      setUpdateDataModal(true);
      console.log("Question Error ==>>>", updateCategoryQuestionError);
      console.log(
        "User Category Question Response Error  ===>>>",
        GetCategoryListerror
      );
    }
    setLoader(false);
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

  /// Special Moment Day

  return (
    <View style={[CommonStyle.BgColorWhite, CommonStyle.mb10]}>
      <SafeAreaView>
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
                    style={[
                      CommonStyle.txtTitle,
                      { fontFamily: FONT.NotoSans },
                    ]}
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
                    style={[
                      CommonStyle.txtTitle,
                      { fontFamily: FONT.NotoSans },
                    ]}
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
                    style={[
                      CommonStyle.txtTitle,
                      { fontFamily: FONT.NotoSans },
                    ]}
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
                    CommonStyle.p8,
                    { justifyContent: "flex-start" },
                  ]}
                >
                  {userCategoryQuestion.map((item, index) => {
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
                  <CalendarList
                    ShowBtn={true}
                    key={1}
                    AddNewOnPress={() => AddItemShow(0)}
                  />
                </ScrollView>
                {/* <ScrollView
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
              </ScrollView> */}
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
                  {/*  */}
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
                  <View>
                    <ScrollView
                      contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
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
                      <TouchableOpacity onPress={() => DeletedExplore()}>
                        <Image
                          source={imgDelete}
                          style={CommonStyle.imgIconSize}
                        />
                      </TouchableOpacity>
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
                          <Image source={imgImport} style={Styles.popupImage} />
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
        </ScrollView>
      </SafeAreaView>
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
