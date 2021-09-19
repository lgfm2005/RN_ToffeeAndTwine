import React, { useEffect, useState } from "react";
import {
  ScrollView,
  PixelRatio,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../Assets/utils/COLORS";
import { imgGoogle, imgArrowRight } from "../../../Assets/utils/Image";

import TutorialFirst from "../Tutorial/TutorialFirst";
import TutorialSecond from "../Tutorial/TutorialSecond";
import TutorialThird from "../Tutorial/TutorialThird";

const Slider = ({ navigation, props }) => {
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const { width, height } = Dimensions.get("window");

  const [gets1, sets1] = useState(false);

  const setSliderPage = (event) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const NavigationSlider = () => {
    console.log("Lol");
    navigation.push("Navigation");
  };

  const Checks1 = () => {
    sets1(true);
    console.log(" date picker data saved ");
  };

  const { currentPage: pageIndex } = sliderState;

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyle.MainContainer}>
        <ScrollView
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            setSliderPage(event);
          }}
        >
          <View style={{ width, height }}>
            <TutorialFirst slide1Check={() => Checks1()} />
          </View>
          <View style={{ width, height }}>
            <TutorialSecond />
          </View>
          <View style={{ width, height }}>
            <TutorialThird />
          </View>
        </ScrollView>

        <View style={styles.paginationWrapper}>
          <View style={styles.bgbottombar}>
            <View
              style={{ flexDirection: "row", justifyContent: "flex-start" }}
            >
              {Array.from(Array(3).keys()).map((key, index) => (
                <View
                  style={[
                    styles.paginationDots,
                    { opacity: pageIndex === index ? 1 : 0.2 },
                  ]}
                  key={index}
                />
              ))}
            </View>

            <TouchableOpacity
              disabled={gets1 ? false : true}
              onPress={() => NavigationSlider()}
            >
              <View
                style={[
                  styles.bgicon,
                  { backgroundColor: gets1 ? COLORS.black : COLORS.gray },
                ]}
              >
                <Image source={imgArrowRight} style={styles.icon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Slider;

const styles = StyleSheet.create({
  imageStyle: {
    height: PixelRatio.getPixelSizeForLayoutSize(135),
    width: "100%",
  },
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: COLORS.black,
    marginLeft: 10,
  },
  bgbottombar: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 25,
    paddingRight: 25,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  icon: {
    width: 25,
    height: 25,
  },
  bgicon: {
    borderRadius: 25,
    padding: 10,
  },
});
