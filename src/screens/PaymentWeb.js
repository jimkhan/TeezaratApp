import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';


import CommonHeadWithButton from '../components/CommonHeadWithButton'
import AppButton from '../components/AppButton'
import AppText from '../components/AppText'
import AppTitleText from '../components/AppTitleText'
import colors from '../config/colors';
import { color } from 'react-native-reanimated';

import { WebView } from 'react-native-webview';

const PaymentWeb = ({ navigation, route }) => {

    const {url} = route.params;
    return (
        <View style={styles.main} >
            <View style={styles.web} > 
            <WebView source={{ uri: url }} />
            {/* <AppText>hello</AppText> */}
             </View>

            <TouchableOpacity style={styles.footer} >

                <AppText>Home</AppText>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    web: {
        height: hp(85),
        width: wp(100),
        backgroundColor: colors.white,
    },
    footer: {
        height: hp(8),
        width: wp(90),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(1),
        marginBottom: hp(2),
    }
})

export default PaymentWeb
