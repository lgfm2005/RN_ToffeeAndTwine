import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Asset
import { imgToffeeTwineLogo, imgLeftBack, imgGoogle, imgFacebook } from '../../Assets/utils/Image';
import { AppString } from '../../Assets/utils/AppString';
import { FilledButton } from '../../Components/Button/Button';
import CommonStyle, { fontsize16 } from '../../Assets/Style/CommonStyle';
import { FONT } from '../../Assets/utils/FONT';
import { COLORS } from '../../Assets/utils/COLORS';
import { OrLine } from '../../Components/Line/OrLine';
import { FormInput } from '../../Components/FormInput';
import BackToolBar from '../../Components/BackToolBar';


const ForgotPassword = ({ navigation }) => {

    const keyboardVerticalOffset = Platform.OS === 'ios' ? 15 : 0
    const [getEmail, setEmail] = useState('');

    return (
        <SafeAreaView style={CommonStyle.MainContainer}>

            <View style={[CommonStyle.Container]}>
                <BackToolBar
                    ImageLink={imgLeftBack}
                    onPressImage={() => navigation.navigate('SignIn')}
                />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                alwaysBounceVertical={false}
                contentContainerStyle={CommonStyle.height}
            >


                <View style={[CommonStyle.Container]}>

                    <View style={CommonStyle.my16}>
                        <Image source={imgToffeeTwineLogo} style={CommonStyle.logoImage} />
                        <Text style={CommonStyle.giftThoughtfully}>{AppString.GiftThoughtfully}</Text>
                    </View>


                    <View style={CommonStyle.mb32}>
                        <Text style={CommonStyle.txtContent}>{AppString.OneTimePassword}</Text>
                    </View>


                    <View style={CommonStyle.formGroup}>

                        <Text style={CommonStyle.formLabel}>{AppString.EmailAddress}</Text>
                        <FormInput
                            buttonName={AppString.Enteremailaddress}
                            textChange={(Email) => setEmail(Email)}
                        />
                    </View>


                    <View>
                        <FilledButton
                            buttonName={AppString.ResetPassword}
                            onPress={() => navigation.navigate('SetPassword')}
                        />
                    </View>



                </View>
            </ScrollView>
        </SafeAreaView >
    )
}
const Styles = StyleSheet.create({

    bgbottomicon: {
        width: '100%',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        ...fontsize16,
        color: COLORS.gray,
        position: 'absolute',
        bottom: 0,
        right: 32,
        left: 32,
        alignItems: 'center',
        textAlign: 'center',
    },
    iconbg: {
        paddingLeft: 8,
        paddingRight: 8
    },
    icon: {
        width: 32,
        height: 32,
    },

});

export default ForgotPassword;
