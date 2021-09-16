import { StyleSheet } from 'react-native';
import { COLORS } from '../../../Assets/utils/COLORS';

export const FriendScreenStyle = StyleSheet.create({

    FollowerListBg: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 32,
        paddingRight: 32
    },
    followerTxtIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnBg: {
        flexDirection: 'row'
    },
    backgroundColor: {
        width: '100%',
        height: '100%',
        paddingTop: 16,
        backgroundColor: COLORS.white
    }

})