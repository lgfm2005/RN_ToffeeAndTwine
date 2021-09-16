import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Platform, ScrollView } from 'react-native';

// Lib
import LinearGradient from 'react-native-linear-gradient';

// Asset
import { imgbirthdayCakeGary } from '../../../Assets/utils/Image';
import CommonStyle from '../../../Assets/Style/CommonStyle';
import { ToolbarMain } from '../../../Components/ToolbarMain/ToolbarMain';
import { COLORS } from '../../../Assets/utils/COLORS';
import { FilledButton } from '../../../Components/Button/Button';
import { Mediumbtn } from '../../../Components/Button/ButtonStyle';
import { AppString } from '../../../Assets/utils/AppString';
import { ProfileScreenStyle } from './ProfileScreenStyle';
import { imgWhiteShare, imgBackleftWhite, iimgprofiledemo3, imgLeftBack, profile2, profileimgdemo, imgProfileBackground, imgCoffee, imgDesserts, imgFlowers, imgLaptop, imgRing, imgBook, imgCandy, imgClothes, imgJewelry, imgShoes, demodp, imgImport } from '../../../Assets/utils/Image';
import { MainScreenStyle } from '../MainScreenStyle';
import { CalendarList } from '../../../Components/AllListVIew/CalendarList';
import { MyBlackStatusbar } from '../../../Components/MyStatusBar/MyBlackStatusbar';
import { MyWhiteStatusbar } from '../../../Components/MyStatusBar/MyWhiteStatusbar';
import { ProfileToolBar } from '../../../Components/ProfileToolBar/ProfileToolBar';



const Data = [
    {
        id: 1,
        Name: AppString.Coffee,
        Image: imgCoffee
    },
    {
        id: 2,
        Name: AppString.Dessert,
        Image: imgDesserts
    },
    {
        id: 3,
        Name: AppString.Flowers,
        Image: imgFlowers
    },
    {
        id: 4,
        Name: AppString.Laptop,
        Image: imgLaptop
    },
    {
        id: 5,
        Name: AppString.Ring,
        Image: imgRing
    },
    {
        id: 6,
        Name: AppString.Book,
        Image: imgBook
    },
    {
        id: 7,
        Name: AppString.Dessert,
        Image: imgDesserts
    },
];


const MyProfile = ({ navigation }) => {

    return (
        <View>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={CommonStyle.authPage} >

                    <View style={CommonStyle.imgmask}>
                        <ImageBackground source={iimgprofiledemo3} style={CommonStyle.imgProfileBackground} >
                            <LinearGradient colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.0)']} >
                                <View style={CommonStyle.ProfileToolbarbg}>
                                    <TouchableOpacity>
                                        <Image source={imgBackleftWhite} style={CommonStyle.imgIconSize} />
                                    </TouchableOpacity>
                                    <Text style={[CommonStyle.txtTitle, { color: COLORS.Secondary }]}>MyProfile</Text>
                                    <TouchableOpacity onPress={() => { }}>
                                        <Image source={imgWhiteShare} style={CommonStyle.imgIconSize} />
                                    </TouchableOpacity>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                        <Image source={imgProfileBackground} style={CommonStyle.imgmaskbg} />
                    </View>

                    <View style={[CommonStyle.Container]}>

                        <View style={[CommonStyle.my16, CommonStyle.Row]}>

                            <View style={ProfileScreenStyle.NameAndEditbg}>
                                <View>
                                    <Text style={ProfileScreenStyle.userName}>Heather Swan</Text>
                                    <View style={CommonStyle.alignItemsBaseLine}>
                                        <Image source={imgbirthdayCakeGary} style={CommonStyle.imgIconSize} />
                                        <Text style={[CommonStyle.txtContent, { color: COLORS.PrimaryLight }]}> Birthday: April, 14th</Text>
                                    </View>
                                </View>
                                <FilledButton
                                    buttonName={AppString.Edit}
                                    styleBtn={Mediumbtn}
                                    onPress={() => navigation.navigate('EditProfile')} />
                            </View>

                        </View>

                        <View style={[ProfileScreenStyle.MomentStatus]}>
                            <View>
                                <Text style={CommonStyle.txtTitle}>1</Text>
                                <Text style={CommonStyle.txtContent}>Moments</Text>
                            </View>
                            <View>
                                <Text style={CommonStyle.txtTitle}>10k</Text>
                                <Text style={CommonStyle.txtContent}>Followers</Text>
                            </View>
                            <View>
                                <Text style={CommonStyle.txtTitle}>920</Text>
                                <Text style={CommonStyle.txtContent}>Following</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={CommonStyle.txtTitle}>{AppString.FavoriteThings}</Text>
                            <ScrollView contentContainerStyle={[MainScreenStyle.scrollItemStyle, CommonStyle.toppadding16]}>
                                {Data.map((item, index) => (
                                    <CalendarList
                                        ImageUrl={item.Image}
                                        ExploreName={item.Name}
                                        Id={item.id}
                                        index={index}
                                        key={index}
                                        DataLength={Data.length}
                                        onPress={() => { }}
                                    />
                                ))}
                            </ScrollView>
                        </View>

                        <View>
                            <Text style={CommonStyle.txtTitle}>{AppString.SpecialMoments}</Text>
                            <ScrollView contentContainerStyle={[MainScreenStyle.scrollItemStyle, CommonStyle.toppadding16]}>
                                {Data.map((item, index) => (
                                    <CalendarList
                                        ImageUrl={item.Image}
                                        ExploreName={item.Name}
                                        Id={item.id}
                                        index={index}
                                        key={index}
                                        DataLength={Data.length}
                                        onPress={() => { }}
                                    />
                                ))}
                            </ScrollView>
                        </View>


                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const Styles = StyleSheet.create({


});

export default MyProfile;
