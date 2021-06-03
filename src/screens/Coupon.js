import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import colors from '../config/colors';

import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppTextInput from '../components/AppTextInput'
import AppTitleText from '../components/AppTitleText'
import AppButton from '../components/AppButton'


import axios from 'axios';
import baseUrl from '../API/BaseUrl'
import Context from '../Context/shop-context';

const Coupon = ({ navigation, route }) => {

    const context = useContext(Context);

    const { total } = route.params;
    var taka = total;
    const [value, setValue] = useState('')

    const applyCoupon = (rgandtotal, couponCode) => {
        axios
            .post(baseUrl + "apply/coupon",
                {
                    "grandTotal": rgandtotal,
                    "couponCode": couponCode,
                },
                {
                    headers: {
                        Authorization: `Bearer ${context.token}`,
                    }
                })
            .then(function (response) {
                // handle success
                const data = JSON.stringify(response.data)
                context.setTotal(response.data.finalPrice);
                context.setCouponPrice(response.data.priceReduce);
                setValue('');
                console.log(response.data)
            })
            .catch(function (error) {
                // handle error
                alert(error);
                console.log(error)
            })
            .finally(function () {
                // always executed
                // alert('Finally called');
            });
    };



    return (

        <View style={styles.main} >
            <CommonHeadWithButton
                iconLeft={"chevron-left"}
                textLeft={"Apply Coupon"}
            />

            <AppTitleText style={styles.currentBil} >Current Bill: <AppTitleText style={styles.newBill} >{taka} ৳</AppTitleText></AppTitleText>
            <AppTitleText style={styles.currentBil} >New Bill:  <AppTitleText style={styles.newBill} >{context.totalPrice} ৳</AppTitleText></AppTitleText>

            <View style={styles.bottom} >
                <TouchableOpacity onPress={() => applyCoupon(taka, value)} style={styles.bottomTextArea} >
                    <AppTitleText style={styles.applyText} >APPLY</AppTitleText>

                </TouchableOpacity>
                <AppTextInput
                    styletext={styles.inputArea}
                    style={{ height: hp(5.3), }}
                    value={value}
                    onChangeText={(val) => setValue(val)}

                />
                <AppButton
                    name={"Done"}
                    onPress={() => navigation.goBack()}
                    style={styles.button}

                />
            </View>

        </View>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,

    },
    newBill: {
        color: colors.green,
    },
    currentBil: {
        alignSelf: 'stretch',
        paddingLeft: wp(5),
        color: colors.gray,
    },
    separetor: {
        borderTopWidth: 1,
        width: wp(90),
        borderColor: colors.lightGray,
        marginTop: hp(1),
    },

    bottom: {
        width: wp(100),
        height: hp(16),
        justifyContent: 'center',
        position: "absolute",
        bottom: 0,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    button: {
        width: wp(90),
        borderRadius: hp(.5),
        bottom: hp(1),
    },
    inputArea: {
        width: wp(60),
    },
    textOrder: {
        alignSelf: 'stretch',
        paddingLeft: wp(6),
    },
    bottomTextArea: {
        zIndex: 100,
        position: "absolute",
        justifyContent: 'center',
        backgroundColor: colors.backLightingPayment,
        width: wp(22),
        height: hp(4),
        borderWidth: 1,
        borderColor: colors.gray,
        top: hp(2.8),
        right: wp(8),
        borderRadius: wp(2),
    },
    applyText: {
        fontSize: RFValue(12),
        color: colors.black,
    }

})
export default Coupon;
