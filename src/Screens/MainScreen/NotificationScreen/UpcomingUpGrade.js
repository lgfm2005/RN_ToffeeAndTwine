import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CommonStyle from '../../../Assets/Style/CommonStyle';
import { AppString } from '../../../Assets/utils/AppString';
import { COLORS } from '../../../Assets/utils/COLORS';
import { imgInvite } from '../../../Assets/utils/Image';
import { FilledButton, POPLinkButton } from '../../../Components/Button/Button';


// Asset


const UpcomingUpGrade = ({ navigation }) => {

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={[CommonStyle.MainContainer, CommonStyle.BgColorWhite]}>
                <Image source={imgInvite} style={[CommonStyle.imgGiftTutorial]} />
                <View style={CommonStyle.p16}>
                    <View style={CommonStyle.Row}>
                        <Text>{AppString.Upgradenow}<Text style={{ color: COLORS.gold }}> {AppString.price} </Text>{AppString.Upgradefriendspecialmoments}</Text>
                    </View>
                    <View>
                        <Text style={[CommonStyle.txtContent]}>{AppString.upgradedEnjoy}</Text>
                        <Text style={[CommonStyle.txtContent]}>{AppString.Notificationsfriends}</Text>
                        <Text style={[CommonStyle.txtContent]}>{AppString.giftlisthints}</Text>
                        <Text style={[CommonStyle.txtContent]}>{AppString.sharewithfriends}</Text>
                    </View>
                    <View style={CommonStyle.centerRow}>
                        <POPLinkButton
                            buttonName={AppString.Upgrade}
                            onPress={() => { }}
                        />
                    </View>
                </View>


            </View>
        </ScrollView >
    )
}


export default UpcomingUpGrade;
