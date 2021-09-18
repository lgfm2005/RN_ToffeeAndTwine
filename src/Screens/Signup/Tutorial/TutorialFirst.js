import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Lib
import RadioGroup from 'react-native-custom-radio-group';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';

// Asset
import {AppString} from '../../../Assets/utils/AppString';
import {
  imgGiftTutorialfirst,
  imgBirthdayCake,
  imgArrowRight,
} from '../../../Assets/utils/Image';
import CommonStyle from '../../../Assets/Style/CommonStyle';
import FontSize from '../../../Assets/utils/FontSize';
import TutorialStyle from './TutorialStyle';
import {FullFormInput} from '../../../Components/FormInput';
import {
  POPLinkButton,
  POPOutLinkButton,
} from '../../../Components/Button/Button';
// import NotBorderBlackButton from '../../../Components/NotBorderBlackButton';
import RadioButtonContainer from '../../../Components/RadioButtonContainer';
import {COLORS} from '../../../Assets/utils/COLORS';
import {FONT} from '../../../Assets/utils/FONT';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 5 : 0;

const data = [
  {
    text: AppString.Birthday,
  },
  {
    text: AppString.Anniversary,
  },
  {
    text: AppString.Graduation,
  },
  {
    text: AppString.Christmas,
  },
];

const TutorialFirst = ({navigation, props}) => {
  const [getFirstName, setFirstName] = useState('');
  const [getLastName, setLastName] = useState('');
  const [getRadioName, setRadioName] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());

  const onRadioButtonPress = itemIdx => {
    console.log('Clicked', itemIdx);
    setRadioName(data[itemIdx].text);
    setModalVisible(true);
  };

  const CloseDatePicker = () => {
    setModalVisible(false);
  };
  const SaveDatePicker = () => {
    setModalVisible(false);
    console.log('getFirstName ===>>', getFirstName);
    console.log('getLastName ===>>', getLastName);
    console.log('getLastName ===>>', getRadioName);
    console.log('getRadioName ===>>', date);
    // if (getFirstName != "" && getLastName != "" && getRadioName != "" && date != "") {
    //     props.slide1Check();
    // }
  };

  return (
    <SafeAreaView style={CommonStyle.BgColorWhite}>
      <View style={[CommonStyle.authPage]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <KeyboardAvoidingView
            behavior="position"
            // keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <View style={[CommonStyle.Base, {flex: 1}]}>
              <Image
                source={imgGiftTutorialfirst}
                style={[CommonStyle.imgGiftTutorial, CommonStyle.my16]}
              />
              <View style={CommonStyle.Base}>
                <View style={[CommonStyle.Container, CommonStyle.mb32]}>
                  <Text
                    style={[CommonStyle.txtTitle, {fontFamily: FONT.Gilroy}]}>
                    {AppString.WelcometoToffeeTwine}
                  </Text>

                  <Text
                    style={[CommonStyle.txtContent, {fontFamily: FONT.Gilroy}]}>
                    {AppString.gifthints}
                  </Text>

                  <View style={[CommonStyle.mb16, TutorialStyle.inputWrapper]}>
                    <View style={TutorialStyle.inputHalf}>
                      <Text
                        style={[
                          CommonStyle.formLabel,
                          {fontFamily: FONT.Gilroy},
                        ]}>
                        {AppString.FirstName}
                      </Text>
                      <FullFormInput
                        buttonName={AppString.EnterFirstName}
                        textChange={FirstName => setFirstName(FirstName)}
                      />
                    </View>
                    <View style={TutorialStyle.inputHalf}>
                      <Text
                        style={[
                          CommonStyle.formLabel,
                          {fontFamily: FONT.Gilroy},
                        ]}>
                        {AppString.LastName}
                      </Text>
                      <FullFormInput
                        buttonName={AppString.EnterLastName}
                        textChange={LastName => setLastName(LastName)}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={CommonStyle.formLabel}>
                      {AppString.Chooseonespecialday}
                    </Text>
                    <View>
                      <RadioButtonContainer
                        values={data}
                        onPress={onRadioButtonPress}
                      />
                    </View>
                  </View>

                  {isModalVisible == true ? (
                    <Modal
                      testID={'modal'}
                      isVisible={isModalVisible}
                      onBackdropPress={() => CloseDatePicker()}>
                      <View style={[CommonStyle.p16, TutorialStyle.popbg]}>
                        <View style={TutorialStyle.popView}>
                          <Image
                            source={imgBirthdayCake}
                            style={TutorialStyle.popimg}
                          />
                        </View>

                        <View>
                          <Text
                            style={[
                              CommonStyle.txtContent,
                              {fontFamily: FONT.Gilroy},
                            ]}>
                            {AppString.Pleasebirthdaycontinue}
                          </Text>
                        </View>

                        <DatePicker
                          mode={'date'}
                          date={date}
                          onDateChange={setDate}
                        />

                        <View style={[CommonStyle.centerRow, CommonStyle.mt16]}>
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
                    </Modal>
                  ) : null}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>

        <View style={[TutorialStyle.silderbg, CommonStyle.Container]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={[
                TutorialStyle.silderCircle,
                {backgroundColor: COLORS.black},
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                {backgroundColor: COLORS.gray},
              ]}
            />
            <View
              style={[
                TutorialStyle.silderCircle,
                {backgroundColor: COLORS.gray},
              ]}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('TutorialSecond')}>
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

export default TutorialFirst;
