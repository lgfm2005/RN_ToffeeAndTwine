import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Asset
import CommonStyle, { fontsize10, fontsize12 } from '../../../Assets/Style/CommonStyle';
import { demodp } from '../../../Assets/utils/Image';
import { AppString, Remove } from '../../../Assets/utils/AppString';
import { FilledButton } from '../../../Components/Button/Button';
import { NotificationScreenStyle } from './NotificationScreenStyle';
import { Smallbtn } from '../../../Components/Button/ButtonStyle';
import { COLORS } from '../../../Assets/utils/COLORS';

const Data = [
    {
        id: 1,
        UserName: "Jessica Rockwell",
        Plan: "plans to get",
        Title: "Heather",
        SubTitle: "a cup of Coffee.",
        Time: "15 mins.",
        Image: demodp
    },
    {
        id: 2,
        UserName: "Jessica Rockwell",
        Plan: "plans to get",
        Title: "Heather",
        SubTitle: "a cup of Coffee.",
        Time: "15 mins.",
        Image: demodp
    },
    {
        id: 3,
        UserName: "Jessica Rockwell",
        Plan: "plans to get",
        Title: "Heather",
        SubTitle: "a cup of Coffee.",
        Time: "15 mins.",
        Image: demodp
    },
]

const Gifting = ({ navigation }) => {


    const RenderItem = (item, index) => {
        return (
            <View style={[NotificationScreenStyle.FollowerListBg, CommonStyle.mb16]} >
                <View style={NotificationScreenStyle.followerTxtIcon}>
                    <Image source={item.Image} style={CommonStyle.bottomBarImg} />
                    <View>
                        <Text style={[CommonStyle.txtFrienduserName, { color: COLORS.PrimaryLight }]}>
                            <Text style={{ color: COLORS.black }}>{item.UserName} </Text>
                            {item.Plan}
                        </Text>
                        <Text style={[CommonStyle.txtFrienduserName, { color: COLORS.PrimaryLight }]}>
                            <Text style={{ color: COLORS.black }}>{item.Title} </Text>
                            {item.SubTitle}
                        </Text>
                    </View>
                    <Text style={[CommonStyle.txtFrienduserName, NotificationScreenStyle.txtcolor]}>{item.Time}</Text>
                </View>
            </View>
        )
    }

    return (
        <View Style={[CommonStyle.Container]}>
            <View style={NotificationScreenStyle.backgroundColor}>
                <FlatList
                    data={Data}
                    renderItem={({ item, index }) => RenderItem(item, index)}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}


export default Gifting;
