import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import CommonStyle from '../../../Assets/Style/CommonStyle';
import { AppString } from '../../../Assets/utils/AppString';
import { imgInvite } from '../../../Assets/utils/Image';
import { FilledButton, POPLinkButton } from '../../../Components/Button/Button';


// Asset


const Invite = ({ navigation }) => {

    return (
        <View style={[CommonStyle.Base, CommonStyle.BgColorWhite]}>
            <Image source={imgInvite} style={[CommonStyle.imgGiftTutorial]} />
            <Text style={[CommonStyle.txtContent, CommonStyle.p16]}>{AppString.ShareProfileFriends}</Text>

            <View style={CommonStyle.centerRow}>
                <POPLinkButton
                    buttonName={AppString.Invite}
                    onPress={() => { }}
                />
            </View>


        </View>
    )
}


export default Invite;
