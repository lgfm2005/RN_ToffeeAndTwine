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

import { ExploreShareList } from "../../Components/AllListVIew/ExploreShareList";
import { UpgradeCategoriesList } from "../../Components/AllListVIew/UpgradeCategoriesList";
import { SelectCategoriesList } from "../../Components/AllListVIew/SelectCategoriesList";

import { MyBlackStatusbar } from "../../Components/MyStatusBar/MyBlackStatusbar";
import { MyWhiteStatusbar } from "../../Components/MyStatusBar/MyWhiteStatusbar";
import { FONT } from "../../Assets/utils/FONT";

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

const UpgradeCatData = [
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
  {
    id: 8,
    Name: AppString.Flowers,
    Image: imgFlowers,
  },
  {
    id: 9,
    Name: AppString.Laptop,
    Image: imgLaptop,
  },
  {
    id: 10,
    Name: AppString.Ring,
    Image: imgRing,
  },
  {
    id: 11,
    Name: AppString.Book,
    Image: imgBook,
  },
  {
    id: 12,
    Name: AppString.Book,
    Image: imgBook,
  },
  {
    id: 13,
    Name: AppString.Dessert,
    Image: imgDesserts,
  },
  {
    id: 14,
    Name: AppString.Flowers,
    Image: imgFlowers,
  },
  {
    id: 15,
    Name: AppString.Laptop,
    Image: imgLaptop,
  },
  {
    id: 16,
    Name: AppString.Ring,
    Image: imgRing,
  },
  {
    id: 17,
    Name: AppString.Book,
    Image: imgBook,
  },
  {
    id: 18,
    Name: AppString.Book,
    Image: imgBook,
  },
];

