import { StyleSheet } from 'react-native';
import { fontsize16 } from '../../Assets/Style/CommonStyle';
import { COLORS } from '../../Assets/utils/COLORS';
import { FONT } from '../../Assets/utils/FONT';

export const OrLineStyle = StyleSheet.create({
    Linebg: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Separator: {
        width: '40%',
        height: 1,
        backgroundColor: COLORS.PrimaryLight,
        opacity: 0.4
    },
    Separatortxt: {
        color: COLORS.PrimaryLight,
        fontFamily: FONT.Gilroy,
        ...fontsize16,
        paddingLeft: 16,
        paddingRight: 16
    }

})