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
        fontSize: RFValue(17),
        alignSelf: 'center',
        color: colors.secondary,
        fontFamily: 'Exo-Bold',
        
    }
})

export default AppText;
