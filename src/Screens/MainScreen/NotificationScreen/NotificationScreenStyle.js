import { StyleSheet } from 'react-native';
import { COLORS } from '../../../Assets/utils/COLORS';

export const NotificationScreenStyle = StyleSheet.create({

    FollowerListBg: {
        width: '100%',
        padding: 10,
    },
    followerTxtIcon: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    backgroundColor: {
        width: '100%',
        height: '100%',
        paddingTop: 16,
        backgroundColor: COLORS.white
    },
    txtcolor: {
        color: COLORS.PrimaryLight
    }
})