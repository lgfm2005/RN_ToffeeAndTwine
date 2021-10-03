import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

// Lib
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";
import Spinner from "react-native-loading-spinner-overlay";

// Asset
import { AppString } from "../../../Assets/utils/AppString";
import { COLORS } from "../../../Assets/utils/COLORS";
import CommonStyle from "../../../Assets/Style/CommonStyle";
import TutorialStyle from "./TutorialStyle";
import {
  POPLinkButton,
  POPOutLinkButton,
} from "../../../Components/Button/Button";
import { FilledButton } from "../../../Components/Button/Button";
import {
  imgArrowRight,
  imgSilderSecond,
  imgImport,
  imgLeftBack,
} from "../../../Assets/utils/Image";
import { SimpleInputEditView } from "../../../Components/FormInput";
import BackToolBar from "../../../Components/BackToolBar";
import { MainScreenStyle } from "../../MainScreen/MainScreenStyle";
import { UpgradeCategoriesList } from "../../../Components/AllListVIew/UpgradeCategoriesList";
import { FONT } from "../../../Assets/utils/FONT";
import { useActions } from "../../../redux/actions";

const keyboardVerticalOffset = Platform.OS === "ios" ? 5 : 0;
var temp,
  temp2 = [];
var items, list;
const TutorialSecond = ({ navigation, props, route }) => {
  const { addCategoryQuestion, CategoryList } = useActions();

  const { categoryList, tokens } = route.params;

  const [getlistOfCategory, setListOfCategory] = useState(categoryList);
  const [getIndexIcon, setIndexIcon] = useState("");
  const [getQuestions, setQuestions] = useState("");
  const [getQuestionsData, setQuestionsData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [getLoader, setLoader] = useState(false);

  const [getModalName, setModalName] = useState("");

  const [getImage, setImage] = useState("");

  const NextScreen = async () => {
    setLoader(true);
    const { GetCategoryListerror, GetCategoryListresponse } =
      await CategoryList(30, tokens);
    if (GetCategoryListresponse.data.StatusCode == "1") {
      setLoader(false);
      navigation.navigate("Navigation");
    }
  };

  const TutorialThirdScreen = async () => {
    setLoader(true);
    const { GetCategoryListerror, GetCategoryListresponse } =
      await CategoryList(30, tokens);
    if (GetCategoryListresponse.data.StatusCode == "1") {
      setLoader(false);
      navigation.navigate("TutorialThird", {
        tokens: tokens,
      });
    }
  };

  const popUp = (popUpName, questionsList, index) => {
    let flag = false;
    getlistOfCategory.map((item) => {
      if (flag == false)
        if (item.isSelected == true) {
          setModalVisible(false);
          flag = true;
        } else {
          setModalVisible(true);
        }
    });

    setModalName(popUpName);
    setQuestions(questionsList);
    setIndexIcon(index);
  };

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
      console.log("image===>", image.path);
    });
  };

  const CloseDatePicker = () => {
    setModalVisible(false);
  };

  const setSecondTemp = (categoryId, categoryQuestionId, value, key) => {
    temp2[key] = {
      categoryId,
      categoryQuestionId,
      value,
      key,
    };
    temp = temp2;
  };

  // Add New Categories Question
  const HandelQuestionData = (categoryId, categoryQuestionId, value, key) => {
    temp[key] = {
      categoryId,
      categoryQuestionId,
      value,
      key,
    };
    setQuestionsData(temp);
  };

  const SubmitData = async () => {
    setModalVisible(false);
    setLoader(true);
    // API
    const { addCategoryQuestionError, addCategoryQuestionResponse } =
      await addCategoryQuestion(tokens, 1, getQuestionsData);
    if (addCategoryQuestionResponse.data.StatusCode == "1") {
      setModalVisible(false);
      // List Icon COLOR Change
      list = getlistOfCategory;
      items = list[getIndexIcon];
      items.isSelected = true;
      list[getIndexIcon] = items;

      console.log("Question Response ==>>>", addCategoryQuestionResponse);
    } else {
      setModalVisible(false);
      console.log("Question Error ==>>>", addCategoryQuestionError);
    }
    setLoader(false);
  };

  return (
    <SafeAreaView style={CommonStyle.BgColorWhite}>
      <View style={CommonStyle.authPage}>
        <View style={CommonStyle.Container}>
          <BackToolBar
            titleName={AppString.Skip}
            ImageLink={imgLeftBack}
            onPressImage={() => navigation.goBack()}
            onPressText={() => NextScreen()}
          />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Image
            source={imgSilderSecond}
            style={[CommonStyle.imgGiftTutorial, CommonStyle.my16]}
          />

          <View>
            <View style={CommonStyle.Container}>
              <Text style={[CommonStyle.txtTitle, { fontFamily: FONT.Gilroy }]}>
                {AppString.Almostthere}
              </Text>

              <Text
                style={[CommonStyle.txtContent, { fontFamily: FONT.Gilroy }]}
              >
                {AppString.Specialmoment}
              </Text>

              <ScrollView
                scrollEnabled={false}
                contentContainerStyle={[MainScreenStyle.scrollItemStyle]}
              >
                {getlistOfCategory.map((item, index) => (
                  <UpgradeCategoriesList
                    ImageUrl={item.Image}
                    ExploreName={item.Name}
                    checkColor={item.isSelected}
                    Id={item.id}
                    index={index}
                    key={index}
                    onPress={() => popUp(item.Name, item.questions, index)}
                  />
                ))}
              </ScrollView>
            </View>

            {isModalVisible == true ? (
              <Modal testID={"modal"} isVisible={isModalVisible}>
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
                              style={CommonStyle.popupImage}
                            />
                          ) : (
                            <Image
                              source={imgImport}
                              style={CommonStyle.popupImage}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={{ width: "80%" }}>
                        <Text
                          style={[
                            CommonStyle.txtTitle,
                            { fontFamily: FONT.Gilroy },
                          ]}
                        >
                          {getModalName}
                        </Text>
                      </View>
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
                              placeholderTextColor={COLORS.Primary}
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

                    <View style={CommonStyle.Row}>
                      <POPOutLinkButton
                        buttonName={AppString.Cancel}
                        onPress={() => CloseDatePicker()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Save}
                        onPress={() => SubmitData()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}
          </View>
        </ScrollView>

        <View style={[TutorialStyle.silderbg, CommonStyle.Container]}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.black },
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                { backgroundColor: COLORS.gray },
              ]}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => TutorialThirdScreen()}>
              <View style={TutorialStyle.SilderbgImg}>
                <Image
                  source={imgArrowRight}
                  style={TutorialStyle.silderIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Spinner visible={getLoader} />
    </SafeAreaView>
  );
};

export default TutorialSecond;
