import React from 'react'
import { Text, StyleSheet, } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";

import colors from '../config/colors'


const AppText = ({ children, style }) => {
    return (

        <Text style={[styles.textcommon, style]} >{children}</Text>
    )
}
const styles = StyleSheet.create({
    textcommon: {
        fontSize: RFValue(14),
        alignSelf: 'center',
        color: colors.black,
        fontFamily: 'Exo-Regular',
        
    }
})

export default AppText;
