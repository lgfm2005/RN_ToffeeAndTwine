import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

// Asset
import {
  imgToffeeTwineLogo,
  imgGift,
  imgGoogle,
  imgFacebook,
} from '../Assets/utils/Image';
import {AppString} from '../Assets/utils/AppString';
import {FilledButton, OutLinedButton} from '../Components/Button/Button';
import CommonStyle, {fontsize16} from '../Assets/Style/CommonStyle';
import {FONT} from '../Assets/utils/FONT';
import {COLORS} from '../Assets/utils/COLORS';
import {OrLine} from '../Components/Line/OrLine';
import {MyWhiteStatusbar} from '../Components/MyStatusBar/MyWhiteStatusbar';

const MainScreen = ({navigation}) => {
  return (
    <SafeAreaView
      //   style={CommonStyle.MainContainer}
      style={{
        height: '100%',
        backgroundColor: COLORS.white,
      }}>
      {/* <MyWhiteStatusbar /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: COLORS.white,
        }}>
        <View
          style={{
            height: '100%',
            // marginTop: 68,
            marginBottom: 68,
            //   backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={[
              // CommonStyle.my32,
              // CommonStyle.Container,
              CommonStyle.Container,
              {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}>
            <Image source={imgToffeeTwineLogo} style={CommonStyle.logoImage} />
            <Text
              style={[CommonStyle.giftThoughtfully, {fontFamily: FONT.Gilroy}]}>
              {AppString.GiftThoughtfully}
            </Text>
          </View>

          <Image
            source={imgGift}
            style={[
              CommonStyle.imgGiftTutorial,
              // CommonS tyle.my32,
              {
                width: '100%',
                height: 230,
                resizeMode: 'cover',
                marginTop: 48,
                marginBottom: 48,
              },
            ]}
          />

          <View
            style={[
              CommonStyle.Container,
              // CommonStyle.my32,
              // {marginTop: 12, marginBottom: 12},
            ]}>
            <FilledButton
              buttonName={AppString.Signup}
              onPress={() => {
                navigation.navigate('Signup');
              }}
            />

            <OutLinedButton
              buttonName={AppString.Signin}
              onPress={() => {
                navigation.navigate('SignIn');
              }}
            />

            <View style={[CommonStyle.mb32, {}]}>
              <OrLine LineName={'OR'} />
            </View>

            <View style={[CommonStyle.googleFb]}>
              <TouchableOpacity onPress={() => {}} style={Styles.iconbg}>
                <Image source={imgGoogle} style={Styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} style={Styles.iconbg}>
                <Image source={imgFacebook} style={Styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },

  iconbg: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default MainScreen;
