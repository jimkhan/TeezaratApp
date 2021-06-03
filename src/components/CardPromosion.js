import React from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors'

import AppText from './AppText'

const CardPromosion = ({  minimumAmount, couponCode, percent, limit, expireTime }) => {
    return (
        <TouchableOpacity style={styles.container} >

            <AppText style={styles.title} >{`[ ${couponCode} ]`}</AppText>
            <AppText style={styles.percent} >{percent} % <AppText style={styles.percentText} >Discount upto<AppText style={styles.percent} > BDT {limit}</AppText></AppText> </AppText>
            <AppText style={styles.minimum} >Minimum Order <AppText style={styles.percent} >BDT {minimumAmount}</AppText></AppText>
            <AppText style={styles.time} >{expireTime}</AppText>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp(90),
        minHeight: hp(18),
        paddingVertical: hp(2),
        paddingHorizontal: wp(5),
        backgroundColor: colors.cardback,
        justifyContent: 'space-around',
        borderRadius: hp(1),
        borderWidth: 1,
        borderColor: colors.secondaryBorder,
        marginVertical: hp(1),

    },
    minimum:{
        fontSize: RFValue(14),
        alignSelf: "stretch",
    },
    common: {
        alignSelf: 'stretch',
        color: colors.black,
    },
    percentText:{
        fontSize: RFValue(14),
        alignSelf: "stretch",
    },
    percent:{
        color: colors.primary,
        fontSize: RFValue(16),
        alignSelf: 'stretch',
    },
    title: {
        fontSize: RFValue(20),
        color: colors.black,
        alignSelf: 'stretch',
    },
    time: {
        alignSelf: "stretch",
        fontSize: RFValue(10)
    },


})
export default CardPromosion
