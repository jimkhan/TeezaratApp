import React from 'react'
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons';

import colors from '../config/colors'
import AppText from './AppText'

const AppTextInput = ({ title, styletext, icon, style, onPressRightIcon, ...otherProps }) => {
    return (
        <>
            <View style={styles.main} >

                {title && <AppText style={styles.text} >{title}</AppText>}
                <View style={[styles.conatiner, style]}>
                    <TextInput
                        style={[styles.inputtext, styletext]}
                        placeholderTextColor="#777878"
                        {...otherProps}
                    />
                    {
                        icon &&

                        <TouchableOpacity onPress={onPressRightIcon} >
                            <Icon name={icon} size={RFValue(25)} style={styles.icon} />
                        </TouchableOpacity>
                    }

                </View>

            </View>
        </>
    )
}
const styles = StyleSheet.create({

    main: {
        marginVertical: hp(.4),
    },
    conatiner: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(90),
        paddingHorizontal: wp(3),
        marginVertical: hp(.3),
        borderWidth: 1,
        borderRadius: hp('1%'),
        borderColor: colors.lightGray,
        alignSelf: 'center',
    },
    text: {
        alignSelf: 'stretch',
        fontSize: RFValue(13),
        paddingHorizontal: wp(2),
    },
    icon: {
        color: colors.lightGray,
    },
    inputtext: {

        width: wp('75%'),
        height: hp('5.6%'),
        fontSize: RFValue(15),
        fontFamily: 'Poppins-Medium',
        color: colors.darkGray,
    },
})

export default AppTextInput;
