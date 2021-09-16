import { StyleSheet } from 'react-native';
import { p32, p16, p20 } from '../../Assets/Style/CommonStyle';
import { COLORS } from '../../Assets/utils/COLORS';

export const ToolbarMainStyle = StyleSheet.create({

    background: {
        width: '100%',
        // height: 70,
        // backgroundColor: COLORS.TopBarBG,
        flexDirection: 'row',
        alignItems: 'center',
        // position: "absolute",
        // top: 0,
        // paddingTop: 70,
        justifyContent: 'space-between',
        // ...p20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24
    },
    icon: {
        width: 24,
        height: 24
    },
    TopBarToffeeTwineLogo: {
        width: 200,
        height: 25,
        resizeMode: 'contain'
    }
})