import React, { useState, } from 'react'
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import { Formik } from 'formik';
import * as yup from 'yup';

import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppTextInput from '../components/AppTextInput'
import AppTitleText from '../components/AppTitleText'

import axios from 'axios';
import baseUrl from '../API/BaseUrl'
import { AuthContext } from '../Context/AuthContext';

const validationSchema = yup.object().shape({
    email: yup.string().required().email().label("Email"),
    password: yup.string().required().label("Password"),
});

import colors from '../config/colors'
const CheckoutSignIn = ({ navigation }) => {

    const { signOut, signIn } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const checkLoginInfo = (values) => {

        axios.post(baseUrl + 'login', {
            email: values.email,
            password: values.password
        })
            .then(function (response) {

                signIn(values.email, values.password);
                navigation.navigate("ShippingInfoScreen");

            })
            .catch(function (error) {
                console.log(error);
                Alert.alert(
                    "Error",
                    "Invalid email or password \n or \n Please Check your internet connection",
                    [
                        {
                            text: "Ok",
                            style: "cancel",
                        },
                    ]

                )
            });
        setIsLoading(false);
    }

    return (
        <View style={styles.container} >
            <CommonHeadWithButton
                textLeft={"Checkout"}
                iconRight={"window-close"}
                iconColor={colors.danger}
            />
            <AppText style={styles.textTop} >Please sign in to continue</AppText>
            <View style={styles.subcontainer} >
                <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >1</AppTitleText></View>
                <View style={[styles.barColor, styles.activeBack]} ></View>
                <View style={[styles.common, styles.activeBack]} ><AppTitleText style={[styles.numberColor, styles.activeText]} >2</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor} >3</AppTitleText></View>
                <View style={styles.barColor} ></View>
                <View style={styles.common} ><AppTitleText style={styles.numberColor}>4</AppTitleText></View>

            </View>
            <View style={styles.main}>

                <AppTitleText style={styles.activeText} >Sign In</AppTitleText>
                <>
                    <Formik initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {

                            setIsLoading(true);
                            checkLoginInfo(values);

                        }}
                        validationSchema={validationSchema}
                        validator={() => ({})}
                    >
                        {({ handleChange, handleSubmit, errors }) => (
                            <>
                                <View style={styles.inputArea} >
                                    <AppTextInput
                                        title={"Email"}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={handleChange("email")}
                                        keyboardType={"email-address"}
                                        textContentType={"emailAddress"}
                                    />
                                    {errors.email && <AppText style={styles.errorText} >{errors.email}</AppText>}
                                    <AppTextInput
                                        title={"Password"}
                                        icon={"md-eye-off-outline"}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={handleChange("password")}
                                        secureTextEntry
                                        textContentType={"password"}

                                    />
                                    {errors.password && <AppText style={styles.errorText} >{errors.password}</AppText>}

                                </View>
                                <AppButton
                                    name={"LOGIN"}
                                    onPress={handleSubmit}
                                />
                            </>
                        )}
                    </Formik>
                </>

                <AppTitleText style={styles.forgetText} >Forgot Password?</AppTitleText>
                <View style={styles.textArea} >
                    <AppText style={styles.dontText} >Don't have any account?</AppText>
                    <TouchableOpacity onPress={() => signOut()} >
                        <AppTitleText style={styles.createText} >Create account</AppTitleText>

                    </TouchableOpacity>
                </View>

            </View>
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
    inputArea: {
        marginTop: hp(5),
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
    main: {
        flex: 1,
        alignItems: 'center'
    },
    inputArea: {
        marginTop: hp(5),
    },
    logo: {
        alignSelf: 'center',
        marginBottom: hp(6),
    },
    textArea: {
        marginTop: hp(5),
    },
    forgetText: {
        marginTop: hp(4),
        fontSize: RFValue(14),
        color: colors.darkGray,
    },
    dontText: {

    },
    createText: {
        color: colors.primary,
        fontSize: RFValue(16)
    },
    bottomText: {

        color: colors.lightGray,
        fontSize: RFValue(19)
    },
    footer: {
        position: 'absolute',
        bottom: hp(8),
    }
})

export default CheckoutSignIn
