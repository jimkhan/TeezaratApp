import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

import AppTitleText from './AppTitleText'

const Button = ({ name, style, textStyle, onPress, disabled }) => {
    return (
        <TouchableOpacity disabled={disabled} style={[styles.button, style]} onPress={onPress}>
            <AppTitleText style={[styles.buttontxt, textStyle]}>{name}</AppTitleText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('42%'),
        height: hp(5.3),
        borderColor: colors.primary,
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderRadius: hp('2%'),
        marginTop: 10,
    },
    buttontxt: {
        color: colors.white,
        fontSize: RFValue(14),
    },
});

export default Button;
