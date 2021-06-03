import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

import colors from '../config/colors'

import AppText from '../components/AppText'


const ChatSupport = () => {
    return (
        <View style={styles.main} >
            <View style={styles.container} >

             <AppText style={styles.text} > Chat Inbox is not available yet </AppText>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container:{
        width: wp(90),
        height: hp(85),
        backgroundColor: colors.cardback,
        justifyContent: "center",
    },
    text:{
        color: colors.green,
        width: wp(65),
        fontSize: RFValue(16),
        textAlign: 'center',
    }
})

export default ChatSupport
