import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

import CommonStyle, { fontsize14 } from '../../Assets/Style/CommonStyle';
import { imgImport } from '../../Assets/utils/Image';
import { COLORS } from '../../Assets/utils/COLORS';
import { AllListViewStyle } from './AllListViewStyle';
import { FONT } from '../../Assets/utils/FONT';


export const UpgradeCategoriesList = ({ Id, index, ImageUrl, ExploreName, DataLength, onPress, AddNewOnPress, ColorCode, ...props }) => {

    return (
        <View >
            <TouchableOpacity onPress={onPress}>
                <View style={[AllListViewStyle.itemContainer]}>
                    <View>
                        <View style={AllListViewStyle.grayListIconbg}>
                            <Image source={ImageUrl} style={AllListViewStyle.listIcon} />
                        </View>
                    </View>
                    <View>
                        <Text style={[AllListViewStyle.listfont, { fontFamily: FONT.Gilroy }]}>{ExploreName}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


