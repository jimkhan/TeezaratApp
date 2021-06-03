import React from 'react'
import { View, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

import AppButton from './AppButton'

const CardButton = ({ onPressAddToCart, add, minus, styleCartButton, styleButtArea, itemQuantity, increaseQuantity, decreaseQuantity }) => {

    return (
        <View style={styles.main} >
            <View style={[styles.buttonArea, styleButtArea]} >
                {minus && <AppButton name={"-"} style={styles.buttonDecrease} textStyle={styles.text} onPress={decreaseQuantity} />}
                <AppButton name={`${itemQuantity >= 0 ? 'Added' : 'Add To Shopping Cart'}` + `${itemQuantity >= 0 ? ' ( ' + itemQuantity + ' ) Units' : ''}`} style={[styles.buttonAddItem, styleCartButton]} onPress={onPressAddToCart} />
                {add && <AppButton name={"+"} style={styles.buttonDecrease} textStyle={styles.text} onPress={increaseQuantity} />}
            </View>
        </View>

    )
}
const styles = StyleSheet.create({

    main: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonArea: {
        width: wp(90),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: hp(3),

    },
    buttonDecrease: {
        width: hp(4),
        height: hp(4),
        borderRadius: hp(.6),
        backgroundColor: colors.yellow,
        borderColor: 'transparent'
    },
    buttonAddItem: {
        width: wp(65),
        height: hp(4),
        marginHorizontal: wp(2),
        borderRadius: hp(.6),
    },
    text: {
        color: colors.black,
        fontSize: RFValue(18),
        fontWeight: '700',
        textAlign: 'center'
    }
})

export default CardButton
