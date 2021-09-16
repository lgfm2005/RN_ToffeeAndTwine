import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Lib 
import { Searchbar } from 'react-native-paper';
// Asset
import CommonStyle, { fontsize10, fontsize12 } from '../../../Assets/Style/CommonStyle';
import { demodp } from '../../../Assets/utils/Image';
import { AppString, Remove } from '../../../Assets/utils/AppString';
import { FilledButton } from '../../../Components/Button/Button';
import { SearchBarStyle } from './SearchBarStyle';
import { Smallbtn } from '../../../Components/Button/ButtonStyle';
import { MyWhiteStatusbar } from '../../../Components/MyStatusBar/MyWhiteStatusbar';

const Data = [
    {
        id: 1,
        Name: "Gregory Thomson",
        Image: demodp
    },
    {
        id: 2,
        Name: "Gregory Thomson",
        Image: demodp
    },
    {
        id: 3,
        Name: "Gregory Thomson",
        Image: demodp
    },
    {
        id: 4,
        Name: "Gregory Thomson",
        Image: demodp
    },
]

const Search = ({ navigation }) => {


    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const RemoveFriend = (Id, Name) => {
        console.log("RemoveFriend", Id, Name)
    }

    const OpenUserProfile = (userName) => {
        console.log("OpenUserProfile", userName)
        navigation.navigate('UserProfile', { userName: userName })
    }

    const RenderItem = (item, index) => {
        return (
            <TouchableOpacity onPress={() => OpenUserProfile(item.Name)}>
                <View style={[SearchBarStyle.FollowerListBg, CommonStyle.mb16]} >
                    <View style={SearchBarStyle.followerTxtIcon}>
                        <Image source={item.Image} style={CommonStyle.bottomBarImg} />
                        <Text style={CommonStyle.txtFrienduserName}>{item.Name}</Text>
                    </View>
                    <View style={SearchBarStyle.btnBg}>
                        <FilledButton
                            buttonName={AppString.Remove}
                            onPress={() => RemoveFriend(item.id, item.Name)}
                            styleBtn={Smallbtn}
                            fontStyle={fontsize12}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={CommonStyle.BgColorWhite}>
            <MyWhiteStatusbar />
            <View Style={[CommonStyle.Container, CommonStyle.pt16]}>

                <View>
                    <Searchbar
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    // Style={{}}
                    />
                </View>

                <View style={SearchBarStyle.backgroundColor}>


                    <FlatList
                        data={Data}
                        renderItem={({ item, index }) => RenderItem(item, index)}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}


export default Search;
