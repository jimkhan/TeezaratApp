import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppTitleText from '../components/AppTitleText'

import axios from 'axios';
import baseUrl from '../API/BaseUrl'
import Context from '../Context/shop-context';

import colors from '../config/colors'
const PaymentMathod = ({ navigation }) => {

    const [cashOnDelivery, setCashOnDelivery] = useState(false)
    const [onlinePay, setOnlinePay] = useState(false)
    const [submit, setSubmit] = useState(true)
    const [button, setButton] = useState(false)
    const [itm, setItm] = useState(0)



    const context = useContext(Context);

    console.log(context);

    var itemprice = 0;

    {
        context.cart.map((val) => {

            itemprice += val.price * val.quantity
            // console.log(itemprice)


        })
    }


    const payOnline = () => {

        /// NOte for developer : pass the "context.cart" to the "orderItems";
        axios({
            method: 'post',
            url: 'https://teezarat-backend.herokuapp.com/api/payments',
            headers: { 'Authorization': `Bearer ${context.token}` },
            data: {
                itemPric: itemprice,
                couponPrice: context.couponPrice,
                shippingPrice: 150,
                totalPrice: context.totalPrice,
                paidAmount: context.totalPrice,
                orderItems: [
                    {
                        "product": "609107b4bb50d30dd8c745e2",
                        "name": "Air Bud 2",
                        "quantity": 10,
                        "unit": "200gm",
                        "price": 1000,
                        "image": ""
                    }
                ],
                location: "120/3 AB Khulshi,Chittagong, bd"
            }
        })
            .then(function (response) {
                // console.log(response.data);

                // const userValue = JSON.stringify(response.data)
                const urlValue = response.data.url.GatewayPageURL;
                console.log(urlValue);
                onlinePay === true ? navigation.navigate("PaymentWeb", { url: urlValue }) : navigation.navigate("OrderSuccessful");

                


            })
            .catch(function (error) {
                console.log(error);
                Alert.alert(
                    "Error",
                    "Please Check your internet connection",
                    [
                        {
                            text: "Ok",
                            // onPress: () => navigation.navigate("SignInScreen"),
                            style: "cancel",
                        },
                    ]

                )
            });

    }

    return (

        <View style={styles.container} >
            <CommonHeadWithButton
                textLeft={"Checkout"}
                iconRight={"window-close"}
                iconColor={colors.danger}
            />

            <AppText style={styles.textTop} >How do you wanna pay?</AppText>
            <View style={styles.subcontainer} >

                <View style={styles.common} ><AppTitleText style={styles.numberColor} >1</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor} >2</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor} >3</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor}>4</AppTitleText></View>

            </View>
            <AppTitleText style={[styles.activeText, styles.title]} >Payment Method</AppTitleText>
            <TouchableOpacity style={[button && cashOnDelivery ? styles.active : styles.inActive]} onPress={() => { setButton(true); setSubmit(false); setCashOnDelivery(true); setOnlinePay(false) }} >

                <View>
                    <Image source={require("../img/CashOnDelivery.png")} style={styles.img} />
                </View>

                <View style={styles.textContainer} >
                    <AppTitleText style={styles.titleText} >Cash on Delivery</AppTitleText>
                    <AppText style={styles.descriptext} >Pay the cash to the delivery man after you recieve your goods.</AppText>

                </View>

            </TouchableOpacity>
            <TouchableOpacity style={[button && onlinePay ? styles.active : styles.inActive]} onPress={() => { setButton(true); setSubmit(false); setCashOnDelivery(false); setOnlinePay(true) }} >

                <View>
                    <Image source={require("../img/OnlinePayment.png")} style={styles.img} />
                </View>

                <View style={styles.textContainer} >
                    <AppTitleText style={styles.titleText}  >Pay Online</AppTitleText>
                    <AppText style={styles.descriptext} >Use the payment option of your choice and pay right now.</AppText>
                </View>

            </TouchableOpacity>
            <AppButton
                name={"Finish Payment"}
                disabled={onlinePay != cashOnDelivery ? false : true}
                onPress={payOnline}
                style={styles.button} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    img: {
        width: hp(10),
        height: hp(10),
        marginHorizontal: wp(5),
    },
    button: {
        alignSelf: 'center',
        marginTop: hp(8),
    },
    descriptext: {
        alignSelf: "stretch",
    },
    titleText: {
        alignSelf: 'stretch',
        color: colors.black,
    },
    textContainer: {
        width: wp(55),
        minHeight: hp(12),
        justifyContent: 'space-around'
    },
    paymentOption: {
        width: wp(90),
        minHeight: hp(16),
        marginTop: hp(2),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.lightGrayMOre,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 0,
    },
    title: {
        marginBottom: hp(2),
    },
    textTop: {
        color: colors.danger,
        alignSelf: 'stretch',
        paddingLeft: wp(3),
        fontSize: RFValue(16),
    },
    subcontainer: {
        width: wp(80),
        height: hp(10),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    activeBack: {
        backgroundColor: colors.secondaryBorder,
    },
    activeText: {
        color: colors.primary,
    },
    common: {
        alignItems: 'center',
        justifyContent: 'center',
        width: hp(5),
        height: hp(5),
        borderRadius: hp(3),
        backgroundColor: colors.secondaryBorder,
    },
    barColor: {
        width: wp(7),
        height: hp(.5),
        backgroundColor: colors.secondaryBorder,
    },
    numberColor: {
        color: colors.primary,
    },

    inActive: {
        width: wp(87),
        height: hp(14),
        marginTop: hp(2),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: colors.lightGrayMOre,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 0,



    },
    active: {
        width: wp(87),
        height: hp(14),
        marginTop: hp(2),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',

        backgroundColor: colors.yellowLight,
        borderColor: colors.green,
        borderRadius: hp(.5),
        borderWidth: hp(.6),
    },
})

export default PaymentMathod
