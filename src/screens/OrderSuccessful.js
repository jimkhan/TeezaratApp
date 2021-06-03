import React from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppTitleText from '../components/AppTitleText'

import colors from '../config/colors'

const OrderSuccessful = ({ navigation }) => {

    return (
        <View style={styles.container} >
            <CommonHeadWithButton />

            <View style={styles.subcontainer} >
                <Image source={require("../img/cartFinish.png")} style={styles.img} />
                <AppTitleText style={styles.titleText} >Order Successfully</AppTitleText>
                <AppTitleText style={styles.titleText} >Placed !</AppTitleText>
            </View>

            <View style={styles.descriArea} >
                <AppText style={styles.descriptext} >To Keep track of your order Swipe to the Left and go to “Your Orders”</AppText>
            </View>
            <AppButton name={"Go Back Home"}
                onPress={() => navigation.navigate("Home")}
                style={styles.button} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    descriArea: {
        width: wp(80),
    },
    img: {
        width: hp(12),
        height: hp(12),
        marginHorizontal: wp(5),
    },
    button: {
        alignSelf: 'center',
        marginTop: hp(15),
    },
    descriptext: {
        textAlign: 'center',
        lineHeight: RFValue(25),
        color: colors.black,
    },
    titleText: {
        fontSize: RFValue(25),
        color: colors.green,
    },

    subcontainer: {
        height: hp(50),
        alignItems: 'center',
        justifyContent: 'center',
    },


})

export default OrderSuccessful
