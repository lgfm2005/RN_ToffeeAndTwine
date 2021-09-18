import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

// Asset
import CommonStyle, {
  fontsize10,
  fontsize12,
} from '../../../Assets/Style/CommonStyle';
import {demodp} from '../../../Assets/utils/Image';
import {AppString, Remove} from '../../../Assets/utils/AppString';
import {FilledButton} from '../../../Components/Button/Button';
import {FriendScreenStyle} from './FriendScreenStyle';
import {Smallbtn} from '../../../Components/Button/ButtonStyle';
import {COLORS} from '../../../Assets/utils/COLORS';
import {MyWhiteStatusbar} from '../../../Components/MyStatusBar/MyWhiteStatusbar';

const Data = [
  {
    id: 1,
    Name: 'Gregory Thomson',
    Image: demodp,
  },
  {
    id: 2,
    Name: 'Gregory Thomson',
    Image: demodp,
  },
  {
    id: 3,
    Name: 'Gregory Thomson',
    Image: demodp,
  },
  {
    id: 4,
    Name: 'Gregory Thomson',
    Image: demodp,
  },
];

const Followers = ({navigation}) => {
  const RemoveFriend = (Id, Name) => {
    console.log('RemoveFriend', Id, Name);
    // navigation.navigate('FriendFollowersList');
  };
  const selectFriend = (Id, Name) => {
    console.log('RemoveFriend', Id, Name);
    navigation.navigate('FriendFollowersList');
  };

  const RenderItem = (item, index) => {
    return (
      <TouchableOpacity onPress={() => selectFriend()}>
        <View style={[FriendScreenStyle.FollowerListBg, CommonStyle.mb16]}>
          <View style={FriendScreenStyle.followerTxtIcon}>
            <Image source={item.Image} style={CommonStyle.showProfileImage} />
            <Text style={CommonStyle.txtFrienduserName}>{item.Name}</Text>
          </View>
          <View style={FriendScreenStyle.btnBg}>
            <FilledButton
              buttonName={AppString.Remove}
              onPress={() => RemoveFriend(item.id, item.Name)}
              styleBtn={Smallbtn}
              fontStyle={fontsize12}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <MyWhiteStatusbar />
      <View Style={[CommonStyle.Container, CommonStyle.pt16]}>
        <View style={FriendScreenStyle.backgroundColor}>
          <FlatList
            data={Data}
            renderItem={({item, index}) => RenderItem(item, index)}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </View>
  );
};

export default Followers;