const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((state) => state.session);
  debugger;

  // AddItemShow
  const [getAddItemShowModal, setAddItemShowModal] = useState(false);
  const [getAddItemShowItem, setAddItemShowItem] = useState("");

  // AddNewFreshItem
  const [getAddNewFreshItemModal, setAddNewFreshItemModal] = useState(false);
  const [getAddNewFreshItem, setAddNewFreshItemItem] = useState("");

  // getEditItemModal
  const [getEditItemModal, setEditItemModal] = useState(false);
  const [getEditItem, setEditItem] = useState("");

  // getAddNewItemModal
  const [getAddNewItemModal, setAddNewItemModal] = useState(false);
  const [getAddNewItem, setAddNewItem] = useState("");

  // getupgradeItemModal
  const [getupgradeItemModal, setupgradeItemModal] = useState(false);

  const [getImage, setImage] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getSecondName, setSecondName] = useState("");
  const [getThirdName, setThirdName] = useState("");
  const [getFourName, setFourName] = useState("");
  const [getFiveName, setFiveName] = useState("");
  const [getSixName, setSixName] = useState("");

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

  // Save All Item
  const SaveItem = () => {
    setAddNewFreshItemModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
  };

  // Close All Item
  const CloseItem = () => {
    setAddNewFreshItemModal(false);
    setAddItemShowModal(false);
    setEditItemModal(false);
    setAddNewItemModal(false);
    setupgradeItemModal(false);
  };

  // Add New --> Show
  const AddItemShow = () => {
    console.log("Show");
    setAddItemShowModal(true);
  };

  // Add --> Select categories
  const SelectCategoriesItem = (Name, Image, id) => {
    console.log(" Select categories ===>>>", Name, Image, id);
    setAddItemShowModal(false);
    // setAddNewFreshItemModal(true)
    AddNewFreshItem(Name, Image, id);
  };

  // Add --> Select Categories --> New Item
  const AddNewFreshItem = (Name, Image, id) => {
    console.log("Select Categories --> New Item ===>>>", Name, Image, id);
    setAddNewItemModal(false);
    setEditItemModal(true);
    setAddNewItem(Name);
  };

  // Old Select Categories -- > Edit Item
  const AddEditItem = (getAddNewItem) => {
    setAddNewItemModal(false);
    setEditItemModal(true);
    setEditItem(getAddNewItem);
  };

  // Select old Categories --> Open
  const AddNewItem = (Name, Image, id) => {
    console.log("Name", Name);
    console.log("Image", Image);
    console.log("id", id);
    setAddNewItemModal(true);
    setAddNewItem(Name);
  };

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
                <Image source={demodp} style={CommonStyle.ProfileImage} />
                <Text style={[CommonStyle.userName]}>Heather Swan</Text>
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
                  {Data.map((item, index) => (
                    <ExploreShareList
                      ImageUrl={item.Image}
                      ExploreName={item.Name}
                      Id={item.id}
                      index={index}
                      key={index}
                      DataLength={Data.length}
                      onPress={() => AddNewItem(item.Name, item.Image, item.id)}
                      AddNewOnPress={() => AddItemShow()}
                    />
                  ))}
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
                {UpgradeCatData.map((item, index) => (
                  <UpgradeCategoriesList
                    ImageUrl={item.Image}
                    ExploreName={item.Name}
                    Id={item.id}
                    index={index}
                    key={index}
                    DataLength={Data.length}
                    onPress={() => upgradeItem()}
                    // AddNewOnPress={() => upgradeItem()}
                  />
                ))}
              </ScrollView>
            </View>

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
                        {Data.map((item, index) => (
                          <SelectCategoriesList
                            ImageUrl={item.Image}
                            ExploreName={item.Name}
                            Id={item.id}
                            index={index}
                            key={index}
                            DataLength={Data.length}
                            onPress={() =>
                              SelectCategoriesItem(
                                item.Name,
                                item.Image,
                                item.id
                              )
                            }
                          />
                        ))}
                      </ScrollView>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

            {getAddNewFreshItemModal == true ? (
              <Modal
                testID={"modal"}
                isVisible={getAddNewFreshItem}
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
                          {getAddNewItem}
                        </Text>
                      </View>
                    </View>

                    <View style={CommonStyle.my16}>
                      <SimpleInputEditView
                        TitleName={"Color"}
                        placeholder={"Enter here"}
                        onChangeText={(FirstName) => setFirstName(FirstName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Type"}
                        placeholder={"Enter here"}
                        onChangeText={(SecondName) => setSecondName(SecondName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Amount"}
                        placeholder={"Enter here"}
                        onChangeText={(ThirdName) => setThirdName(ThirdName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Vase"}
                        placeholder={"Enter here"}
                        onChangeText={(FourName) => setFourName(FourName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        placeholder={"Enter here"}
                        onChangeText={(FiveName) => setFiveName(FiveName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Other Info"}
                        placeholder={"Enter here"}
                        onChangeText={(SixName) => setSixName(SixName)}
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
                        onPress={() => SaveItem()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

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
                            CommonStyle.p16,
                            { textAlign: "center" },
                          ]}
                        >
                          {getAddNewItem}
                        </Text>
                      </View>
                    </View>

                    <View style={CommonStyle.my16}>
                      <EditShowSimpleView
                        TitleName={"Color"}
                        buttonName={"Demo111"}
                      />
                      <EditShowSimpleView
                        TitleName={"Type"}
                        buttonName={"Demo"}
                      />
                      <EditShowSimpleView
                        TitleName={"Amount"}
                        buttonName={"Demo"}
                      />
                      <EditShowSimpleView
                        TitleName={"Vase"}
                        buttonName={"Demo"}
                      />
                      <EditShowSimpleView
                        TitleName={"Link"}
                        buttonName={"Demo"}
                      />
                      <EditShowSimpleView
                        TitleName={"Other Info"}
                        buttonName={"Demo"}
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
                      <SimpleInputEditView
                        TitleName={"Color"}
                        placeholder={"Enter here"}
                        onChangeText={(FirstName) => setFirstName(FirstName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Type"}
                        placeholder={"Enter here"}
                        onChangeText={(SecondName) => setSecondName(SecondName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Amount"}
                        placeholder={"Enter here"}
                        onChangeText={(ThirdName) => setThirdName(ThirdName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Vase"}
                        placeholder={"Enter here"}
                        onChangeText={(FourName) => setFourName(FourName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Link"}
                        placeholder={"Enter here"}
                        onChangeText={(FiveName) => setFiveName(FiveName)}
                      />
                      <SimpleInputEditView
                        TitleName={"Other Info"}
                        placeholder={"Enter here"}
                        onChangeText={(SixName) => setSixName(SixName)}
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
                        onPress={() => SaveItem()}
                      />
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </Modal>
            ) : null}

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
