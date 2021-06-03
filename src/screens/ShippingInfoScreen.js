import React from 'react'
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native'

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppTextInput from '../components/AppTextInput'
import AppTitleText from '../components/AppTitleText'

import { Formik } from 'formik';
import * as yup from 'yup';
const validationSchema = yup.object().shape({
    address: yup.string().required().min(5).label("Adderss"),
    mobileNumber: yup.string().required().min(11).label("Mobile number"),
});

import axios from 'axios';
import baseUrl from '../API/BaseUrl'

import colors from '../config/colors'
const ShippingInfoScreen = ({ navigation }) => {

    return (
        <View style={styles.container} >
            <CommonHeadWithButton
                textLeft={"Where do you want the delivery?"}
                iconRight={"window-close"}
                iconColor={colors.danger}
                onPressRight={() => navigation.navigate("ShopingCartScreen")}
            />
            <AppText style={styles.textTop} >Please sign in to continue</AppText>
            <View style={styles.subcontainer} >
                <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >1</AppTitleText></View>
                <View style={[styles.barColor, styles.activeBack]} ></View>
                <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >2</AppTitleText></View>
                <View style={[styles.barColor, styles.activeBack]} ></View>
                <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >3</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor}>4</AppTitleText></View>
            </View>

            <AppTitleText style={styles.activeText} >Shipping Info</AppTitleText>

            <Formik initialValues={{ address: '', mobileNumber: '' }}
                onSubmit={(values) => {

                    navigation.navigate("PaymentMathod")

                }}
                validationSchema={validationSchema}
                validator={() => ({})}
            >
                {({ handleChange, handleSubmit, errors }) => (
                    <>
                        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, alignItems: 'center', width: wp(100), paddingHorizontal: wp(5), marginTop: hp(3), }}>


                            <AppTextInput
                                title={"Mobile Number"}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange("mobileNumber")}
                                keyboardType={"phone-pad"}
                                textContentType={"emailAddress"}
                                style={styles.inputContainerMobile}

                            />
                            {errors.mobileNumber && <AppText style={styles.errorText} >{errors.mobileNumber}</AppText>}
                            <AppTextInput
                                title={"Adderss"}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange("address")}
                                keyboardType={"email-address"}
                                textContentType={"emailAddress"}
                                placeholder={"House No, Street, Road, Area, City, "}
                                style={styles.inputContainer}
                                styletext={styles.textInput}
                                multiline={true}

                            />
                            {errors.address && <AppText style={styles.errorText} >{errors.address}</AppText>}

                            {/* <View style={styles.checkBoxArea} >

                                <BouncyCheckbox
                                    size={25}
                                    text={<AppText style={styles.text} >Fill in your default address</AppText>}
                                    fillColor={colors.primary}
                                    textStyle={{ textDecorationLine: "none" }}
                                    unfillColor="#FFFFFF"
                                    iconStyle={{ borderColor: colors.primaryLight, }}
                                    onPress={() => { }}
                                />

                            </View> */}

                            <AppText style={styles.textDeliver} ></AppText>
                            <AppTextInput
                                title={"Note to deliverer"}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={handleChange("email")}
                                keyboardType={"email-address"}
                                textContentType={"emailAddress"}

                                style={styles.inputContainer}
                                styletext={styles.textInput}
                                multiline={true}

                            />

                            <AppButton name={"Continue"} style={styles.bottomButton} onPress={handleSubmit} />
                        </ScrollView>
                    </>
                )}
            </Formik>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    errorText: {
        fontWeight: 'bold',
        color: colors.danger,
        alignSelf: 'flex-start',
        paddingLeft: wp(3),
    },
    inputContainerMobile: {
        marginVertical: hp(1),
    },
    checkBoxArea: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    textDeliver: {
        // marginTop: hp(.1),
    },
    bottomButton: {
        marginTop: hp(5),
        marginBottom: hp(10),
    },
    boutton: {
        alignSelf: "center",
    },
    delever: {
        marginTop: hp(1),
    },
    textTop: {
        color: colors.danger,
        alignSelf: 'stretch',
        paddingLeft: wp(3),
        fontSize: RFValue(16),
    },
    text: {
        alignSelf: 'stretch',
        paddingLeft: wp(2),
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
        backgroundColor: colors.lightGrayMOre,
    },
    barColor: {
        width: wp(7),
        height: hp(.5),
        backgroundColor: colors.lightGrayMOre,
    },
    numberColor: {
        color: colors.secondaryBorder,
    },

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('4%'),
        paddingHorizontal: hp("3%"),
        height: hp('60%'),
        width: wp('90%'),
        backgroundColor: colors.white,
        borderRadius: hp('3.5%'),
        opacity: 1,
        elevation: 5,
    },
    inputContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        marginVertical: hp(1),
        borderWidth: 1,

    },
    textInput: {

        fontSize: RFValue(16),
        height: hp('13.41%'),
        width: wp(85),
        textAlign: 'left',
        textAlignVertical: 'top',

    },
})

export default ShippingInfoScreen
