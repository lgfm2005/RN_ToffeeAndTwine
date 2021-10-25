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
  imgLeftBack,
} from "../../../Assets/utils/Image";
import { SimpleInputEditView } from "../../../Components/FormInput";
import BackToolBar from "../../../Components/BackToolBar";
import { MainScreenStyle } from "../../MainScreen/MainScreenStyle";
import { UpgradeCategoriesList } from "../../../Components/AllListVIew/UpgradeCategoriesList";

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
    Name: AppString.Candy,
    Image: imgCandy,
  },
  {
    id: 8,
    Name: AppString.Clothes,
    Image: imgClothes,
  },
  {
    id: 9,
    Name: AppString.Jewelry,
    Image: imgJewelry,
  },
  {
    id: 10,
    Name: AppString.Shoes,
    Image: imgShoes,
  },
];

const numColumns = 5;
const size = Dimensions.get("window").width;
const keyboardVerticalOffset = Platform.OS === "ios" ? 10 : 0;

const TutorialSecond = ({ navigation, props }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [getModalName, setModalName] = useState("");

  const [getImage, setImage] = useState("");
  const [getFirstName, setFirstName] = useState("");
  const [getSecondName, setSecondName] = useState("");
  const [getThirdName, setThirdName] = useState("");
  const [getFourName, setFourName] = useState("");
  const [getFiveName, setFiveName] = useState("");
  const [getSixName, setSixName] = useState("");

  const popUp = (popUpName) => {
    setModalVisible(true);
    setModalName(popUpName);
  };

  const ImageChange = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImage(image.path);
    });
  };

  const CloseDatePicker = () => {
    setModalVisible(false);
  };

  const SaveDatePicker = () => {
    setModalVisible(false);
  };

  // const RenderItem = (item) => (
  //     <TouchableOpacity onPress={() => popUp(item.Name)}>
  //         <View style={Styles.itemContainer}>
  //             <View style={Styles.listIconbg}>
  //                 <Image source={item.Image} style={Styles.listIcon} />
  //             </View>
  //             <View style={Styles.listfontbg}>
  //                 <Text style={Styles.listfont}>{item.Name}</Text>
  //             </View>
  //         </View>
  //     </TouchableOpacity>
  // )

  return (
    <SafeAreaView style={(CommonStyle.BgColorWhite, CommonStyle.height)}>
      <View style={CommonStyle.authPage}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={CommonStyle.Container}>
            <BackToolBar
              titleName={AppString.Skip}
              ImageLink={imgLeftBack}
              onPressImage={() => navigation.navigate("TutorialFirst")}
              onPressText={() => navigation.navigate("Navigation")}
            />
          </View>

          <Image
            source={imgSilderSecond}
            style={[CommonStyle.imgGiftTutorial, CommonStyle.my16]}
          />

          <View>
            <View style={CommonStyle.Container}>
              <Text style={CommonStyle.txtTitle}>{AppString.Almostthere}</Text>

              <Text style={CommonStyle.txtContent}>
                {AppString.Specialmoment}
              </Text>

              <ScrollView
                contentContainerStyle={[
                  MainScreenStyle.scrollItemStyle,
                  CommonStyle.p8,
                ]}
              >
                {Data.length > 0 &&
                  Data.map((item, index) => (
                    <UpgradeCategoriesList
                      ImageUrl={item.Image}
                      ExploreName={item.Name}
                      Id={item.id}
                      index={index}
                      key={index}
                      onPress={() => popUp(item.Name)}
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
                        <Text style={[CommonStyle.txtTitle]}>
                          {getModalName}
                        </Text>
                      </View>
                    </View>

                    <View style={CommonStyle.mb16}>
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
                        onPress={() => CloseDatePicker()}
                      />

                      <POPLinkButton
                        buttonName={AppString.Save}
                        onPress={() => SaveDatePicker()}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("TutorialThird")}
            >
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
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  itemContainer: {
    width: size * (numColumns / 30),
    height: size * (numColumns / 20),
  },
  listIconbg: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: COLORS.gray,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  listIcon: {
    width: 25,
    height: 25,
  },
  listfontbg: {
    flexDirection: "row",
    justifyContent: "center",
  },
  listfont: {
    fontSize: 15,
    marginTop: 5,
  },
  popupImage: {
    width: 45,
    height: 45,
    borderRadius: 40,
  },
});

export default TutorialSecond;
